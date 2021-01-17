import React, { useState, useEffect } from 'react';
import PrivateRoute from '../../routes/PrivateRoute';
import axios from 'axios';
import styles from '../../styles/Page.module.scss';
import {
  API_URL,
  INDUSTRY_IMAGE,
  ENGINEERING_IMAGE,
  SERVICES_IMAGE,
} from '../../utils/helpers';
import { Button } from '@material-ui/core';
import { useRouter } from 'next/router';
import AnchorLink from 'react-anchor-link-smooth-scroll';

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
      console.log(e);
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
            <Button>
              <AnchorLink href="#services">Learn more</AnchorLink>
            </Button>
          </div>

          <div>
            {pageData.page_type === 'INDUSTRY' && (
              <img src={INDUSTRY_IMAGE} alt={pageData.page_type} />
            )}
            {pageData.page_type === 'ENGINEERING' && (
              <img src={ENGINEERING_IMAGE} alt={pageData.page_type} />
            )}
            {pageData.page_type === 'SERVICES' && (
              <img src={SERVICES_IMAGE} alt={pageData.page_type} />
            )}
          </div>
        </section>
        <section id="services" className={styles.page__services}>
          <div className={styles.about__wrapper}>
            <h3>{pageData.services_title}</h3>
            <p
              style={{
                fontSize: '22px',
                textAlign: 'center',
                color: '#292928',
              }}
            >
              {pageData.services_description}
            </p>
            <div className={styles.about__cards}>
              {pageData.services_1_title && pageData.services_1_description && (
                <div className={styles.about__card}>
                  <h2>{pageData.services_1_title}</h2>
                  <p style={{ fontSize: '18px', fontWeight: 200 }}>
                    {pageData.services_1_description}
                  </p>
                </div>
              )}
              {pageData.services_2_title && pageData.services_2_description && (
                <div className={styles.about__card}>
                  <h2>{pageData.services_2_title}</h2>
                  <p style={{ fontSize: '18px', fontWeight: 200 }}>
                    {pageData.services_2_description}
                  </p>
                </div>
              )}
              {pageData.services_3_title && pageData.services_3_description && (
                <div className={styles.about__card}>
                  <h2>{pageData.services_3_title}</h2>
                  <p style={{ fontSize: '18px', fontWeight: 200 }}>
                    {pageData.services_3_description}
                  </p>
                </div>
              )}
            </div>
            <Button className={styles.about__button}>
              <AnchorLink href="#about">About us</AnchorLink>
            </Button>
          </div>
        </section>
        <section id="about" className={styles.page__about}>
          {pageData.about_title && <h2>{pageData.about_title}</h2>}
          {pageData.about_subtitle && <h5>{pageData.about_subtitle}</h5>}
          {pageData.about_description && <p>{pageData.about_description}</p>}
        </section>
      </div>
    </PrivateRoute>
  );
};

export default Page;
