import moment from "moment"

const getDataCalender =(month:number|string = moment().get('month') + 1, year:number |string = moment().get('year')) => {
    const totaldayInCalender = 35

    const dayInMonth = moment(`${year}-${month}`, `YYYY-MM`).daysInMonth()
    let totalDayPrevInMonth = moment(`${year}-${+(month)-1}`, `YYYY-MM`).daysInMonth()
    const startdayinMonth = moment(`${year}-${month}`, `YYYY-MM`).startOf('month').format('d')


    const result: number[] = []
    
    for (let i = 0 ; i < parseInt(startdayinMonth); i++){
        result.unshift(totalDayPrevInMonth--)
    }

    for (let i = 1;  i <= dayInMonth; i++){
        result.push(i)
    }

    const currentLength = result.length
    
    for (let i = 1 ;  i <= totaldayInCalender - currentLength; i++){
        result.push(i) 
    }

    return result
}

export default getDataCalender