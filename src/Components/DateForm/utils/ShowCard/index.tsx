import React from 'react';
import {Box, Card, CardActions, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import test_img from './Layer 17.png'

const ShowCard = () => {
  return (
    <Card sx={{display: 'flex', boxShadow: 'none'}}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <CardMedia
            sx={{borderRadius: '15px', maxHeight: '120px', height: '100%', objectFit: 'contain'}}
            component="img"
            src={test_img}
          />
        </Grid>
        <Grid item xs={8}>
          <Box sx={{display: 'flex', flexDirection: 'column'}}>
            <CardContent sx={{px: 1, pt: 1}}>
              <Typography component="div" variant="h6">
                Теория большого взрыва
              </Typography>
              <Typography variant="subtitle2" color="text.secondary" component="div">
                2013
              </Typography>
            </CardContent>
            <CardActions>
              <Box sx={{backgroundColor: '#f5f5f5', p: 1, borderRadius: '5px'}}>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                  Сезон: 2 Эпизод: 12
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