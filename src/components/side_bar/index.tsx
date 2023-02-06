import React, { useState, useEffect } from "react"
import {
    Box,
    Button,
    Flex,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    Text,
    useDisclosure
} from "@chakra-ui/react"
import { HiOutlinePlus } from 'react-icons/hi'
import { RiArrowUpSLine, RiArrowDownSLine, RiCheckboxFill } from 'react-icons/ri'
import colorBox from "../../utils/colorBox"
import { useDispatch, useSelector } from "react-redux"
import montName from "../../utils/montName"
import moment from "moment"
import { rTriger } from "../../redux/action"
import nameOfDate from "../../utils/nameInDate"
import ListBox from "./listBox"

const SideBar = () => {

    const dispatch = useDispatch()

    const { isOpen, onOpen, onClose } = useDisclosure()

    const [openEditDoubleTouch, setOpenEdit] = useState<boolean>(false)
    const [indexEditDoubleTouch, setOpenIndex] = useState<number>(0)

    const { monthNow, monthTouch, yearTouch, dayTouch, isShowSideBar, triger } = useSelector(
        (state: any) => state.userReducer,
    );

    const [isPress, setPress] = useState<boolean>(false)
    const [dataDummie, setDummie] = useState<Calendar.Dummies.SidebarData[]>([])

    const [text, setText] = useState<string>('')
    const [nameUser, setNameUser] = useState<string>('')
    const [description, setDescription] = useState<string>('')

    const handleChangeText = (event: any) => setText(event.target.value)
    const handleChangeName = (event: any) => setNameUser(event.target.value)
    const handleChangeDescription = (event: any) => setDescription(event.target.value)

    const chengeRow = () => setPress(!isPress)

    const saveList = () => {
        let dataSent = {
            name: text == '' ? 'New Calender' : text,
            user: nameUser == '' ? 'New Calender' : nameUser,
            description: description,
            status: true,
        }

        let dataStorage = localStorage.getItem(`${dayTouch}${monthTouch}${yearTouch}`)

        if (dataStorage == null) {
            localStorage.setItem(`${dayTouch}${monthTouch}${yearTouch}`, JSON.stringify([dataSent]))
        }
        else {
            let currentStorage: (typeof dataSent)[];

            try {
                currentStorage = JSON.parse(dataStorage)
            } catch {
                currentStorage = [];
            }
            currentStorage.push(dataSent)
            localStorage.setItem(`${dayTouch}${monthTouch}${yearTouch}`, JSON.stringify(currentStorage))
        }

        // dataStorage = localStorage.getItem(`${dayTouch}${monthTouch}${yearTouch}`)

        // console.log(dataStorage)

        setText('')
        setNameUser('')
        setDescription('')
        dispatch(rTriger(!triger))
    }

    const setListFirst = () => {
        let listFirst = localStorage.getItem(`${dayTouch}${monthTouch}${yearTouch}`)

        let currentStorage = listFirst == null ? [] : JSON.parse(listFirst)

        setDummie(currentStorage)
    }

    const onChnageBox = (index: number) => {
        dataDummie[index].status = !dataDummie[index].status
        localStorage.setItem(`${dayTouch}${monthTouch}${yearTouch}`, JSON.stringify(dataDummie))

        dispatch(rTriger(!triger))
    }

    const onChangeName = () => {
        dataDummie[indexEditDoubleTouch].name = text
        localStorage.setItem(`${dayTouch}${monthTouch}${yearTouch}`, JSON.stringify(dataDummie))

        dispatch(rTriger(!triger))
        setOpenEdit(false)
    }
    const removeDataList = () => {
        dataDummie.splice(indexEditDoubleTouch, 1)
        localStorage.setItem(`${dayTouch}${monthTouch}${yearTouch}`, JSON.stringify(dataDummie))
        dispatch(rTriger(!triger))
    }

    useEffect(() => {
        setListFirst()
    }, [dayTouch, monthTouch, yearTouch, triger])

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{`${moment(`${yearTouch}-${monthTouch}-${dayTouch}`, `YYYY-MM-DD`).format('dddd')}, ${montName[monthTouch - 1]} ${dayTouch}`}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                        <Input
                            placeholder='Add title'
                            value={text}
                            onChange={handleChangeText}
                        />
                        <Select placeholder='Select option' onChange={handleChangeName}>
                            {
                                nameOfDate.map((name: string, index: number) => (
                                    <option value={name}>{name}</option>
                                ))
                            }
                        </Select>
                        <Input
                            placeholder='Add description'
                            value={description}
                            onChange={handleChangeDescription}
                        />
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={saveList} cursor={'pointer'}>
                            Save
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>


            <Flex
                height={{
                    base: '100vh',
                    xl: 'calc(100vh - 90px)',
                }}
                background={'white'}
                width={{
                    base: '30vw',
                    md: '25vw',
                    xl: '14vw'
                }}
                display={!isShowSideBar ? 'none' : 'block'}
                borderWidth={1}
                borderRightColor={'black'}
                padding={5}
                alignItems={'start'}
                flexDirection={'column'}
            >
                <Flex alignItems={'center'} justifyContent={'space-between'} width={'100%'}
                    flexDirection={{
                        base: 'column',
                        xl: 'row'
                    }}
                >
                    <Text>My Calender</Text>
                    <Flex
                        justifyContent={{
                            base: 'space-between',
                            lg: 'none'
                        }}>
                        <HiOutlinePlus size={16} onClick={onOpen} cursor={'pointer'} />
                        {
                            isPress
                                ? <RiArrowUpSLine size={24} onClick={chengeRow} cursor={'pointer'} />
                                : <RiArrowDownSLine size={24} onClick={chengeRow} cursor={'pointer'} />
                        }
                    </Flex>
                </Flex>
                {
                    isPress
                        ? dataDummie.map((placement: Calendar.Dummies.SidebarData, index: number) => {
                            let isClick = false

                            return <Flex marginTop={2} alignItems={'center'} key={Math.random().toString()}>
                                {
                                    placement.status
                                        ? <RiCheckboxFill color={colorBox[index]} size={26} onClick={() => onChnageBox(index)} />
                                        : <Box
                                            height={5}
                                            width={5}
                                            borderWidth={1}
                                            borderColor={colorBox[index]}
                                            marginRight={2}
                                            onClick={() => onChnageBox(index)}
                                        />
                                }
                                <ListBox placement={placement} dataDummie={dataDummie} index={index} />

                            </Flex>
                        })
                        : null
                }

            </Flex>
        </>
    )
}

export default SideBar