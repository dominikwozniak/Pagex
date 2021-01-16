import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import DescriptionCard from '../descriptionCard/descriptionCard';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
        color: theme.palette.text.primiary,
    },
  }));
  
  export default function CardArray() {
    const classes = useStyles();
  
    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            {/* <Paper className={classes.paper}>xs=6 sm=3</Paper> */}
            <DescriptionCard head="No coding" description="Create your own customizable website without writing a single line of code!"></DescriptionCard>
          </Grid>
          <Grid item xs={4}>
            {/* <Paper className={classes.paper}>xs=6 sm=3</Paper> */}
            <DescriptionCard head="Free templates" description="Use our free templates!"></DescriptionCard>
            <br/>
          </Grid>
          <Grid item xs={4}>
            {/* <Paper className={classes.paper}>xs=6 sm=3</Paper> */}
            <DescriptionCard head="aj"></DescriptionCard>
          </Grid>
          <Grid item xs={4}>
            {/* <Paper className={classes.paper}>xs=6 sm=3</Paper> */}
            <DescriptionCard head="aahdsakddj"></DescriptionCard>
          </Grid>
          <Grid item xs={4}>
            {/* <Paper className={classes.paper}>xs=6 sm=3</Paper> */}
            <DescriptionCard head="ajsdsakd"></DescriptionCard>
          </Grid>
          <Grid item xs={4}>
            {/* <Paper className={classes.paper}>xs=6 sm=3</Paper> */}
            <DescriptionCard head="asdajdndj"></DescriptionCard>
          </Grid>
        </Grid>
      </div>
    );
  }