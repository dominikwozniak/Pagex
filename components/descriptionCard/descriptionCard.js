import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { StayPrimaryLandscape } from '@material-ui/icons';

const useStyles = makeStyles({
  root: {
    minWidth: 200,
    padding: 5, 
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
    marginLeft:10,
    marginRight: 10,
    // color: primary,
  },
  pos: {
    marginBottom: 20,
    marginLeft:10,
    marginRight: 10,
  },
});

export default function DescriptionCard({head, description}) {
  const classes = useStyles();
  // const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} variant="h5" gutterBottom>
          {head}
          <br/>
        </Typography>
        <Typography variant="h5" component="h2">
        <hr/>
        <br/>
        </Typography>
        <Typography className={classes.pos} >
          {description}
        </Typography>
      </CardContent>
      
    </Card>
  );
}