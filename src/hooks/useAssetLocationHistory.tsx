import type { Static } from '@sinclair/typebox'
import { timeStreamFormatDate } from 'api/timestream'
import { GNSS, Roaming, SensorProperties } from 'asset/asset'
import { useAsset } from 'hooks/useAsset'
import { useChartDateRange } from 'hooks/useChartDateRange'
import type { AssetGeoLocation, GeoLocation } from 'hooks/useMapData'
import { useMapSettings } from 'hooks/useMapSettings'
import { useServices } from 'hooks/useServices'
import { useEffect, useState } from 'react'
import { validateWithJSONSchema } from 'utils/validateWithJSONSchema'
import { validFilter } from 'utils/validFilter'

const validGNSSReadingFilter = validFilter(GNSS)
const validateRoamingReading = validateWithJSONSchema(Roaming)
const validRoamingReadingFilter = validFilter(Roaming)

const toRoam = ({
	objectValuesDouble,
	objectValuesVarchar,
	objectKeys,
	date,
}: {
	objectValuesDouble: number[]
	objectValuesVarchar: string[]
	objectKeys: string[]
	date: Date
}): Static<typeof Roaming> => ({
	v: objectKeys.reduce(
		(obj, k, i) => ({
			...obj,
			[k.split('.')[1]]: objectValuesDouble[i] ?? objectValuesVarchar[i],
		}),
		{},
	) as any,
	ts: date.getTime(),
})

export const useAssetLocationHistory = ({
	disabled,
}: {
	disabled?: boolean
}) => {
	const {
		settings: { numHistoryEntries },
	} = useMapSettings()
	const { timestream } = useServices()
	const { startDate, endDate } = useChartDateRange()
	const { asset } = useAsset()

	const [locations, setLocations] = useState<GeoLocation[]>([])
	const [history, setHistory] = useState<AssetGeoLocation[]>([])

	// Fetch the historical GNSS readings.
	// Because it is stored as a destructured object in timestream, we have to
	// put it back together, based on the `measureGroup`.
	useEffect(() => {
		let isMounted = true
		if (disabled ?? false) return
		if (asset === undefined) return

		timestream
			.query<{
				objectValues: number[]
				objectKeys: string[]
				objectSource: string[]
				date: Date
			}>(
				(table) => `SELECT
			array_agg(measure_value::double) AS objectValues,
			array_agg(measure_name) AS objectKeys,
			array_agg(source) AS objectSource,
			time AS date
			FROM ${table}
			WHERE deviceId='${asset.id}' 
			AND measureGroup IN (
				SELECT
				measureGroup
				FROM ${table}
				WHERE deviceId='${asset.id}' 
				AND substr(measure_name, 1, ${SensorProperties.GNSS.length + 1}) = '${
					SensorProperties.GNSS
				}.'
				GROUP BY measureGroup, time
				ORDER BY time DESC
			)
			AND substr(measure_name, 1, ${SensorProperties.GNSS.length + 1}) = '${
					SensorProperties.GNSS
				}.'
			AND time >= '${timeStreamFormatDate(startDate)}'
			AND time <= '${timeStreamFormatDate(endDate)}'
			GROUP BY measureGroup, time
			ORDER BY time DESC
			LIMIT ${numHistoryEntries}
			`,
			)
			.then((data) => {
				// Validate the GNSS position data
				const l = data
					.filter(({ objectValues, objectKeys, date }) =>
						validGNSSReadingFilter({
							v: objectKeys.reduce(
								(obj, k, i) => ({
									...obj,
									[k.split('.')[1]]: objectValues[i],
								}),
								{} as any,
							),
							ts: date.getTime(),
						}),
					)
					// Build the object with info whether the data came from a batch message
					.map(({ objectValues, objectKeys, date, objectSource }) => {
						const pos = objectKeys.reduce(
							(obj, k, i) => ({
								...obj,
								[k.split('.')[1]]: {
									v: objectValues[i],
									source: objectSource[i],
								},
							}),
							{} as {
								lat: {
									v: number
									source?: 'batch'
								}
								lng: {
									v: number
									source?: 'batch'
								}
								acc: {
									v: number
									source?: 'batch'
								}
								alt: {
									v: number
									source?: 'batch'
								}
								hdg: {
									v: number
									source?: 'batch'
								}
								spd: {
									v: number
									source?: 'batch'
								}
							},
						)

						const l: GeoLocation = {
							position: {
								lat: pos.lat.v,
								lng: pos.lng.v,
								accuracy: pos.acc.v,
								heading: pos.hdg.v,
								altitude: pos.alt.v,
								speed: pos.spd.v,
							},
							batch: [
								pos.lat.source,
								pos.lng.source,
								pos.acc.source,
								pos.hdg.source,
								pos.alt.source,
								pos.spd.source,
							].includes('batch'),
							ts: date,
						}
						return l
					})
					.filter((l) => l)

				if (!isMounted) {
					console.debug(
						'[useAssetLocationHistory]',
						'Received result, but was removed already.',
					)
					return
				}

				setLocations(l)
			})
			.catch((error) => {
				console.error(`[useAssetLocationHistory]`, error)
			})

		return () => {
			isMounted = false
		}
	}, [disabled, timestream, asset, startDate, endDate, numHistoryEntries])

	/*

	Fetch the roaming information. Since they are not published by the device
	in the same message, we have to fetch the data from the same time frame
	as the location data, and interleave it with the locations.

	Basically this is what the device reports:
	> Roaming
	> GNSS
	> GNSS
	> GNSS
	> GNSS
	> Roaming
	> GNSS
	> GNSS
	> GNSS
	> GNSS
	> GNSS
	> Roaming
	> ...

	So the roaming information for the GNSS reading in the result is
	always the one reported *before* it.

	Because the device can report partial updates, we need to build the
	Roaming information from potentially multiple updates.

	*/
	useEffect(() => {
		let isMounted = true
		if (asset === undefined) return
		if (locations.length === 0) return

		// So, first, build the state of the asset's roaming information,
		// before the first location by fetching 100 updates older than that.
		timestream
			.query<{
				objectValuesDouble: number[]
				objectValuesVarchar: string[]
				objectKeys: string[]
				date: Date
			}>((table) =>
				[
					`SELECT`,
					`array_agg(measure_value::double) AS objectValuesDouble,`,
					`array_agg(measure_value::varchar) AS objectValuesVarchar,`,
					`array_agg(measure_name) AS objectKeys,`,
					`time as date`,
					`FROM ${table}`,
					`WHERE deviceId='${asset.id}'`,
					`AND substr(measure_name, 1, ${
						SensorProperties.Roaming.length + 1
					}) = '${SensorProperties.Roaming}.'`,
					// Get the roaming updates *before* the first position
					`AND time < '${timeStreamFormatDate(
						locations[locations.length - 1].ts,
					)}'`,
					`GROUP BY measureGroup, time`,
					// Sort descending so we can build the roaming object back starting with the latest update
					`ORDER BY time DESC`,
					// we have to stop somewhere, in case there was never a full update
					// (according to what the web applications considers a full update, that is)
					`LIMIT 100`,
				].join('\n'),
			)
			.then((data) =>
				// Build up the roaming reading by adding properties from updates to the object, until it is valid
				data.reduce((roaming, data) => {
					if (!('errors' in validateRoamingReading(roaming))) return roaming
					const update = toRoam(data)
					const roamingWithUpdate = {
						ts: roaming.ts ?? update.ts,
						v: {
							// Older values will not overwrite newer values
							...update.v,
							...roaming.v,
						},
					}
					return roamingWithUpdate
				}, {} as Static<typeof Roaming>),
			)
			.then(async (firstRoam) => {
				if (firstRoam === undefined) {
					console.debug(
						'[useAssetLocationHistory]',
						`No valid roaming information found.`,
					)
				}
				// Add newer (partial) roaming information, by fetch (partial)
				// roaming updates which are newer than the first one and
				// older than the last one.
				const data = await timestream.query<{
					objectValuesDouble: number[]
					objectValuesVarchar: string[]
					objectKeys: string[]
					date: Date
				}>((table) =>
					[
						`SELECT`,
						`array_agg(measure_value::double) AS objectValuesDouble,`,
						`array_agg(measure_value::varchar) AS objectValuesVarchar,`,
						`array_agg(measure_name) AS objectKeys,`,
						`time as date`,
						`FROM ${table}`,
						`WHERE deviceId='${asset.id}'`,
						`AND substr(measure_name, 1, ${
							SensorProperties.Roaming.length + 1
						}) = '${SensorProperties.Roaming}.'`,
						`AND time >= '${timeStreamFormatDate(
							locations[locations.length - 1].ts,
						)}'`,
						`AND time <= '${timeStreamFormatDate(locations[0].ts)}'`,
						`GROUP BY measureGroup, time`,
						`ORDER BY time DESC`,
					].join('\n'),
				)
				return [firstRoam, data.map(toRoam)] as [
					Static<typeof Roaming>,
					Static<typeof Roaming>[],
				]
			})
			.then(([firstRoam, updates]) => {
				// Merge the updates with the one full update, and storing them as new full roaming states
				const roaming: Static<typeof Roaming>[] = [firstRoam]
				for (const update of updates) {
					roaming.push({
						ts: update.ts,
						v: {
							...roaming[roaming.length - 1].v,
							...update.v,
						},
					})
				}
				return roaming.filter(validRoamingReadingFilter)
			})
			.then((roaming) => {
				// Sort by descending time
				roaming.sort(({ ts: t1 }, { ts: t2 }) => t2 - t1)
				// Interleave the roaming information with the location data
				const history = locations.map((location) => ({
					location,
					roaming: roaming.find(({ ts }) => ts <= location.ts.getTime()), // Find the first roaming entry that is older than the location
				}))

				if (!isMounted) {
					console.debug(
						'[useAssetLocationHistory]',
						'Received result, but was removed already.',
					)
					return
				}

				setHistory(history)
			})
			.catch((err) => {
				console.error(`[useAssetLocationHistory]`, err)
			})

		return () => {
			isMounted = false
		}
	}, [locations, asset, timestream])

	// Add roaming data to history
	return history
}