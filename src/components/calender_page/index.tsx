import React, { useEffect, useState } from "react"
import {
    Box,
    Flex,
    Grid,
    GridItem,
    Text
} from "@chakra-ui/react"
import getDataCalender from "../../utils/getDateCalender"
import dayName from "../../utils/day"
import indexDataNow from "../../utils/indexdayNow"
import { useDispatch, useSelector } from "react-redux"
import { rSetDayTouch, rSetMonthTouch, rSetYearTouch } from './../../redux/action'
import moment from "moment"
import colorBox from "../../utils/colorBox"

const CalenderPage = () => {

    const [date, setDete] = useState<number[]>([])
    const [dateNow, setDateNow] = useState<number>(0)

    const { monthNow, yearNow, month, year, monthTouch, yearTouch, dayTouch, } = useSelector(
        (state: any) => state.userReducer,
    );

    const dayInMonth = moment(`${year}-${month}`, `YYYY-MM`).daysInMonth()
    const startdayinMonth = moment(`${year}-${month}`, `YYYY-MM`).startOf('month').format('d')

    const dispace = useDispatch()

    const getDataDummie = (value: number, index: number) => {
        let days = 0
        let months = 0
        let years = 0
        let typeDete = 'this'

        for (let i = 0; i < 7; i++) {
            if (index < i && value > i) {
                typeDete = 'prev'
            }
        }
        if (index + 1 > parseInt(startdayinMonth) + dayInMonth) {
            typeDete = 'next'
        }
        if (typeDete == 'this') {
            years = year
            months = month
            days = value
        }
        else {
            if (typeDete == 'prev') {
                if (month - 1 < 1) {
                    years = year - 1
                    months = 12
                }
                else {
                    years = year
                    months = month - 1
                }
            }
            if (typeDete == 'next') {
                if (month + 1 > 12) {
                    years = year + 1
                    months = 1
                }
                else {
                    years = year
                    months = month + 1
                }
            }
            days = value
        }

        let listFirst = localStorage.getItem(`${days}${months}${years}`)

        let currentStorage: Calendar.Dummies.SidebarData[] = listFirst == null ? [] : JSON.parse(listFirst)

        return currentStorage

    }

    const changeTouchValue = (value: number, index: number) => {

        let typeDete = 'this'
        let isThisMonth = true

        for (let i = 0; i < 7; i++) {
            if (index < i && value > i) {
                isThisMonth = false
                typeDete = 'prev'
            }
        }
        if (index + 1 > parseInt(startdayinMonth) + dayInMonth) {
            isThisMonth = false
            typeDete = 'next'
        }

        if (typeDete == 'this') {
            dispace(rSetYearTouch(year))
            dispace(rSetMonthTouch(month))
            dispace(rSetDayTouch(value))
        }
        else {
            if (typeDete == 'prev') {
                if (month - 1 < 1) {
                    dispace(rSetYearTouch(year - 1))
                    dispace(rSetMonthTouch(12))

                }
                else {
                    dispace(rSetYearTouch(year))
                    dispace(rSetMonthTouch(month - 1))

                }
            }
            if (typeDete == 'next') {
                if (month + 1 > 12) {
                    dispace(rSetYearTouch(year + 1))
                    dispace(rSetMonthTouch(1))
                }
                else {
                    dispace(rSetYearTouch(year))
                    dispace(rSetMonthTouch(month + 1))
                }
            }
            dispace(rSetDayTouch(value))
        }
    }

    useEffect(() => {
        setDete(getDataCalender(month, year))
        setDateNow(indexDataNow())
    }, [month, year, monthTouch, yearTouch, dayTouch])


    return (
        <Flex
            height={'calc(100vh - 90px)'
            }
            background={'white'}
            width={'100vw'}
            display={'grid'}
            overflow={'auto'}
        >
            <Grid templateColumns='repeat(7, 1fr)' gap={0}>
                {
                    date.map((placement: number, index: number) => (
                        <GridItem
                            w='100%'
                            h='100%'
                            key={index}
                            cursor={'pointer'}
                            onClick={() => changeTouchValue(placement, index)}
                        >
                            <Flex
                                borderWidth={1}
                                borderColor={'black'}
                                w='100%' h='100%'
                                justifyContent={'space-between'}
                                alignItems={'center'}
                                padding={5}
                                flexDirection={'column'}
                            >
                                <Box alignItems={'center'} display={'flex'} flexDirection={'column'} >
                                    {
                                        index <= 6 ? <Text>{dayName[index]}</Text> : null
                                    }
                                    {
                                        dateNow - 1 == index && month == monthNow && year == yearNow
                                            ? <Box
                                                height={7}
                                                width={7}
                                                borderRadius={1000}
                                                display={'flex'}
                                                backgroundColor={'#32A4F8'}
                                                justifyContent={'center'}
                                                alignItems={'center'}
                                            >
                                                <Text color={'white'}>{placement}</Text>

                                            </Box>
                                            : <Text>{placement}</Text>

                                    }
                                </Box>
                                {
                                    getDataDummie(placement, index).map((data: Calendar.Dummies.SidebarData, index: number) => (
                                        index < 2 ?
                                            <Box
                                                paddingX={3}
                                                paddingY={1}
                                                backgroundColor={colorBox[index]}
                                                width={'100%'}
                                                justifyContent={'center'}
                                                alignItems={'center'}
                                                display={'flex'}
                                                borderRadius={10}
                                                key={index}
                                            >
                                                <Text
                                                    noOfLines={1}
                                                    color={'white'}
                                                >
                                                    {data.name}
                                                </Text>
                                            </Box>
                                            : null
                                    ))
                                }
                                {
                                    getDataDummie(placement, index).length > 2
                                        ? <Text>{`${getDataDummie(placement, index).length - 2} More`}</Text>
                                        : <Box />
                                }
                            </Flex>
                        </GridItem>
                    ))
                }
            </Grid>
        </Flex>
    )
}

export default CalenderPage