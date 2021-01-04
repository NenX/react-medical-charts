import React, { FC } from "react";
import { WIDTH_OF_BLOCK } from "../constant";
import { TPointArr } from "../types";
import { getDisDays } from "../utils/drawHelper";

export const DrawHzhx: FC<{ hzhxData: TPointArr, curDate: string }> = ({ hzhxData, curDate }) => {


    //以疼痛刻度10为基准
    let cy1 = 15 * 45 - 2;
    let cy2 = 15 * 42 + 12;

    return (
        <React.Fragment>
            {
                hzhxData.map((_, i) => {
                    let endDate = _.dataTime;
                    let value = _.value;
                    let title = "辅助呼吸：" + value + "次";
                    let y = (i % 2 === 0) ? cy1 : cy2;
                    let xPx = getDisDays(curDate, endDate) * WIDTH_OF_BLOCK;
                    return <text key={xPx + y} fill={'blue'} x={xPx - 6} y={y} >{value}</text>
                })
            }
        </React.Fragment>
    )
}