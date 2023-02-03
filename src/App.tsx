import React from 'react';
import { Flex } from '@chakra-ui/react';
import TopBar from './components/top_bar';
import SideBar from './components/side_bar';
import CalenderPage from './components/calender_page';

const App = () => {
  return (
    <Flex
      width={"100vw"}
      height={"100vh"}
      flexDirection={'column'}
    >
      <TopBar />
      <Flex>
        <SideBar />
        <CalenderPage />
      </Flex>
    </Flex>
  )
}

export default App
