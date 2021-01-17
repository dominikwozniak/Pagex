import React from 'react';
import styles from '../styles/Analytics.module.scss';
import StatsPanel from '../components/statsPanel/statsPanel';
import AnalyticsCharts from '../components/analyticsCharts/analyticsCharts';
import PrivateRoute from '../routes/PrivateRoute';

const Analytics = () => {
  return (
    <PrivateRoute>
      <div className={styles.analytics__container}>
        <StatsPanel />
        <AnalyticsCharts/>
      </div>
    </PrivateRoute>
  );
};

export default Analytics;
