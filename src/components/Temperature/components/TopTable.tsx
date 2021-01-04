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
export function TopTable(props: IProps): any {

    const { data } = props
    const { curDate = new Date().toLocaleDateString(), dayInHospital, dayList, dayOps } = data
    const emptyArr = Array(COLS_OF_BLOCK).fill(0)
    const m = [
        { title: '日期', data: emptyArr.map((_, i) => new Date((+new Date(curDate) + i * 60 * 60 * 24 * 1000)).toLocaleDateString().replace(/\//g, '-')) },
        { title: '住院天数', data: dayInHospital || emptyArr.map((_, i) => (i + 1).toString()) },
        { title: '术后产后天数', data: dayOps || emptyArr.map((_, i) => (i + 1).toString()) },
    ]
    return (
        <React.Fragment>
            {
                m.map(({ title, data },j) => {
                    return <tr key={`hos-rr-${j}`}>
                        <td>{title}</td>
                        {emptyArr.map((_, i) => {
                            return <td key={`hos-${i}-${j}`} colSpan={COLS_IN_BLOCK} data-border-right>{data[i]}</td>
                        })}
                        <td />
                    </tr>
                })

            }
            <tr>
                <td>时周</td>
                {
                    emptyArr.map((_, i) => {
                        return Array(COLS_IN_BLOCK).fill(0).map((_, ii) => {
                            return <td key={`shizhou-${i}-${ii}`} data-border-right={(ii + 1) === COLS_IN_BLOCK}>{2 + ii * 4}</td>
                        })
                    })
                }
                <td />

            </tr>

        </React.Fragment>
    )
}