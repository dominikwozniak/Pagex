import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import styles from '../../styles/accordionPanel.module.scss';
import { TextField, Select, InputLabel, MenuItem } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: '10%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: 'bold',
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

const AccordionPanel = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [age, setAge] = useState('ENGINEERING');
  const [openSelect, setOpenSelect] = useState(false);

  const handleSelectChange = (event) => {
    setAge(event.target.value);
  };

  const handleClose = () => {
    setOpenSelect(false);
  };

  const handleOpen = () => {
    setOpenSelect(true);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <form>
        <div className={classes.root}>
          <Accordion
            expanded={expanded === 'panel1'}
            onChange={handleChange('panel1')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography className={classes.heading}>
                General information
              </Typography>
              {/*<Typography className={classes.secondaryHeading}>I am an accordion</Typography>*/}
            </AccordionSummary>
            <AccordionDetails>
              <div className={styles.accordionPanel__detailsWrapper}>
                <div>
                  <TextField
                    type="text"
                    // value={email}
                    // onChange={handleEmailChange}
                    className={styles.accordionPanel__input}
                    label="website name"
                    name="web-name"
                    id="web-name"
                    placeholder="Name"
                  />
                  <InputLabel id="demo-controlled-open-select-label">Page type</InputLabel>
                  <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={openSelect}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    className={styles.accordionPanel__input}
                    value={age}
                    onChange={handleSelectChange}
                  >
                    <MenuItem value={'ENGINEERING'}>ENGINEERING</MenuItem>
                    <MenuItem value={'INDUSTRY'}>INDUSTRY</MenuItem>
                    <MenuItem value={'SERVICES'}>SERVICES</MenuItem>
                  </Select>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === 'panel2'}
            onChange={handleChange('panel2')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2bh-content"
              id="panel2bh-header"
            >
              <Typography className={classes.heading}>Informations</Typography>
              {/*<Typography className={classes.secondaryHeading}>*/}
              {/*  You are currently not an owner*/}
              {/*</Typography>*/}
            </AccordionSummary>
            <AccordionDetails>
              <div className={styles.accordionPanel__detailsWrapper}>
                <div>
                  <TextField
                    type="text"
                    // value={email}
                    // onChange={handleEmailChange}
                    className={styles.accordionPanel__input}
                    label="website name"
                    name="web-name"
                    id="web-name"
                    placeholder="Name"
                  />
                  <TextField
                    type="text"
                    // value={email}
                    // onChange={handleEmailChange}
                    className={styles.accordionPanel__input}
                    label="website name"
                    name="web-name"
                    id="web-name"
                    placeholder="Name"
                  />
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === 'panel3'}
            onChange={handleChange('panel3')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3bh-content"
              id="panel3bh-header"
            >
              <Typography className={classes.heading}>Page settings</Typography>
              {/*<Typography className={classes.secondaryHeading}>*/}
              {/*  Filtering has been entirely disabled for whole web server*/}
              {/*</Typography>*/}
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Nunc vitae orci ultricies, auctor nunc in, volutpat nisl.
                Integer sit amet egestas eros, vitae egestas augue. Duis vel est
                augue.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </form>
    </div>
  );
};

export default AccordionPanel;
