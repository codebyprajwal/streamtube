import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Avatar } from '@mui/material';
import {Grid, Box} from '@mui/material';
import {useNavigate} from "react-router-dom"


export default function MediaCard({eventClick, data}) {
  const navigate = useNavigate();

  function stringToColor(string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }
  
  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}`,
    };
  }




  return (
    <Card sx={{ maxWidth: 345 }} onClick={eventClick}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="200"
        image={data.snippet.thumbnails.high.url}
      />
      <CardContent>
      <Typography variant="body1" color="text.primary">
                        {data.snippet.title}
                        </Typography>
        <Box mt={1} mb={0}>
                <Grid  display="flex" justifyContent="left" alignItems="center">
                      <Avatar {...stringAvatar(data.snippet.channelTitle)} />
                        <Box ml={2}>
                                <Typography variant="body2" color="text.primary">
                                        {data.snippet.channelTitle} 
                                </Typography>
                        </Box>
                </Grid>
        </Box>
      </CardContent>
    </Card>
  );
}
