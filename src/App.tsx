import React, { useEffect } from 'react';
import { Flex } from '@chakra-ui/react';
import TopBar from './components/top_bar';
import SideBar from './components/side_bar';
import CalenderPage from './components/calender_page';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { rSetMonth, rSetYear, rSetShowBar, rSetDayTouch, rSetMonthNow, rSetMonthTouch, rSetYearNow, rSetYearTouch } from '../src/redux/action'


const App = () => {
  const dispace = useDispatch()

  const { monthNow, yearNow, month, year, monthTouch, yearTouch, dayTouch, isShowSideBar } = useSelector(
    (state: any) => state.userReducer,
  );

  const setTime = () => {
    const getMonth = moment().month()
    const getYear = moment().year()
    const getDay = moment().date()

    dispace(rSetMonthNow(getMonth + 1))
    dispace(rSetMonth(getMonth + 1))
    dispace(rSetYearNow(getYear))
    dispace(rSetYear(getYear))
    dispace(rSetYearTouch(getYear))
    dispace(rSetMonthTouch(getMonth + 1))
    dispace(rSetDayTouch(getDay))
  }

  useEffect(() => {
    setTime()
  }, [])

  return (
    <Flex
      width={"100vw"}
      height={"100vh"}
      flexDirection={'column'}
      position={'relative'}
    >
      <TopBar />
      <Flex position={'relative'}>
        <SideBar />
        <CalenderPage />
      </Flex>
    </Flex>
  )
}

export default App
