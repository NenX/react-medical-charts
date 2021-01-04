
export interface IPartogramDataItem {
    checktime: string,
    cd: number, // 宫颈扩张
    df: number, // 先露下降
    event: string
}
export type PartogramData = IPartogramDataItem[]

export interface IPartogramProps {
    data: PartogramData
    wrapStyle?: React.CSSProperties
    startTime: string
}