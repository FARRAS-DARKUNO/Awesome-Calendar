import React, { useEffect, useState } from "react"
import {
    Box,
    Button,
    Flex,
    Grid,
    GridItem,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text
} from "@chakra-ui/react"
import getDataCalender from "../../utils/getDateCalender"
import dayName from "../../utils/day"
import indexDataNow from "../../utils/indexdayNow"
import { useDispatch, useSelector } from "react-redux"
import { rSetDayTouch, rSetMonthTouch, rSetYearTouch, rTriger } from './../../redux/action'
import moment from "moment"
import colorBox from "../../utils/colorBox"
import { FiTrash2 } from "react-icons/fi"
import { FaRegCalendarAlt } from "react-icons/fa"
import { BiMenuAltLeft } from 'react-icons/bi'
import montName from "../../utils/montName"

const CalenderPage = () => {

    const dispatch = useDispatch()

    const [date, setDete] = useState<number[]>([])
    const [dateNow, setDateNow] = useState<number>(0)
    const [indexEditDoubleTouch, setOpenIndex] = useState<number>(0)
    const [openEditDoubleTouch, setOpenEdit] = useState<boolean>(false)
    const [temporaryData, setTemporarydata] = useState<Calendar.Dummies.SidebarData>()

    const { monthNow, yearNow, month, year, monthTouch, yearTouch, dayTouch, triger } = useSelector(
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

        for (let i = 0; i < 7; i++) {
            if (index < i && value > i) {
                typeDete = 'prev'
            }
        }
        if (index + 1 > parseInt(startdayinMonth) + dayInMonth) {
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

    const removeDataList = () => {
        let listFirst = localStorage.getItem(`${dayTouch}${monthTouch}${yearTouch}`)

        let currentStorage = listFirst == null ? [] : JSON.parse(listFirst)
        currentStorage.splice(indexEditDoubleTouch, 1)
        localStorage.setItem(`${dayTouch}${monthTouch}${yearTouch}`, JSON.stringify(currentStorage))
        dispatch(rTriger(!triger))
    }

    useEffect(() => {
        setDete(getDataCalender(month, year))
        setDateNow(indexDataNow())
    }, [month, year, monthTouch, yearTouch, dayTouch])


    return (
        <>
            <Modal isOpen={openEditDoubleTouch} onClose={() => setOpenEdit(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{`${moment(`${yearTouch}-${monthTouch}-${dayTouch}`, `YYYY-MM-DD`).format('dddd')}, ${montName[monthTouch - 1]} ${dayTouch}`}</ModalHeader>
                    <ModalCloseButton ><FiTrash2 size={24} onClick={removeDataList} /></ModalCloseButton>

                    <ModalBody>
                        <Flex>
                            <Box
                                backgroundColor={colorBox[indexEditDoubleTouch]} w={5} h={5}
                                marginRight={2}
                            />
                            <Text>{temporaryData?.user}</Text>
                        </Flex>
                        <Flex>
                            <FaRegCalendarAlt size={20} />
                            <Text marginLeft={2}>{temporaryData?.name}</Text>
                        </Flex>
                        <Flex>
                            <BiMenuAltLeft size={20} />
                            <Text marginLeft={2}>{temporaryData?.description}</Text>
                        </Flex>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} cursor={'pointer'} onClick={() => setOpenEdit(false)}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

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
                                    <Box alignItems={'center'} display={'flex'} flexDirection={'column'} onClick={() => changeTouchValue(placement, index)} cursor={'pointer'}>
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
                                        getDataDummie(placement, index)
                                            .filter((data: Calendar.Dummies.SidebarData, indexr: number) => data.status == true)
                                            .map((data: Calendar.Dummies.SidebarData, index: number) => (
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
                                                        cursor={'pointer'}
                                                        onClick={() => {
                                                            setOpenIndex(index)
                                                            setOpenEdit(true)
                                                            setTemporarydata(data)
                                                        }}
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
        </>
    )
}

export default CalenderPage