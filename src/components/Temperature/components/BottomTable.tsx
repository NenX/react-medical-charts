/**
 * Created by liulingli on 2017/7/5.
 * desc : 体温单 colgroup 控制体温单单元格宽度
 */
import React from "react";
import { COLS_IN_BLOCK, COLS_OF_BLOCK } from "../constant";
import { IData } from "../types";
interface IProps {
    data: IData

}
export function BottomTable(props: IProps): any {

    const { data } = props
    const { breathingList, dayMap = [] } = data
    const emptyArr = Array(COLS_OF_BLOCK).fill(0)

    return (
        <React.Fragment>
            <tr style={{ height: 34 }}>
                <td>呼吸</td>
                {
                    emptyArr.map((_, i) => {
                        return Array(COLS_IN_BLOCK).fill(0).map((_, ii) => {
                            return <td key={`huxixx-${i}-${ii}`} data-border-right={(ii + 1) === COLS_IN_BLOCK} style={{ verticalAlign: ii % 2 ? 'bottom' : 'top' }}>{breathingList[ii]}</td>
                        })
                    })
                }
                <td />

            </tr>
            {
                dayMap.map(({ title, data }, j) => {
                    return <tr key={`datamm-${j}`}>
                        <td>{title}</td>
                        {emptyArr.map((_, i) => {
                            return <td key={`dayMapxx-${j}-${i}`} colSpan={COLS_IN_BLOCK} data-border-right>{data[i]}</td>
                        })}
                        <td />

                    </tr>
                })

            }


        </React.Fragment>
    )
}