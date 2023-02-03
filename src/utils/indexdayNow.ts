import moment from "moment";

const indexDataNow = (month:number|string = moment().get('month') + 1, year:number |string = moment().get('year')) => {

    const day = moment().date()

    const startdayinMonth = moment(`${year}-${month}`, `YYYY-MM`).startOf('month').format('d')

    const result = day + parseInt(startdayinMonth)

    return result
}

export default indexDataNow