import React, {useCallback, useContext, useEffect, useState} from 'react';
import {TvShowsApi} from "../../API/TvShowsApi";
import {UIContext} from "../../Common/UIContext";
import ShowCard from "../DateForm/utils/ShowCard";

interface PropsTypes {
  date: Date,
  setDateCallback: (value: Date) => void;
}

const TvShows: React.FC<PropsTypes> = ({date, setDateCallback}) => {
  const {setAlert} = useContext(UIContext)
  const [shows, setShows] = useState<any>([]);

  const getShowsCallback = useCallback(async (length: 'full' | 'short', date: Date) => {
    try {
      const result = await TvShowsApi.getShowList(length, date);
      setShows(result);
    } catch (error) {
      const result = (error as Error).message;
      setAlert({
        show: true,
        severity: 'error',
        message: result,
      });
    }
  }, [setAlert])

  useEffect(() => {
    (async () => {
      await getShowsCallback('short', date)
    })()
  }, [date, getShowsCallback])

  const nextPage = useCallback(async () => {
    const tomorrow = new Date(date.setDate(date.getDate() + 1));
    await getShowsCallback('short', tomorrow)
  }, [date, getShowsCallback])

  return (
    <div>
      {shows.map((item: JSX.IntrinsicAttributes) => {
        return <ShowCard {...item}/>
      })}

      <button onClick={nextPage}>Click</button>
    </div>
  );
};

export default TvShows;