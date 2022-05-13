import React, {useCallback} from 'react';
import {Route, Routes} from 'react-router-dom';
import NavBar from '../../Common/NavBar';
import DateForm from "../DateForm";
import TvShows from "../TvShows";

const RootComponent: React.FC = () => {
  const today = new Date();
  const [date, setDate] = React.useState<Date>(today);

  const setDateCallback = useCallback((value: Date) => {
    setDate(value);
  }, [])

  return (
    <>
      <NavBar>
        <Routes>
          <Route index element={<DateForm date={date} setDateCallback={setDateCallback}/>}/>
          <Route path='/Shows' element={<TvShows date={date} setDateCallback={setDateCallback}/>}/>
        </Routes>
      </NavBar>
    </>
  );
};

export default RootComponent;