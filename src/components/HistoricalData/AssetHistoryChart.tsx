import { ChartDateRange } from 'components/ChartDateRange'
import { AMChart } from 'components/HistoricalData/AMChart'
import { NoData } from 'components/NoData'
import React from 'react'

export const AssetHistoryChart = ({
	history,
	className,
}: {
	history: { value: number; date: Date }[]
	className?: string
}) => (
	<>
		<ChartDateRange />
		{history.length === 0 ? (
			<NoData />
		) : (
			<AMChart data={history} type={'line'} className={className} />
		)}
	</>
)