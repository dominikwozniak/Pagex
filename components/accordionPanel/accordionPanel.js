import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import styles from '../../styles/accordionPanel.module.scss';
import { TextField, Select, InputLabel, MenuItem, Button, Box, AppBar } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import axios from 'axios';
import { API_URL } from '../../utils/helpers';
import { getLocalStorageToken } from '../../utils/auth'


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
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

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const AccordionPanel = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [age, setAge] = useState('ENGINEERING');
  const [openSelect, setOpenSelect] = useState(false);
  const [servicesPage, setServicesPage] = useState(0);

  const [name, setName] = useState('')
  const [pageType, setPageType] = useState('ENGINEERING');
  const [headerTitle, setHeaderTitle] = useState('');
  const [headerDescription, setHeaderDescription] = useState('');
  // const []

  const handleServicesPageChange = (event, newValue) => {
    setServicesPage(newValue);
  };

  useEffect(async () => {
    const accessToken = getLocalStorageToken();
    console.log('effekt')
    if (accessToken) {
      try {
        const { data } = await axios.get(`${API_URL}/pages/`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-type': 'Application/json',
          },
        });

        setName(data.name);
        setPageType(data.page_type);
        setHeaderTitle(data.header_title);
        setHeaderDescription(data.header_description);
        console.log(data, '<<< DATA');
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleSelectChange = (event) => {
    setPageType(event.target.value);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('submit');
  }

  return (
    <div className={styles.accordionPanel__container}>
      <form onSubmit={handleSubmit} className={styles.accordionPanel__formContainer}>
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
                <Typography>
                  In this section you can change main information about your page.
                </Typography>
                <div>
                  <TextField
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                    value={pageType}
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
              <Typography className={classes.heading}>Header section</Typography>
              {/*<Typography className={classes.secondaryHeading}>*/}
              {/*  You are currently not an owner*/}
              {/*</Typography>*/}
            </AccordionSummary>
            <AccordionDetails>
              <div className={styles.accordionPanel__detailsWrapper}>
                <div>
                  <div>
                    <TextField
                      type="text"
                      value={headerTitle}
                      onChange={(e) => setHeaderTitle(e.target.value)}
                      className={styles.accordionPanel__input}
                      label="website name"
                      name="web-name"
                      id="web-name"
                      placeholder="Name"
                    />
                  </div>
                  <div>
                    <TextField
                      type="text"
                      value={headerDescription}
                      onChange={(e) => setHeaderDescription(e.target.value)}
                      className={styles.accordionPanel__input}
                      label="website name"
                      name="web-name"
                      id="web-name"
                      placeholder="Name"
                    />
                  </div>
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
              <Typography className={classes.heading}>Services</Typography>
              {/*<Typography className={classes.secondaryHeading}>*/}
              {/*  Filtering has been entirely disabled for whole web server*/}
              {/*</Typography>*/}
            </AccordionSummary>
            <AccordionDetails>

              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={servicesPage}
                onChange={handleServicesPageChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
              >
                <Tab label="First service" {...a11yProps(0)} />
                <Tab label="Second service" {...a11yProps(1)} />
                <Tab label="Third service" {...a11yProps(2)} />
              </Tabs>
              <TabPanel value={servicesPage} index={0}>
                <div>
                  <TextField
                    type="text"
                    // value={email}
                    // onChange={handleEmailChange}
                    className={styles.accordionPanel__input}
                    label="Service name"
                    name="web-name"
                    id="web-name"
                    placeholder="Name"
                  />
                </div>
                <div>
                  <TextField
                    type="text"
                    // value={email}
                    // onChange={handleEmailChange}
                    className={styles.accordionPanel__input}
                    label="Service description"
                    name="web-name"
                    id="web-name"
                    placeholder="Name"
                  />
                </div>
              </TabPanel>
              <TabPanel value={servicesPage} index={1}>
                <div>
                  <TextField
                    type="text"
                    // value={email}
                    // onChange={handleEmailChange}
                    className={styles.accordionPanel__input}
                    label="Service name"
                    name="web-name"
                    id="web-name"
                    placeholder="Name"
                  />
                </div>
                <div>
                  <TextField
                    type="text"
                    // value={email}
                    // onChange={handleEmailChange}
                    className={styles.accordionPanel__input}
                    label="Service description"
                    name="web-name"
                    id="web-name"
                    placeholder="Name"
                  />
                </div>
              </TabPanel>
              <TabPanel value={servicesPage} index={2}>
                <div>
                  <TextField
                    type="text"
                    // value={email}
                    // onChange={handleEmailChange}
                    className={styles.accordionPanel__input}
                    label="Service name"
                    name="web-name"
                    id="web-name"
                    placeholder="Name"
                  />
                </div>
                <div>
                  <TextField
                    type="text"
                    // value={email}
                    // onChange={handleEmailChange}
                    className={styles.accordionPanel__input}
                    label="Service description"
                    name="web-name"
                    id="web-name"
                    placeholder="Name"
                  />
                </div>
              </TabPanel>

            </AccordionDetails>
          </Accordion>
        <Button className={styles.accordionPannel__submitButton} type='submit'>Create</Button>
      </form>
    </div>
  );
};

export default AccordionPanel;
