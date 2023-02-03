import {
    Box,
    Flex,
    FlexProps,
    Text,
} from "@chakra-ui/react"
import { GrMenu } from 'react-icons/gr'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'

const TopBar = () => {

    const center: FlexProps = {
        'alignItems': 'center',
        'display': 'flex',
        'marginRight': 10
    }



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
                <Box {...center} >
                    <GrMenu size={24} />
                </Box>
                <Box {...center} >
                    <Text>Awesome Calender</Text>
                </Box>
                <Box
                    borderWidth={2}
                    borderColor={'black'}
                    paddingX={5}
                    {...center}
                >
                    Today
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
                    <HiChevronLeft size={24} />
                    <HiChevronRight size={24} />
                </Box>
                <Box
                    alignItems={'center'}
                    display={'flex'}
                >
                    Januari 2023
                </Box>
            </Flex>
        </Flex>
    )
}

export default TopBar