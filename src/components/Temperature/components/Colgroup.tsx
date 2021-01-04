/**
 * Created by liulingli on 2017/7/5.
 * desc : 体温单 colgroup 控制体温单单元格宽度
 */
import React, { useContext } from "react";
import { COLS_IN_BLOCK, COLS_OF_BLOCK } from "../constant";
import { Context } from "../context";

export function Colgroup() {

    const { colLength, colsOfLeft, colsOfRight } = useContext(Context);
    return (
        <colgroup>
            {
                Array(44).fill(0).map((_, i) => {
                    let width = colLength;
                    if (i === 0) {
                        width = colLength * colsOfLeft;
                    } else if (i === (COLS_IN_BLOCK * COLS_OF_BLOCK + 1)) {
                        width = colLength * colsOfRight;
                    }
                    return <col key={i} width={width + 'px'} />
                })
            }
        </colgroup>
    )
}