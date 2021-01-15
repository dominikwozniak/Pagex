import React from 'react';
import styles from '../../styles/navbar.module.scss';
import LogoutButton from '../logoutButton/logoutButton';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className={styles.navbar__wrapper}>
      <Link href="/">
        <a>
          <div className={styles.navbar__logo}>
            <img
              src="https://ids-storage-football-prediction.s3-eu-west-1.amazonaws.com/imgs/logo2.png"
              alt="pagexlogo"
            />
            <h3>PAGEX</h3>
          </div>
        </a>
      </Link>
      <div>
        <LogoutButton />
      </div>
    </nav>
  );
};

export default Navbar;
