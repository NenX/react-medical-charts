/**
 * Created by liulingli on 2017/7/5.
 * desc : 体温单 colgroup 控制体温单单元格宽度
 */
import React from "react";
import { COLS_IN_BLOCK, COLS_OF_BLOCK, HW_OF_GRID, ROWS_OF_BLOCK, ROWS_OF_GRID, ROWS_IN_BLOCK, WIDTH_OF_LEFT, COLS_OF_GRID } from "../constant";
import { IData } from "../types";
import { drawEvent, drawHzhx, parseRePoint } from "../utils/drawHelper";
import { DrawEvent } from "./DrawEvent";
import { DrawHzhx } from "./DrawHzhx";
import { DrawPoint } from "./DrawPoint";
import { SvgLeft, SvgRight } from "./Scale";
interface IProps {
    data: IData
}
export function GridTable(props: IProps): any {
    const { pointData, curDate } = props.data


    return (
        <React.Fragment>
            {
                Array(ROWS_OF_BLOCK).fill(0).map((row1, row_i1) => {
                    return (
                        Array(ROWS_IN_BLOCK).fill(0).map((row2, row_i2) => {
                            return (
                                <tr key={`xx-dd-${row_i1}-${row_i2}`} data-border-bottom={row_i2 === ROWS_IN_BLOCK - 1}>
                                    {
                                        !row_i1 && !row_i2 && <td rowSpan={ROWS_OF_GRID} >

                                            <SvgLeft />
                                        </td>
                                    }
                                    {
                                        Array(COLS_OF_BLOCK).fill(0).map((col1, col_i1) => {
                                            return (
                                                Array(COLS_IN_BLOCK).fill(0).map((col2, col_i2) => {
                                                    return (
                                                        <td data-border-right={col_i2 === COLS_IN_BLOCK - 1} key={`grid-${row_i1}-${row_i2}-${col_i1}-${col_i2}`} style={{ height: HW_OF_GRID }} />
                                                    )
                                                })
                                            )
                                        })
                                    }
                                    {
                                        !row_i1 && !row_i2 && <td rowSpan={ROWS_OF_GRID} >
                                            <SvgRight />
                                        </td>
                                    }
                                    <tr />

                                </tr>
                            )
                        })
                    )
                })

            }
            <div style={{ position: 'absolute', top: 60, left: WIDTH_OF_LEFT, background: 'rgba(200,200,200,.6)', height: ROWS_OF_GRID * HW_OF_GRID, width: COLS_OF_GRID * HW_OF_GRID }}>
                <svg style={{ width: '100%', height: '100%' }}>

                    <DrawEvent eventArray={pointData.eventDatas} curDate={curDate} />
                    <DrawHzhx hzhxData={pointData.hzfx} curDate={curDate} />
                    {/* {
                        parseRePoint(pointData, curDate).map((v) => {
                            return v;
                        })
                    } */}
                    <DrawPoint pointData={pointData} curDate={curDate} />
                </svg>
            </div>
        </React.Fragment>
    )
}