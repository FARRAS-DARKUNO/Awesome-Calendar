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

const CalenderPage = () => {

    const [date, setDete] = useState<number[]>([])
    const [dateNow, setDateNow] = useState<number>(0)

    const getMoment = () => {

    }

    useEffect(() => {
        setDete(getDataCalender(2, 2023))
        setDateNow(indexDataNow())
    }, [])


    return (
        <Flex
            height={{
                base: '100vh',
                xl: 'calc(100vh - 90px)',
            }}
            background={'white'}
            width={{
                base: '56vw',
                md: '75vw',
                xl: '86vw'
            }}
            display={'grid'}
        >
            <Grid templateColumns='repeat(7, 1fr)' gap={0}>
                {
                    date.map((placement: number, index: number) => (
                        <GridItem w='100%' h='100%' key={index}>
                            <Flex
                                borderWidth={1}
                                borderColor={'black'}
                                w='100%' h='100%'
                                justifyContent={'space-between'}
                                alignItems={'center'}
                                padding={5}
                                flexDirection={'column'}
                            >
                                <Box alignItems={'center'} display={'flex'} flexDirection={'column'}>
                                    {
                                        index <= 6 ? <Text>{dayName[index]}</Text> : null
                                    }
                                    {
                                        dateNow - 1 == index
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
                            </Flex>
                        </GridItem>
                    ))
                }
            </Grid>
        </Flex>
    )
}

export default CalenderPage