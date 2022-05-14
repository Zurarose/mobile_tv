import React, {useContext} from 'react';
import {Box, Card, CardActions, CardContent, CardMedia, Grid, Typography} from "@mui/material";
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

const ShowCard: React.FC<PropsType> = ({id, name, number, season, premiered, image}) => {
  const {setModal} = useContext(UIContextModal)

  return (
    <Card sx={{display: 'flex', boxShadow: 'none', my: 4}}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <CardMedia
            sx={{borderRadius: '15px', maxHeight: '120px', objectFit: 'contain'}}
            component="img"
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
          <Box sx={{display: 'flex', flexDirection: 'column'}}>
            <CardContent sx={{px: 1, pt: 1}}>
              <Typography component="div" variant="h5">
                {name}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary" component="div">
                {premiered.split('-')[0]}
              </Typography>
            </CardContent>
            <CardActions>
              <Box sx={{backgroundColor: '#f5f5f5', p: 1, borderRadius: '5px', width: '80%'}}>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                  Сезон: {season} Эпизод: {number}
                </Typography>
              </Box>
            </CardActions>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ShowCard;