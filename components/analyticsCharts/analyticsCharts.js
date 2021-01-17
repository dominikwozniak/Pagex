import React, { useState, useEffect } from 'react';
import styles from '../../styles/Analytics.module.scss';
import axios from 'axios';
import lodash from 'lodash';
import { getLocalStorageToken } from '../../utils/auth';
import { API_URL } from '../../utils/helpers';
import { Line } from 'react-chartjs-2';

const AnalyticsCharts = () => {

  const [users, setUsers] = useState([]);
  const [groupedByCity, setGroupedByCity] = useState([]);

  useEffect(async () => {
    const accessToken = getLocalStorageToken();

    if (accessToken) {
      try {
        const { data } = await axios.get(`${API_URL}/pages/analytics/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-type': 'Application/json',
          },
        });

        setUsers(data.data);
      } catch (e) {
        console.error(e);
      }
    }
    // setIsLoading(false);
  }, [])

  useEffect(() => {
    if (users) {
      setGroupedByCity(lodash.groupBy(users, 'city'));
    }
  }, [users])

  return (
    <div className={styles.analyticsCharts__container}>
      <div className={styles.analyticsCharts__wrapper}>
        s { users && console.log(users) }
        { groupedByCity && console.log(groupedByCity) }
      </div>
    </div>
  );
};

export default AnalyticsCharts;
