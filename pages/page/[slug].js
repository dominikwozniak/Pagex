import React, { useState, useEffect } from 'react';
import PrivateRoute from '../../routes/PrivateRoute';
import axios from 'axios';
import styles from '../../styles/Page.module.scss';
import { API_URL } from '../../utils/helpers';
import { Button } from '@material-ui/core';
import { useRouter } from 'next/router';

const Page = () => {
  const router = useRouter();
  const { slug } = router.query;

  const [pageData, setPageData] = useState({});

  useEffect(async () => {
    try {
      const { data } = await axios.get(`${API_URL}/pages/${slug}/`);

      setPageData(data);
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  }, [slug]);

  return (
    <PrivateRoute>
      <div className={styles.page__container}>
        <section className={styles.page__header}>
          <div>
            <h1>{pageData.header_title}</h1>
            <h5>{pageData.header_description}</h5>
            <Button className={styles.page__header__button}>Contact!</Button>
          </div>

          <div>
            {pageData.page_type === 'INDUSTRY' && (
              <img
                src="https://via.placeholder.com/500.png/09f/fffC/O%20https://placeholder.com/"
                alt={pageData.page_type}
              />
            )}
            {pageData.page_type === 'ENGINEERING' && (
              <img
                src="https://via.placeholder.com/500.png/09f/fffC/O%20https://placeholder.com/"
                alt={pageData.page_type}
              />
            )}
            {pageData.page_type === 'SERVICES' && (
              <img
                src="https://via.placeholder.com/500.png/09f/fffC/O%20https://placeholder.com/"
                alt={pageData.page_type}
              />
            )}
          </div>
        </section>
        <section className={styles.page__about}>
          {slug}
          {pageData && <p>{pageData.name}</p>}
        </section>
        <section className={styles.page__service}>
          {slug}
          {pageData && <p>{pageData.name}</p>}
        </section>
      </div>
    </PrivateRoute>
  );
};

export default Page;
