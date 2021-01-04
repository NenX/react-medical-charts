export interface _IConfig {
  colLength: number
  sumOfDay: number
  colsOfDay: number
  colsOfLeft: number
  colsOfRight: number
}
export type TConfig = Partial<_IConfig>
export interface IPointData {
  dataTime: string
  date: string
  hour: number
  mbValue: string
  phValue: string
  type: string
  value: string
  xlValue: string
}
export type TPointArr = IPointData[]
export interface IPointDataMap {
  tt: TPointArr
  xl: TPointArr
  mb: TPointArr
  wd: TPointArr
  hzfx: TPointArr
  eventDatas: TPointArr
  respiratorDatas: TPointArr
}
export interface IData {
  curDate:string
  dayList?: string[]
  dayOps?: string[]
  dayInHospital?: string[]
  startDay?: string
  breathingList: string[]
  dayMap?: { title: string, data: string[] }[]
  pointData: IPointDataMap
}