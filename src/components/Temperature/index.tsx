import React, { FC } from 'react'
import { IData, TConfig } from './types'
import { Context, defaultConfig } from "./context";
import { Colgroup } from "./components/Colgroup";
import { TopTable } from "./components/TopTable";
import { BottomTable } from "./components/BottomTable";
import { GridTable } from "./components/GridTable";
import styles from './styles.module.css'

interface Props {
  config?: TConfig
  data: IData
}

export const Temperature: FC<Props> = (props) => {
  const { config = {}, data } = props
  //@ts-ignore
  return <Context.Provider value={{ ...defaultConfig, ...config }}>    <table border="1" className={styles.table} frame="void">
    <Colgroup />
    <tbody>
      <TopTable data={data} />
      <GridTable data={data} />
      <BottomTable data={data} />
    </tbody>
  </table>

  </Context.Provider>
}
