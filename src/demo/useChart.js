import React, { useEffect } from 'react';
import { useCharts } from '../dhooks'

export function useChartDemo(props){

    const chartsInit = useCharts('tz-structure-chart', {
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line'
        }]
    })

    useEffect(() => {
        // you can use chartsInit.render render again
        // chartsInit.render(/*options {...}*/)
    })

    return(
        <div style = {{width: 400, height: 400}} id = 'tz-structure-chart'></div>
    )
}