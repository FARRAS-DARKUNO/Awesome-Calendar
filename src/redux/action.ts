export const MONTH_NOW = 'MONTH_NOW'
export const YEAR_NOW = 'YEAR_NOW'
export const MONTH = 'MONTH'
export const YEAR = 'YEAR'
export const MONTH_TOUCH = 'MONTH_TOUCH'
export const YEAR_TOUCH = 'YEAR_TOUCH'
export const DAY_TOUCH = 'DAY_TOUCH'
export const SHOW_SIDE_BAR = 'SHOW_SIDE_BAR'
export const TRIGER = 'TRIGER'

export const rSetMonthNow = (data : number) => ({
    type: MONTH_NOW,
    payload: data,
})

export const rSetYearNow = (data : number) => ({
    type: YEAR_NOW,
    payload: data,
})

export const rSetMonth = (data : number) => ({
    type: MONTH,
    payload: data,
})

export const rSetYear = (data : number) => ({
    type: YEAR,
    payload: data,
})

export const rSetMonthTouch = (data : number) => ({
    type: MONTH_TOUCH,
    payload: data,
})

export const rSetYearTouch = (data : number) => ({
    type: YEAR_TOUCH,
    payload: data,
})

export const rSetDayTouch = (data : number) => ({
    type: DAY_TOUCH,
    payload: data,
})

export const rSetShowBar = (data : boolean) => ({
    type: SHOW_SIDE_BAR,
    payload: data,
})
export const rTriger = (data : boolean) => ({
    type: TRIGER,
    payload: data,
})