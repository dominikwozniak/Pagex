import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../styles/statsPanel.module.scss';
import StatsCircular from '../StatsCircular/statsCircular'
import { API_URL } from '../../utils/helpers';
import { getLocalStorageToken } from '../../utils/auth';
import { CircularProgress } from '@material-ui/core';

const StatsPanel = () => {

  const [totalViews, setTotalViews] = useState('');
  const [monthlyViews, setMonthlyViews] = useState('');
  const [weeklyViews, setWeeklyViews] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(async () => {
    const accessToken = getLocalStorageToken();
    setIsLoading(true);

    if (accessToken) {
      try {
        const { data } = await axios.get(`${API_URL}/pages/analytics/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-type': 'Application/json',
          },
        });

        setTotalViews(data.view_count);
        setMonthlyViews(data.month_views_count);
        setWeeklyViews(data.week_views_count);
        console.log(data, '<< analytics')
      } catch (e) {
        console.error(e);
      }
    }
    setIsLoading(false);
  }, [])

  return (
    <div className={styles.statsPanel__container}>
      <div className={styles.statsPanel__wrapper}>
        { isLoading ? (
          <div className={styles.statsPanel__loadingContainer}>
            <CircularProgress className={styles.statsPanel__loading} />
          </div>
        ) : (
          <>
            <StatsCircular amount={isLoading ? 0 : totalViews} name={'Total views'} />
            <StatsCircular amount={isLoading ? 0 : monthlyViews} name={'Monthly views'} />
            <StatsCircular amount={isLoading ? 0 : weeklyViews} name={'Weekly views'} />
          </>
        )}
      </div>
    </div>
  );
};

export default StatsPanel;
