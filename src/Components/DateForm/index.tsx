import React from 'react';
import tvBox from "./assets/images/tv_img.png";
import {Box, BoxProps, Container, styled, TextField, Typography} from "@mui/material";
import {LocalizationProvider, PickersDay, PickersDayProps, StaticDatePicker} from '@mui/x-date-pickers';
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {useNavigate} from "react-router-dom";

interface PropTypes {
  setDateCallback: (value: Date) => void;
  date: Date;
}

const BoxImg = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  justifyContent: 'center',
  flexGrow: '0.3',
  height: '125px',
}));

const CustomPickersDay = styled(PickersDay)<PickersDayProps<Date>>(({theme}) => ({
  borderRadius: 0,
  boxSizing: 'border-box',
  border: '1px solid #bdbdbd',
  color: theme.palette.common.black,
  '&.Mui-selected': {
    borderColor: theme.palette.error.main,
    fontWeight: 800,
    backgroundColor: `${theme.palette.primary.light} !important`,
  }
})) as React.ComponentType<PickersDayProps<Date>>;

const DateForm: React.FC<PropTypes> = ({setDateCallback, date}) => {
  const navigate = useNavigate();
  const renderWeekPickerDay = (
    date: Date,
    selectedDates: Array<Date | null>,
    pickersDayProps: PickersDayProps<Date>) => {
    return (
      <CustomPickersDay
        {...pickersDayProps}
        sx={{width: '100% !important'}}
        disableMargin
        disableHighlightToday={true}
        today={true}
        onClick={() => {
          setTimeout(() => {
            navigate('/shows')
          }, 350);
        }}
      />
    );
  };

  return (
    <>
      <Container fixed>
        <BoxImg sx={{mt: 5}}>
          <img alt='tv img' src={tvBox}/>
        </BoxImg>
        <Typography variant='h6' sx={{m: 3}}>
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
            if (newDate) {
              setDateCallback(newDate)
            }
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