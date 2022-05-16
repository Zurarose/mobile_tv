import React, {useCallback, useContext, useEffect, useState} from 'react';
import {TvShowsApi} from "../../API/TvShowsApi";
import {UIContextAlert} from "../../Common/UIContext";
import ShowCard from "./utils/ShowCard";
import {Box, Divider, Typography} from "@mui/material";
import BtnMore from "./utils/BtnMore";

interface PropsTypes {
    date: Date;
    setDateCallback: (value: Date) => void
}

const TvShows: React.FC<PropsTypes> = ({date, setDateCallback}) => {
    const {setAlert} = useContext(UIContextAlert);
    const [shows, setShows] = useState<any>([]);
    const [showsLength, setShowsLength] = useState(0);
    const getShowsCallback = useCallback(async (length: 'full' | 'short' = 'short', date: Date) => {
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

    const expandShows = useCallback((indexFrom: number, showList: any) => {
        const expandShowList = [...shows];
        expandShowList.splice(indexFrom, 0, ...showList);
        setShows(expandShowList);
    }, [shows]);

    const unExpandShows = useCallback((indexFrom: number, showLength: number) => {
       const unExpandShowList = [...shows];
       unExpandShowList.splice(indexFrom - showLength, showLength);
       setShows(unExpandShowList);
    }, [shows]);

    const nextPage = useCallback(() => {
        const newDate = new Date(date.getTime());
        setDateCallback(new Date(newDate.setDate(newDate.getDate() - 1)));
    }, [date, setDateCallback]);

    const onScrollToBottom = useCallback(() => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 20) {
            nextPage()
        }
    }, [nextPage]);

    useEffect(() => {
        window.addEventListener('scroll', onScrollToBottom);
        return () => {
            window.removeEventListener('scroll', onScrollToBottom)
        }
    }, [onScrollToBottom]);

    useEffect(() => {
        (async () => {
            if (date) {
                const result = await getShowsCallback('short', date);
                if (result.length !== 0) {
                    const newDate = shows.concat([{date: date}]);
                    const newFooterBtn = [{dateForBtn: date, id: date + 'btn'}];
                    setShows(newDate.concat(result).concat(newFooterBtn));
                    setShowsLength(result.length)
                }
                /*if (document.body.clientHeight < window.innerHeight) {
                  nextPage()
                }*/
            }
        })()
    }, [date]);

    const monthNames = ["января", "февраля", "марта", "апреля", "мая", "июня",
        "июля", "августа", "сентября", "октября", "ноября", "декабря"
    ];

    return (
        <div>
            {shows.map((item: any, index: number) => {
                if (item && item.date) {
                    return (
                        <Box key={item.date} sx={{mt: 3}}>
                            <Typography variant='h6'>
                                {item.date.getUTCDate()} {monthNames[item.date.getMonth()]} {item.date.getFullYear()}
                            </Typography>
                            <Divider sx={{mt: 3}}/>
                        </Box>)
                } else if (item && item.dateForBtn) {
                    return (
                        <BtnMore key={item.id} index={index} showsLength={showsLength} expandShows={expandShows}
                                 getShowsCallback={getShowsCallback} date={date} unExpandShows={unExpandShows}/>
                    )
                } else if (item) {
                    return <ShowCard key={item.id} id={item.show.id} name={item.show.name} season={item.season}
                                     number={item.number}
                                     premiered={item.show.premiered} image={item.show.image}/>
                }
            })}
        </div>
    );
};
export default TvShows;