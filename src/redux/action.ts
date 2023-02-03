export const MONTH_NOW = 'MONTH_NOW'
export const YEAR_NOW = 'YEAR_NOW'
export const MONTH = 'MONTH'
export const YEAR = 'YEAR'

export const rSetMonthNow = (data : number) => ({
    type: MONTH_NOW,
    payload: data,
})

export const rSetYearNow = (data : string) => ({
    type: YEAR_NOW,
    payload: data,
})

export const rSetMonth = (data : number) => ({
    type: MONTH,
    payload: data,
})

export const rSetYear = (data : string) => ({
    type: YEAR,
    payload: data,
})