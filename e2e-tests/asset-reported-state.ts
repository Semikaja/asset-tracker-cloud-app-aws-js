import { ReportedState } from 'asset/asset.js'
import { defaultConfig } from '../src/asset/defaultConfig.js'

const now = Date.now()

/**
 * @see https://github.com/NordicSemiconductor/asset-tracker-cloud-docs/blob/344a5a63945f7d9d14c8f37d4a96d6f666ba8148/docs/cloud-protocol/state.reported.aws.json
 */
export const state: ReportedState = {
	bat: {
		v: 2754,
		ts: now,
	},
	env: {
		v: {
			temp: 23.6,
			hum: 50.5,
			atmp: 100.36,
		},
		ts: now,
	},
	gnss: {
		v: {
			lng: 10.436642,
			lat: 63.421133,
			acc: 24.798573,
			alt: 170.528305,
			spd: 0.579327,
			hdg: 176.12,
		},
		ts: now - 30 * 1000,
	},
	cfg: defaultConfig,
	dev: {
		v: {
			imei: '352656106111232',
			iccid: '89450421180216216095',
			modV: 'mfw_nrf9160_1.0.0',
			brdV: 'thingy91_nrf9160',
			appV: 'v1.0.0-rc1-327-g6fc8c16b239f',
		},
		ts: now,
	},
	roam: {
		v: {
			band: 20,
			nw: 'LTE-M',
			rsrp: -97,
			area: 30401,
			mccmnc: 24201,
			cell: 30976,
			ip: '10.96.67.53',
		},
		ts: now - 60 * 1000,
	},
} as const

export const ncellmeasDeviceReport = {
	mcc: 242,
	mnc: 1,
	cell: 30976,
	area: 30401,
	earfcn: 6300,
	adv: 48,
	rsrp: -82,
	rsrq: -8,
	nmr: [
		{
			earfcn: 6300,
			cell: 293,
			rsrp: -87,
			rsrq: -14,
		},
		{
			earfcn: 6300,
			cell: 194,
			rsrp: -94,
			rsrq: -21,
		},
	],
	ts: now,
} as const

export const ncellmeasDeviceReportLocation = {
	lng: 10.394017,
	lat: 63.417746,
	accuracy: 2000,
} as const
