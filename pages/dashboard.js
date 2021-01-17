import React, { useContext, useState, Fragment, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Dashboard.module.scss';
import AuthContext from '../context/AuthContext';
import Avatar from '@material-ui/core/Avatar';
import styled from 'styled-components';
import AccordionPanel from '../components/accordionPanel/accordionPanel';
import StatsPanel from '../components/statsPanel/statsPanel';
import LogoutButton from '../components/logoutButton/logoutButton';
import { isLoggedIn } from '../utils/auth';
import { getLocalStorageToken, logout } from '../utils/auth';
import { BiLogOut } from 'react-icons/bi';
import { FaRegEdit } from 'react-icons/fa';
import { useRouter } from 'next/router';
import PrivateRoute from '../routes/PrivateRoute';
import { toast } from 'react-toastify';
import { IconButton } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import SaveIcon from '@material-ui/icons/Save';
import axios from 'axios';
import { API_URL } from '../utils/helpers';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import Link from 'next/link';
import FindInPageIcon from '@material-ui/icons/FindInPage';

const StyledAvatar = styled(Avatar)`
  margin-top: 25%;
  .MuiAvatar-root {
    width: 80px;
    height: 60px;
  }
`;

const ProfileDetails = styled.div`
  position: relative;
  padding: 7% 19%;
  text-align: left;
  width: 50vh;
  height: 50vh;
`;
const DataParagraph = styled.p`
  margin: 8%;
  font-size: 28px;
  &:nth-child(2) {
    font-size: 24px;
  }
`;
const Center = styled.div`
  text-align: center;
`;
const LogOutDiv = styled.div`
  position: absolute;
  right: 100px;
  bottom: 15px;
  width: 40px;
  height: 40px;
  cursor: pointer;
`;
const EditDiv = styled.div`
  position: absolute;
  bottom: 10px;
  right: 50px;
  cursor: pointer;
`;
const Analytics = styled.div`
position: absolute;
right: 10px;
bottom: 9px;
`
export default function Dashboard() {
  const { user, userInfo, slug } = useContext(AuthContext);
  const notify = () => {
    toast('Loggin Notification !');
    toast.success('Logged succesfuly', {
      position: toast.POSITION.TOP_CENTER,
    });

    toast.error('Failed to loggin', {
      position: toast.POSITION.TOP_LEFT,
    });
  };
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [open, setOpen] = useState(false);
  const [firstNameEdit, setFirstNameEdit] = useState('');
  const [lastNameEdit, setLastNameEdit] = useState('');
  const [companyEdit, setCompanyEdit] = useState('');
  const [emailEdit, setEmailEdit] = useState('');
  const [addressEdit, setAddressEdit] = useState('');
  const [phoneEdit, setPhoneEdit] = useState('');
  const router = useRouter();

  useEffect(() => {
    setFirstName(userInfo.first_name);
    setLastName(userInfo.last_name);
    setCompany(userInfo.company_name);
    setEmail(userInfo.email);
    setCompany(userInfo.company);
    setAddress(userInfo.address);
    setPhone(userInfo.phone);
    setFirstNameEdit(userInfo.first_name);
    setLastNameEdit(userInfo.last_name);
    setCompanyEdit(userInfo.company_name);
    setEmailEdit(userInfo.email);
    setCompanyEdit(userInfo.company);
    setAddressEdit(userInfo.address);
    setPhoneEdit(userInfo.phone);
  }, [userInfo]);
  const handleLogOut = () => {
    logout();
    router.push('/');
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const onFirstNameChangeEdit = (e) => {
    setFirstNameEdit(e.target.value);
  };
  const onLastNameChangeEdit = (e) => {
    setLastNameEdit(e.target.value);
  };

  const onEmailChangeEdit = (e) => {
    setEmailEdit(e.target.value);
  };

  const onCompanyChangeEdit = (e) => {
    setCompanyEdit(e.target.value);
  };

  const onAddressChangeEdit = (e) => {
    setAddressEdit(e.target.value);
  };

  const onPhoneChangeEdit = (e) => {
    setPhoneEdit(e.target.value);
  };

  const handleSubmit = async () => {
    const accessToken = getLocalStorageToken();
    const newData = {
      first_name: firstNameEdit,
      last_name: lastNameEdit,
      address: addressEdit,
      email: emailEdit,
      company: companyEdit,
      phone: phoneEdit,
    };
    if (accessToken) {
      try {
        const res = await axios.patch(`${API_URL}/user/profile/`, newData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-type': 'Application/json',
          },
        });
        console.log(res);
        if (res.status !== 200) {
          console.log('It is ok');
        }
      } catch (e) {
        console.error(e);
      }
      setFirstName(firstNameEdit);
      setLastName(lastNameEdit);
      setEmail(emailEdit);
      setCompany(companyEdit);
      setAddress(addressEdit);
      setPhone(phoneEdit);
    }
    handleClose();
  };

  return (
    <PrivateRoute>
      <div className={styles.dashboard__container}>
        <Head>
          <title>Dashboard | PAGEX</title>
          <meta name="home page" content="home page" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        {user && userInfo && (
          <div className={styles.dashboard__wrapper}>
            <div className={styles.dashboard__companyCard}>
              <StyledAvatar style={{ height: '120px', width: '120px' }}>
                {email && email[0].toUpperCase()}{' '}
              </StyledAvatar>
              <ProfileDetails>
                <Center>
                  <DataParagraph>
                    {firstName} {lastName}
                  </DataParagraph>
                  <DataParagraph>{email}</DataParagraph>
                  <Link rel="stylesheet" href={`page/${slug}`}>
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<FindInPageIcon />}
                  >
                    View your page
                  </Button>
                  </Link>
                </Center>
                <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
                  <DialogTitle style={{textAlign: "center"}}>EDIT YOUR PROFILE</DialogTitle>
                  <DialogContent>
                    <form>
                      <TextField
                        name="firstName"
                        type="text"
                        label="First name"
                        rows="1"
                        placeholder="First name"
                        value={firstNameEdit}
                        onChange={onFirstNameChangeEdit}
                        fullWidth
                      />
                      <TextField
                        name="lastName"
                        type="text"
                        label="Last name"
                        rows="1"
                        placeholder="Last name"
                        value={lastNameEdit}
                        onChange={onLastNameChangeEdit}
                        fullWidth
                      />
                      <TextField
                        name="email"
                        type="email"
                        label="Email"
                        rows="1"
                        placeholder="Email"
                        value={emailEdit}
                        onChange={onEmailChangeEdit}
                        fullWidth
                      />
                      <TextField
                        name="company"
                        type="text"
                        label="Company name"
                        rows="1"
                        placeholder="Company name"
                        value={companyEdit}
                        onChange={onCompanyChangeEdit}
                        fullWidth
                      />
                      <TextField
                        name="Address"
                        type="text"
                        label="Address"
                        rows="3"
                        placeholder="Address"
                        value={addressEdit}
                        onChange={onAddressChangeEdit}
                        fullWidth
                      />
                      <TextField
                        name="Phone"
                        type="number"
                        label="Phone"
                        rows="1"
                        placeholder="Phone"
                        value={phoneEdit}
                        onChange={onPhoneChangeEdit}
                        fullWidth
                      />
                    </form>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={handleClose}
                      variant="contained"
                      color="primary"
                    >
                      Close
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      variant="contained"
                      color="secondary"
                      startIcon={<SaveIcon />}
                    >
                      Save changes
                    </Button>
                  </DialogActions>
                </Dialog>
              </ProfileDetails>
              <Tooltip title="Edit your profile" placement="top">
                <EditDiv>
                  <IconButton onClick={handleOpen} >
                    <FaRegEdit size="20px" />
                  </IconButton>
                </EditDiv>
              </Tooltip>
              <Tooltip title="Log out" placement="top">
                <LogOutDiv>
                  <IconButton onClick={handleLogOut}>
                    <ExitToAppIcon size="lg" />
                  </IconButton>
                </LogOutDiv>
              </Tooltip>
              <Tooltip title="Analytics" placement="top">
                <Analytics>
                  <Link rel="stylesheet" href="/analytics">
                    <IconButton>
                      <EqualizerIcon size="20px" />
                    </IconButton>
                  </Link>
                </Analytics>
              </Tooltip>
            </div>
            <div className={styles.dashboard__optionsCard}>
              <StatsPanel />
              <AccordionPanel />
            </div>
            <div>{notify}</div>
          </div>
        )}
      </div>
    </PrivateRoute>
  );
}
