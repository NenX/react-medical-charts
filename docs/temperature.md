### temperature-chart



### [PlayGround](https://codesandbox.io/s/elastic-archimedes-7o3ui)

### Example

```js
import React from 'react'

import { Temperature } from 'react-medical-charts'
import 'react-medical-charts/dist/index.css'

const App = () => {
  return <Temperature data={{
    curDate: '2017-06-28',
    breathingList: ['60', '70', '65', '66', '56', '60', '70', '60', '70', '65', '66', '56', '60', '70', '60', '70', '65', '66', '56', '60', '70', '60', '70', '65', '66', '56', '60', '70', '60', '70', '65', '66', '56', '60', '70', '60', '70', '65', '66', '56', '60', '70'], //手术天数
    dayMap: [
      {
        title: '大便次数(次)',
        data: ['11', '22']
      },
      {
        title: '体重（g）',
        data: ['', '', '22']
      },
    ],
    pointData: {
      "tt": [
        {
          "dataTime": "2017-06-29 02:00:00",
          "value": "9",
          "date": "2017-06-29",
          "hour": 2,
          "mbValue": "",
          "phValue": "",
          "type": "",
          "xlValue": ""

        },
        {
          "dataTime": "2017-06-29 06:00:00",
          "value": "8",
          "date": "2017-06-29",
          "hour": 2,
          "mbValue": "",
          "phValue": "",
          "type": "",
          "xlValue": ""
        },
      ],
      "xl": [{
        "dataTime": "2017-06-29 02:00:00",
        "value": "65",
        "date": "2017-06-29",
        "hour": 2,
        "mbValue": "",
        "phValue": "",
        "type": "",
        "xlValue": ""
      }, {
        "dataTime": "2017-06-29 06:00:00",
        "date": "2017-06-29",
        "hour": 6,
        "mbValue": "",
        "phValue": "",
        "type": "",
        "value": "75",
        "xlValue": ""
      },
      ],
      "mb": [{
        "dataTime": "2017-06-29 02:00:00",
        "date": "2017-06-29",
        "hour": 2,
        "mbValue": "",
        "phValue": "",
        "type": "",
        "value": "60",
        "xlValue": ""
      }, {
        "dataTime": "2017-06-29 06:00:00",
        "date": "2017-06-29",
        "hour": 6,
        "mbValue": "",
        "phValue": "",
        "type": "",
        "value": "55",
        "xlValue": ""
      },
      ],

      "wd": [{
        "dataTime": "2017-06-29 02:00:00",
        "date": "2017-06-29",
        "hour": 2,
        "mbValue": "",
        "phValue": "36.5",
        "type": "gw",
        "value": "37.2",
        "xlValue": ""
      },
      {
        "dataTime": "2017-06-29 06:00:00",
        "date": "2017-06-29",
        "hour": 6,
        "mbValue": "",
        "phValue": "",
        "type": "yw",
        "value": "37",
        "xlValue": ""
      }],
      "eventDatas": [{
        "dataTime": "2017-06-29 14:00:00",
        "date": "2017-06-30",
        "hour": 2,
        "mbValue": "",
        "phValue": "",
        "type": "",
        "value": "呼吸心跳停止",
        "xlValue": ""
      },
      {
        "dataTime": "2017-06-29 14:00:00",
        "date": "2017-06-30",
        "hour": 6,
        "mbValue": "",
        "phValue": "",
        "type": "",
        "value": "请假",
        "xlValue": ""
      }],
      "hzfx": [{
        "dataTime": "2017-06-29 14:00:00",
        "date": "2017-06-29",
        "hour": 14,
        "mbValue": "",
        "phValue": "",
        "type": "",
        "value": "66",
        "xlValue": ""
      }],
      "respiratorDatas": [{
        "dataTime": "2017-06-29 14:00:00",
        "date": "2017-06-29",
        "hour": 14,
        "mbValue": "",
        "phValue": "",
        "type": "",
        "value": "66",
        "xlValue": ""
      }]
    }

  }} />
}

export default App

```

### Props

| Parameter | Description                        | Type    |
| :-------- | :--------------------------------- | :------ |
| data      | chart data                         | IData   |
| config    | controls the behavior of rendering | TConfig |

### Parameter Interface
```typescript
export interface _IConfig {
    colLength: number;
    sumOfDay: number;
    colsOfDay: number;
    colsOfLeft: number;
    colsOfRight: number;
}
export declare type TConfig = Partial<_IConfig>;
export interface IPointData {
    dataTime: string;
    date: string;
    hour: number;
    mbValue: string;
    phValue: string;
    type: string;
    value: string;
    xlValue: string;
}
export declare type TPointArr = IPointData[];
export interface IPointDataMap {
    tt: TPointArr;
    xl: TPointArr;
    mb: TPointArr;
    wd: TPointArr;
    hzfx: TPointArr;
    eventDatas: TPointArr;
    respiratorDatas: TPointArr;
}
export interface IData {
    curDate: string;
    dayList?: string[];
    dayOps?: string[];
    dayInHospital?: string[];
    startDay?: string;
    breathingList: string[];
    dayMap?: {
        title: string;
        data: string[];
    }[];
    pointData: IPointDataMap;
}

```



## preview
![preview](docs/temperature.jpg)