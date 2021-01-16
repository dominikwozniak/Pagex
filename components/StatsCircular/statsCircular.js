import React from 'react';
import styles from '../../styles/statsPanel.module.scss';

const StatsCircular = ({ amount, name }) => {
  return (
    <div className={styles.statsCircular__container}>
      <h5 className={styles.statsCircular__amount}>{ amount }</h5>
      <p className={styles.statsCircular__text}>{ name }</p>
    </div>
  );
};

export default StatsCircular;
