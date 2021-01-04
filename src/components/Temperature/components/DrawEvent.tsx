import React, { FC } from "react";
import { HW_OF_GRID, WIDTH_OF_BLOCK } from "../constant";
import { TPointArr } from "../types";
import { getDisDays, numToChinese } from "../utils/drawHelper";
import { DrawArrow } from "./DrawArrow";
export const DrawEvent: FC<{ eventArray: TPointArr, curDate: string }> = ({ eventArray, curDate }) => {
    if (eventArray.length === 0) {
        return null;
    }

    //按时间分组，显示在同一时间段
    let timePointMap: { [x: string]: TPointArr } = {};
    let otherArray = [];
    for (let i = 0; i < eventArray.length; i++) {
        let value = eventArray[i].value;
        //let dataTime = evenArray[i].dataTime;
        let dataTime = eventArray[i].date + " " + eventArray[i].hour + ":00";
        if (value !== '开呼吸机' && value !== '关呼吸机' && value !== '不升') {
            if (timePointMap[dataTime] === undefined) {
                timePointMap[dataTime] = [];
                timePointMap[dataTime].push(eventArray[i]);
            } else {
                timePointMap[dataTime].push(eventArray[i]);
            }
        } else {
            otherArray.push(eventArray[i])
        }
    }

    // return reShowArray;
    return (
        <React.Fragment>
            {
                Object.entries(timePointMap).map(([key, evens], i) => {
                    let xPx = getDisDays(curDate, key) * WIDTH_OF_BLOCK - 5.5;
                    let show = "";
                    return evens.map((curEven, j) => {
                        let value = curEven.value;
                        let hour = new Date(curEven.dataTime).getHours();
                        let minute = new Date(curEven.dataTime).getMinutes();
                        let hourStr = hour.toString();
                        let minuteStr = minute.toString();
                        let finalValue = "";
                        let isLeave = value === "请假";
                        if (minute > 0) {
                            finalValue = value + (isLeave ? "" : "||" + numToChinese(hourStr) + "时" + numToChinese(minuteStr) + "分");
                        } else {
                            finalValue = value + (isLeave ? "" : "||" + numToChinese(hourStr) + "时整");
                        }
                        if (j === 0) {
                            show += finalValue;
                        } else {
                            show += " " + finalValue;
                        }
                        let textArray = show.split("");
                        return (
                            textArray.map((v, z) => {
                                return <text style={{ fontSize: v === '|' ? '13px' : '' }} key={`DrawEvent${j}-${z}-${i}`} x={v === '|' ? (xPx + 4) : xPx}
                                    y={12 + z * HW_OF_GRID} fill="red">{v}</text>
                            })
                        )
                    })

                })
            }
            {
                otherArray.map((_, i) => {
                    let value = _.value;
                    let time = _.dataTime;
                    //console.log("绘制其他事件"+curDate)
                    let xPx = getDisDays(curDate, time) * WIDTH_OF_BLOCK;
                    if (value === "开呼吸机") {
                        //在箭头旁边绘制呼吸机三字
                        let textArray = ["呼", "吸", "机"];

                        return textArray.map((_, j) => {
                            return (
                                <React.Fragment key={`otherArray-${j}-${i}`}>
                                    <DrawArrow key={`otherArray1-${j}-${i}`} x={xPx} y={45 * HW_OF_GRID} length={3 * HW_OF_GRID} isUp={true} color="blue" />
                                    <text key={`otherArray2-${j}-${i}`} x={xPx - 14} y={43 * HW_OF_GRID + j * 15 - 2} fill="blue">{_}</text>
                                </React.Fragment>

                            )
                        })
                    } else if (value === "关呼吸机") {
                        //绘制向下的箭头
                        return <DrawArrow key={`otherArray2x3${i}`} x={xPx} y={45 * HW_OF_GRID} length={3 * HW_OF_GRID} isUp={false} color="blue" />
                    } else if (value === "不升") {
                        let valueArray = value.split("");
                        //显示在35度下面
                        let cy = 40 * HW_OF_GRID;
                        return valueArray.map((_, k) => {
                            return (
                                <text key={`otherArray2f${k}${i}`} x={xPx - 5.5} y={cy + HW_OF_GRID * k + 12} fill='#000'>
                                    {valueArray[k]}
                                </text>
                            )
                        })
                    }
                    return null
                })
            }
        </React.Fragment>
    )
}

