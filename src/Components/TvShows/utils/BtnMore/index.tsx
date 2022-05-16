import React, {useCallback, useEffect, useState} from 'react';
import {Box, BoxProps, Button, ButtonProps, styled, Typography} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const BtnShowMore = styled(Button)<ButtonProps>(({theme}) => ({
    backgroundColor: theme.palette.primary.light,
    borderColor: '#e0e0e0',
    color: theme.palette.common.black,
    borderRadius: '5px',
    width: '90%',
}));

const BoxCenter = styled(Box)<BoxProps>(() => ({
    display: 'flex',
    justifyContent: 'center',
}));

interface PropTypes {
    index: number;
    showsLength: number;
    date: Date;
    getShowsCallback: (length: 'full' | 'short', date: Date) => any
    expandShows: (indexFrom: number, showList: any) => void
    unExpandShows: (indexFrom: number, showLength: number) => void
}

const BtnMore: React.FC<PropTypes> = ({index, showsLength, date, getShowsCallback, expandShows, unExpandShows}) => {
    const [moreShows, setMoreShows] = useState([]);
    const [isExpand, setIsExpand] = useState<boolean>(false);

    const expandRequest = useCallback(() => {
        if (isExpand) {
            setIsExpand(false);
            unExpandShows(index, moreShows.length)
        } else {
            setIsExpand(true);
            expandShows(index, moreShows)
        }
    }, [expandShows, index, isExpand, moreShows, unExpandShows]);

    useEffect(() => {
        (async () => {
            let result = await getShowsCallback('full', date);
            result = result.slice(showsLength, result.length);
            setMoreShows(result)
        })()
    }, [date, getShowsCallback, showsLength]);

    return (
        <BoxCenter key={index}>
            <BtnShowMore onClick={expandRequest} variant="outlined">
                {isExpand
                    ? <><Typography sx={{textTransform: 'none'}} variant="subtitle2" color="text.secondary">Показать
                        основные
                    </Typography><ExpandLessIcon sx={{height: '18px'}}/></>
                    : <><Typography sx={{textTransform: 'none'}} variant="subtitle2" color="text.secondary">Показать
                        еще {moreShows.length - showsLength} сериала</Typography><ExpandMoreIcon
                        sx={{height: '18px'}}/></>
                }

            </BtnShowMore>
        </BoxCenter>
    );
};

export default BtnMore;