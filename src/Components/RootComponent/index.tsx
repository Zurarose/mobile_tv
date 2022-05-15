import React, {useCallback} from 'react';
import {Route, Routes} from 'react-router-dom';
import NavBar from '../../Common/NavBar';
import DateForm from "../DateForm";

const TvShows = React.lazy(() => import("../TvShows"))


const RootComponent: React.FC = () => {
  const [date, setDate] = React.useState<Date>(new Date());

  const setDateCallback = useCallback((value: Date) => {
    setDate(value);
  }, [])

  return (
    <>
      <NavBar>
        <Routes>
          <Route index element={<DateForm date={date} setDateCallback={setDateCallback}/>}/>
          <Route path='/shows' element={<TvShows date={date} setDateCallback={setDateCallback}/>}/>
        </Routes>
      </NavBar>
    </>
  );
};

export default RootComponent;