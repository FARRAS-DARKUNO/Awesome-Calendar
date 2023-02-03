import React, { useEffect } from 'react';
import { Flex } from '@chakra-ui/react';
import TopBar from './components/top_bar';
import SideBar from './components/side_bar';
import CalenderPage from './components/calender_page';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { rSetMonthNow, rSetYearNow, rSetMonth, rSetYear } from './redux/action';

const App = () => {
  const dispace = useDispatch()

  const { month, monthNow, year, yearNow, isShowSideBar } = useSelector(
    (state: any) => state.userReducer,
  );

  const setTime = () => {
    const getMonth = moment().month()
    const getYear = moment().year()

    dispace(rSetMonthNow(getMonth + 1))
    dispace(rSetMonth(getMonth + 1))
    dispace(rSetYearNow(getYear))
    dispace(rSetYear(getYear))
  }

  useEffect(() => {
    setTime()
  }, [])

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
