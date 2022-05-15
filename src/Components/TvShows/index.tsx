import React, {useCallback, useContext, useEffect, useState} from 'react';
import {TvShowsApi} from "../../API/TvShowsApi";
import {UIContextAlert} from "../../Common/UIContext";
import ShowCard from "./utils/ShowCard";
import {Box, BoxProps, Button, ButtonProps, Divider, styled, Typography} from "@mui/material";

interface PropsTypes {
  date: Date;
  setDateCallback: (value: Date) => void
}

const BtnMore = styled(Button)<ButtonProps>(({theme}) => ({
  backgroundColor: theme.palette.primary.light,
  borderColor: '#e0e0e0',
  color: theme.palette.common.black,
  borderRadius: '5px',
  width: '80%'
}));

const BoxCenter = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  justifyContent: 'center',
}));


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
        if (result.length !== 0) {
          const newDate = shows.concat([{date: date}])
          const newFooterBtn = [{footer: "here"}]
          setShows(newDate.concat(result).concat(newFooterBtn))
        }
        if (document.body.clientHeight < window.innerHeight) {
          nextPage()
        }
      }
    })()
  }, [date]);

  const monthNames = ["января", "февраля", "марта", "апреля", "мая", "июня",
    "июля", "августа", "сентября", "октября", "ноября", "декабря"
  ];

  return (
    <div>
      {shows.map((item: any) => {
        if (item && item.date) {
          return (
            <Box key={item.date} sx={{mt: 3}}>
              <Typography variant='h6'>
                {item.date.getUTCDate()} {monthNames[item.date.getMonth()]} {item.date.getFullYear()}
              </Typography>
              <Divider sx={{mt: 3}}/>
            </Box>)
        } else if (item && item.footer) {
          return (
            <BoxCenter>
              <BtnMore variant="outlined">
                <Typography variant="subtitle2" color="text.secondary">Показать еще</Typography>
              </BtnMore>
            </BoxCenter>
          )
        } else if (item) {
          return <ShowCard key={item.id} id={item.id} name={item.name} season={item.season} number={item.number}
                           premiered={item._embedded.show.premiered} image={item._embedded.show.image}/>
        }
      })}
    </div>
  );
};
export default TvShows;