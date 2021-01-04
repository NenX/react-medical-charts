import React, { FC, useEffect, useRef, useState } from 'react';
import { IPartogramProps } from "./types";
import { getOption } from "./options";



var echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/line');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/legend');
require('echarts/lib/component/title');
require('echarts/lib/component/markPoint');
require("echarts/lib/component/dataZoom");

require("echarts/lib/component/dataZoomInside");

export const Partogram: FC<IPartogramProps> = ({ wrapStyle = {}, data, startTime }) => {
    const ref = useRef<HTMLDivElement>(null)
    const chart = useRef<any>(null)

    useEffect(() => {
        if (!chart.current) {
            chart.current = echarts.init(ref.current);
        }
        chart.current.setOption(getOption(startTime, data))
    }, [data, startTime])
    return (
        <div style={{ width: 800, height: 450, ...wrapStyle }} ref={ref}>
            223
        </div>

    );
};
