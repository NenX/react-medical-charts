import React, { useState } from 'react'

import { Partogram, Temperature } from 'react-medical-charts'
import 'react-medical-charts/dist/index.css'
import { IData } from 'react-medical-charts/dist/types'
const d = [
  { checktime: '2019-09-01 12:01', cd: 1, df: -3, event: '阴检1' },
  { checktime: '2019-09-01 13:01', cd: 4, df: -1, event: '阴检' },
  { checktime: '2019-09-01 14:01', cd: 4.5, df: 0.5, event: '阴检' },
  { checktime: '2019-09-01 16:01', cd: 5.5, df: 1, event: '' },
  { checktime: '2019-09-01 17:01', cd: 6, df: 2.5, event: '阴检' },
  { checktime: '2019-09-01 19:01', cd: 7, df: 3, event: '' },
]
const m = [
  {
    title: '体温图',
    c: <Temperature data={{
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
          {
            "dataTime": "2017-06-29 10:00:00",
            "value": "7",
            "date": "2017-06-29",
            "hour": 2,
            "mbValue": "",
            "phValue": "",
            "type": "",
            "xlValue": ""
          }
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
        {
          "dataTime": "2017-06-29 10:00:00",
          "date": "2017-06-29",
          "hour": 10,
          "mbValue": "",
          "phValue": "",
          "type": "",
          "value": "40",
          "xlValue": ""
        },
        {
          "dataTime": "2017-06-29 14:00:00",
          "date": "2017-06-29",
          "hour": 14,
          "mbValue": "",
          "phValue": "",
          "type": "",
          "value": "85",
          "xlValue": ""
        }, {
          "dataTime": "2017-06-29 18:00:00",
          "date": "2017-06-29",
          "hour": 18,
          "mbValue": "",
          "phValue": "",
          "type": "",
          "value": "90",
          "xlValue": ""
        },
        {
          "dataTime": "2017-06-29 22:00:00",
          "date": "2017-06-29",
          "hour": 22,
          "mbValue": "",
          "phValue": "",
          "type": "",
          "value": "95",
          "xlValue": ""
        },
        {
          "dataTime": "2017-06-29 22:00:00",
          "date": "2017-07-01",
          "hour": 2,
          "mbValue": "",
          "phValue": "",
          "type": "",
          "value": "95",
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
        {
          "dataTime": "2017-06-29 10:00:00",
          "date": "2017-06-29",
          "hour": 10,
          "mbValue": "",
          "phValue": "",
          "type": "",
          "value": "80",
          "xlValue": ""
        }, {
          "dataTime": "2017-06-29 14:00:00",
          "date": "2017-06-29",
          "hour": 14,
          "mbValue": "",
          "phValue": "",
          "type": "",
          "value": "50",
          "xlValue": ""
        }, {
          "dataTime": "2017-06-29 18:00:00",
          "date": "2017-06-29",
          "hour": 18,
          "mbValue": "",
          "phValue": "",
          "type": "",
          "value": "50",
          "xlValue": ""
        }, {
          "dataTime": "2017-06-29 22:00:00",
          "date": "2017-06-29",
          "hour": 22,
          "mbValue": "",
          "phValue": "",
          "type": "",
          "value": "45",
          "xlValue": ""
        },
        {
          "dataTime": "2017-06-29 22:00:00",
          "date": "2017-07-01",
          "hour": 6,
          "mbValue": "",
          "phValue": "",
          "type": "",
          "value": "88",
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
        },
        {
          "dataTime": "2017-06-29 10:00:00",
          "date": "2017-06-29",
          "hour": 10,
          "mbValue": "",
          "phValue": "",
          "type": "yw",
          "value": "37",
          "xlValue": ""
        },
        {
          "dataTime": "2017-06-29 14:00:00",
          "date": "2017-06-29",
          "hour": 14,
          "mbValue": "",
          "phValue": "",
          "type": "gw",
          "value": "37.5",
          "xlValue": ""
        }, {
          "dataTime": "2017-06-29 18:00:00",
          "date": "2017-06-29",
          "hour": 18,
          "mbValue": "",
          "phValue": "",
          "type": "kw",
          "value": "37.4",
          "xlValue": ""
        }, {
          "dataTime": "2017-06-29 22:00:00",
          "date": "2017-06-29",
          "hour": 22,
          "mbValue": "",
          "phValue": "",
          "type": "kw",
          "value": "36.8",
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
        },
        {
          "dataTime": "2017-06-29 18:00:00",
          "date": "2017-06-30",
          "hour": 6,
          "mbValue": "",
          "phValue": "",
          "type": "",
          "value": "出院",
          "xlValue": ""
        },
        {
          "dataTime": "2017-06-30 02:00:00",
          "date": "2017-06-30",
          "hour": 2,
          "mbValue": "",
          "phValue": "",
          "type": "",
          "value": "不升",
          "xlValue": ""
        }, {
          "dataTime": "2017-06-29 02:00:00",
          "date": "2017-06-29",
          "hour": 2,
          "mbValue": "",
          "phValue": "",
          "type": "",
          "value": "出院",
          "xlValue": ""
        }, {
          "dataTime": "2017-06-29 14:00:00",
          "date": "2017-06-29",
          "hour": 14,
          "mbValue": "",
          "phValue": "",
          "type": "",
          "value": "开呼吸机",
          "xlValue": ""
        }, {
          "dataTime": "2017-06-29 22:00:00",
          "date": "2017-06-29",
          "hour": 22,
          "mbValue": "",
          "phValue": "",
          "type": "",
          "value": "关呼吸机",
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
        }, {
          "dataTime": "2017-06-29 18:00:00",
          "date": "2017-06-29",
          "hour": 18,
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
        }, {
          "dataTime": "2017-06-29 18:00:00",
          "date": "2017-06-29",
          "hour": 18,
          "mbValue": "",
          "phValue": "",
          "type": "",
          "value": "66",
          "xlValue": ""
        }]
      }

    }} />
  },
  {
    title: '产程图',
    c: <Partogram startTime="2019-09-01"  data={d}/>
  },
  {
    title: '其他',
    c: <div>其他</div>
  },
]
const App = () => {
  const [data, setData] = useState<IData[]>([])
  const [activeKey, setActiveKey] = useState('体温图')
  const target = m.find(_ => _.title === activeKey)
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
      <div style={{ width: '80vw' }}>

        {
          m.map(_ => {
            return (<button key={_.title} onClick={() => setActiveKey(_.title)} style={{ backgroundColor: _.title === activeKey ? '#fff' : '' }}>{_.title}</button>)
          })
        }
        {
          target ? target.c : null
        }

      </div>
    </div>
  )
}

export default App
