import React from 'react'
import { _IConfig } from './types';
export const defaultConfig = {
    colLength: 15,
    sumOfDay: 7,
    colsOfDay: 6,
    colsOfLeft: 7,
    colsOfRight: 4
}

export const Context = React.createContext<_IConfig>(defaultConfig);