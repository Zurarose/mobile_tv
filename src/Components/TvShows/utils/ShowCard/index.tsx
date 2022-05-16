import React, {useContext} from 'react';
import {
  Box,
  BoxProps,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  styled,
  Typography
} from "@mui/material";
import {UIContextModal} from "../../../../Common/UIContext";
import noImage from '../../assets/images/No_Image_Available.jpg'

interface PropsType {
  id: number;
  name: string;
  number: number;
  season: number;
  premiered: string;
  image: { medium: string, original: string };
}

const CardBody = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  boxShadow: 'none',
}));

const BoxColumn = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  flexDirection: 'column'
}));

const BoxSerial = styled(Box)<BoxProps>(() => ({
  backgroundColor: '#f5f5f5',
  borderRadius: '5px',
  width: '80%'
}));

const imageStyle = {
  borderRadius: '15px',
  maxHeight: '120px',
  objectFit: 'contain'
};

const ShowCard: React.FC<PropsType> = React.memo(({id, name, number, season, premiered, image}) => {
  const {setModal} = useContext(UIContextModal);

  return (
    <CardBody sx={{my: 4}}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <CardMedia
            component='img'
            sx={imageStyle}
            src={image ? image.medium : noImage}
            onClick={() => {
              setModal({
                open: true,
                image: image.original
              })
            }}
          />
        </Grid>
        <Grid item xs={8}>
          <BoxColumn>
            <CardContent sx={{px: 1, pt: 1}}>
              <Typography variant="h5">
                {name}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                {premiered.split('-')[0]}
              </Typography>
            </CardContent>
            <CardActions>
              <BoxSerial sx={{p: 1}}>
                <Typography variant="subtitle1" color="text.secondary">
                  Сезон: {season} Эпизод: {number}
                </Typography>
              </BoxSerial>
            </CardActions>
          </BoxColumn>
        </Grid>
      </Grid>
    </CardBody>
  );
});

export default ShowCard;