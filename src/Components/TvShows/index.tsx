import React, {useCallback, useContext, useEffect, useState} from 'react';
import {TvShowsApi} from "../../API/TvShowsApi";
import {UIContextAlert} from "../../Common/UIContext";
import ShowCard from "./utils/ShowCard";
import {Box, Divider, Typography} from "@mui/material";

interface PropsTypes {
  date: Date;
  setDateCallback: (value: Date) => void
}

const TvShows: React.FC<PropsTypes> = ({date, setDateCallback}) => {
  const {setAlert} = useContext(UIContextAlert)
  const [shows, setShows] = useState<any>([]);

  const getShowsCallback = useCallback(async (length: 'full' | 'short', date: Date) => {
    try {
      return await TvShowsApi.getShowList(length, date)
    } catch (error) {
      const result = (error as Error).message;
      setAlert({
        show: true,
        severity: 'error',
        message: result,
      });
    }
  }, [setAlert]);

  const nextPage = useCallback(() => {
    const newDate = new Date(date.getTime());
    setDateCallback(new Date(newDate.setDate(newDate.getDate() + 1)));
  }, [date, setDateCallback]);

  const onScrollToBottom = useCallback(() => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 20) {
      nextPage()
    }
  }, [nextPage])

  useEffect(() => {
    window.addEventListener('scroll', onScrollToBottom)
    return () => {
      window.removeEventListener('scroll', onScrollToBottom)
    }
  }, [onScrollToBottom])

  useEffect(() => {
    (async () => {
      if (date) {
        const result = await getShowsCallback('short', date)
        const newDate = shows.concat([{date: date}])
        setShows(newDate.concat(result))
      }
    })()
  }, [date, getShowsCallback]);

  const monthNames = ["января", "февраля", "марта", "апреля", "мая", "июня",
    "июля", "августа", "сентября", "октября", "ноября", "декабря"
  ];

  return (
    <div>
      {shows.map((item: any) => {
        if (item.date) {
          return (
            <Box key={item.date} sx={{mt: 3}}>
              <Typography variant='h6'>
                {date.getUTCDate()} {monthNames[date.getMonth()]} {date.getFullYear()}
              </Typography>
              <Divider sx={{mt: 3}}/>
            </Box>)
        } else {
          return <ShowCard key={item.id} id={item.id} name={item.name} season={item.season} number={item.number}
                           premiered={item._embedded.show.premiered} image={item._embedded.show.image}/>
        }
      })}
    </div>
  );
};
export default TvShows;