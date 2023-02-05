import React, { useEffect } from "react"
import {
    Box,
    Flex,
    FlexProps,
    Text,
} from "@chakra-ui/react"
import { GrMenu } from 'react-icons/gr'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import { useDispatch, useSelector } from "react-redux"
import montName from "../../utils/montName"
import { rSetMonth, rSetYear, rSetShowBar } from './../../redux/action';

const TopBar = () => {

    const dispace = useDispatch()

    const { month, monthNow, year, yearNow, isShowSideBar } = useSelector(
        (state: any) => state.userReducer,
    );

    const tempisShowSideBar: boolean = isShowSideBar

    const center: FlexProps = {
        'alignItems': 'center',
        'display': 'flex',
        'marginRight': 5
    }

    const nextMonthYear = () => {
        if (month + 1 > 12) {
            dispace(rSetMonth(1))
            dispace(rSetYear(year + 1))
        }
        else {
            dispace(rSetMonth(month + 1))
        }
    }
    const prevMonthYear = () => {
        if (month - 1 == 0) {
            dispace(rSetMonth(12))
            dispace(rSetYear(year - 1))
        }
        else {
            dispace(rSetMonth(month - 1))
        }
    }
    const nowMonthYear = () => {
        dispace(rSetMonth(monthNow))
        dispace(rSetYear(yearNow))
    }

    const changeDraw = () => {
        dispace(rSetShowBar(!tempisShowSideBar))
    }

    useEffect(() => { }, [month, monthNow, year, yearNow])

    return (
        <Flex
            backgroundColor={"white"}
            borderWidth={1}
            height={{
                base: 'max-content',
                xl: 90,
            }}
            borderBottomColor={'black'}
            padding={5}
            flexDirection={{
                base: 'column',
                lg: 'row',
                xl: 'row',
                md: 'row',
            }}
        >
            <Flex
                justifyContent={{
                    base: 'space-between',
                    lg: 'normal',
                    xl: 'normal',
                    md: 'normal',
                }}
            >
                <Box {...center} cursor={'pointer'} onClick={changeDraw}>
                    <GrMenu size={24} />
                </Box>
                <Box {...center} >
                    <Text fontWeight={'bold'} fontSize={24}>Awesome Calender</Text>
                </Box>
                <Box
                    borderWidth={2}
                    borderColor={'black'}
                    paddingX={4}

                    {...center}
                    onClick={nowMonthYear}
                    cursor={'pointer'}
                >
                    <Text fontSize={12} fontWeight={'bold'} > Today </Text>
                </Box>
            </Flex>
            <Flex
                marginTop={{
                    base: 5,
                    md: 0,
                    xl: 0
                }}
                justifyContent={{
                    base: 'space-around',
                    lg: 'normal',
                    xl: 'normal',
                }}
            >
                <Box width={50} {...center}>
                    <HiChevronLeft size={24} onClick={prevMonthYear} cursor={'pointer'} />
                    <HiChevronRight size={24} onClick={nextMonthYear} cursor={'pointer'} />
                </Box>
                <Box
                    alignItems={'center'}
                    display={'flex'}
                >
                    {`${montName[month - 1]} ${year}`}
                </Box>
            </Flex>
        </Flex>
    )
}

export default TopBar