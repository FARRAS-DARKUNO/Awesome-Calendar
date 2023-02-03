import React, { useState, useEffect } from "react"
import {
    Box,
    Flex,
    Text
} from "@chakra-ui/react"
import { HiOutlinePlus } from 'react-icons/hi'
import { RiArrowUpSLine, RiArrowDownSLine, RiCheckboxFill } from 'react-icons/ri'
import colorBox from "../../utils/colorBox"

const SideBar = () => {

    const dummie = [
        {
            name: "Hallo nama saya",
            status: true,
        },
        {
            name: "Abdurrachman Farras",
            status: true,
        },
        {
            name: "Mantaps Mantas Hahahaha",
            status: false
        }
    ]
    const [isPress, setPress] = useState<boolean>(false)
    const [dataDummie, setDummie] = useState<Calendar.Dummies.SidebarData[]>(dummie)

    const chengeRow = () => setPress(!isPress)



    return (
        <Flex
            height={{
                base: '100vh',
                xl: 'calc(100vh - 90px)',
            }}
            background={'white'}
            width={{
                base: '44vw',
                md: '25vw',
                xl: '14vw'
            }}
            borderWidth={1}
            borderRightColor={'black'}
            padding={5}
            alignItems={'start'}
            flexDirection={'column'}
        >
            <Flex alignItems={'center'} justifyContent={'space-between'} width={'100%'}>
                <Text>My Calender</Text>
                <HiOutlinePlus size={16} />
                {
                    isPress
                        ? <RiArrowUpSLine size={24} onClick={chengeRow} />
                        : <RiArrowDownSLine size={24} onClick={chengeRow} />
                }
            </Flex>
            {
                isPress
                    ? dummie.map((placement: any, index: number) => (
                        <Flex marginTop={2} alignItems={'center'} key={Math.random().toString()}>
                            {
                                placement.status
                                    ? <RiCheckboxFill color={colorBox[index]} size={26} />
                                    : <Box
                                        height={5}
                                        width={5}
                                        borderWidth={1}
                                        borderColor={colorBox[index]}
                                        marginRight={2}
                                    />
                            }


                            <Text fontSize={12}>
                                {placement.name}
                            </Text>
                        </Flex>
                    ))
                    : null
            }

        </Flex>
    )
}

export default SideBar