import React, { useEffect } from 'react';
import { Flex } from '@chakra-ui/react';
import TopBar from './components/top_bar';
import SideBar from './components/side_bar';
import CalenderPage from './components/calender_page';
import { useDispatch, useSelector } from 'react-redux';

const App = () => {

  const { month, monthNow, year, yearNow } = useSelector(
    (state: any) => state.userReducer,
  );

  useEffect(() => {
    console.log(year)
  })

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
