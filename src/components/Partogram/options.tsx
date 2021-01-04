import { PartogramData } from "./types";

function processData(startTime: string, data: PartogramData) {
    const startDate = new Date(startTime)
    console.log('startDate', startDate)
    const cd: number[][] = []
    const df: number[][] = []
    const markData: { value: string, xAxis: number, yAxis: number, symbol?: string, symbolRotate?: number }[] = []

    data.forEach(_ => {
        const date = new Date(_.checktime)
        const x = (+date - +startDate) / (3600 * 1000)
        const cd_y = _.cd
        const df_y = _.df + 5
        cd.push([x, cd_y])
        df.push([x, df_y])
        _.event && markData.push({
            value: _.event,
            xAxis: x,
            yAxis: Math.max(cd_y, df_y) + 0.4,
            // symbol: 'roundRect',
            // symbolRotate: _.cd > 5 ? 0 : 180
        })
    })
    return {
        cd, df, markData
    }
}

export function getOption(startTime: string, a: PartogramData = []) {


    var symbolSize = 15;
    // var cd = [[0, 1], [8, 3], [10, 4], [12.5, 9], [13, 10], [10, 4], [14, 9]];
    // var df = [[2.5, 1.1], [3, 1.5], [4, 1.6], [5, 2.7], [6, 2.8], [7, 3], [8, 3.5], [9, 4.2], [10, 4.5], [11, 5.9], [12, 7]];
    const { df, cd, markData } = processData(startTime, a)
    var option = {
        title: {
            text: '产程进展图',
            x: 'center',
            textStyle: {
                baseline: 'middle',
                fontSize: 16,
                fontWeight: 'bolder',
                color: '#333'
            }
        },
        legend: {
            data: ['宫颈扩张', '胎头下降'],
            padding: [
                30,  // 上
                10, // 右
                10, // 左
            ]
        },

        toolbox: {
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                restore: {},
                saveAsImage: {}
            }
        },
        grid: {
            height: 300,
            width: 650,
        },
        xAxis: {
            name: '产程时间',
            nameLocation: 'center',
            nameTextStyle: {
                padding: [10, 2, 2, 2]
            },
            min: 0,
            max: 24,
            type: 'value',
            splitNumber: 24,

            axisTick: { interval: 1 },
            axisLine: { onZero: false }
        },
        yAxis: [{
            name: '宫颈扩张(cm)',
            nameLocation: 'end',
            min: 0,
            max: 10,
            type: 'value',
            interval: 1,
            axisLine: { onZero: false }
        },
        {
            name: '先露下降程度',
            nameLocation: 'end',
            min: -5,
            max: 5,
            type: 'value',
            interval: 1,
            axisLine: { onZero: false }
        },
        ],
        series: [
            {
                name: '宫颈扩张',
                id: 'a',
                type: 'line',
                smooth: true,
                symbol: 'triangle',
                symbolSize: symbolSize,
                data: cd,
                color: 'skyblue'
            },
            {
                name: '胎头下降',
                id: 'd',
                type: 'line',
                smooth: true,
                symbol: 'diamond',
                symbolSize: symbolSize,
                data: df,
                // markPoint: {
                //     data: markData
                // },
                color: '#754ca8'

            },
            {
                name: '事件',
                id: 'd1',
                type: 'line',
                smooth: true,
                data: [],
                markPoint: {
                    data: markData
                },
                color: '#999'

            },

        ]
    };

    return option
}

