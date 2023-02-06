import React, { useState } from "react"
import {
    Input,
    Text,
} from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux"
import { rTriger } from "../../redux/action"
import { GrTrash } from 'react-icons/gr'

const ListBox = ({ placement, dataDummie, index }: Props) => {
    const dispatch = useDispatch()

    const [isClick, setClick] = useState<boolean>(false)
    const [text, setText] = useState<string>('')

    const { monthTouch, yearTouch, dayTouch, triger } = useSelector(
        (state: any) => state.userReducer,
    );

    const onChangeName = () => {
        if (!dataDummie[index]) dataDummie[index] = {} as typeof dataDummie[number]

        dataDummie[index].user = text
        localStorage.setItem(`${dayTouch}${monthTouch}${yearTouch}`, JSON.stringify(dataDummie))
        setClick(false)
    }

    const removeDataList = () => {
        dataDummie.splice(index, 1)
        localStorage.setItem(`${dayTouch}${monthTouch}${yearTouch}`, JSON.stringify(dataDummie))
        dispatch(rTriger(!triger))
    }

    const handleChangeText = (event: any) => setText(event.target.value)
    return (
        <>
            {
                isClick
                    ? <Input
                        placeholder='Add description'
                        value={text}
                        onChange={handleChangeText}
                        onKeyPress={e => {
                            if (e.key === 'Enter') {
                                onChangeName()
                            }
                        }}

                    />
                    : <Text fontSize={12}
                        cursor={'pointer'}
                        onClick={() => {
                            setClick(true)
                            console.log('hahl')
                        }}
                    >
                        {placement.user}
                    </Text>
            }
            {
                isClick
                    ? <GrTrash size={25} onClick={removeDataList} />
                    : null
            }
        </>
    )
}

interface Props {
    placement: Calendar.Dummies.SidebarData,
    dataDummie: Calendar.Dummies.SidebarData[],
    index: number
}

export default ListBox