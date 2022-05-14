import React from 'react';
import tvBox from "./assets/images/tv_img.png";
import {Box, BoxProps, Container, styled, TextField, Typography} from "@mui/material";
import {LocalizationProvider, PickersDay, PickersDayProps, StaticDatePicker} from '@mui/x-date-pickers';
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {useNavigate} from "react-router-dom";

const BoxImg = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  justifyContent: 'center',
  flexGrow: '0.3',
  height: '125px',
}));

const CustomPickersDay = styled(PickersDay)<PickersDayProps<Date>>(({theme}) => ({
  borderRadius: 0,
  border: '1px solid grey',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.black,
})) as React.ComponentType<PickersDayProps<Date>>

interface PropTypes {
  setDateCallback: (value: Date) => void;
  date: Date;
}

const DateForm: React.FC<PropTypes> = ({setDateCallback, date}) => {
  const navigate = useNavigate();
  const renderWeekPickerDay = (
    date: Date,
    selectedDates: Array<Date | null>,
    pickersDayProps: PickersDayProps<Date>) => {
    return (
      <CustomPickersDay
        {...pickersDayProps}
        sx={{width: '100%'}}
        disableMargin
        disableHighlightToday={true}
        today={true}/>
    );
  };

  const onClick = (date: Date | null) => {
    if (date) {
      setDateCallback(date)
      navigate('/Shows');
    }
  }
  return (
    <>
      <Container fixed>
        <BoxImg sx={{mt: 5}}>
          <img alt='tv img' src={tvBox}/>
        </BoxImg>
        <Typography variant='h3' sx={{m: 3}}>
          Для получения списка сериалов, пожалуйста, выберите необходимый месяц и день.
        </Typography>
      </Container>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <StaticDatePicker
          views={['day']}
          displayStaticWrapperAs="mobile"
          showToolbar={false}
          label="day picker"
          value={date}
          onChange={(newDate) => {
            onClick(newDate)
          }}
          renderDay={renderWeekPickerDay}
          renderInput={(params) => <TextField {...params} />}
          showDaysOutsideCurrentMonth={true}
        />
      </LocalizationProvider>
    </>
  );
};

export default DateForm;