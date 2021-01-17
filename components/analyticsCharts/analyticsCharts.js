import React, { useState, useEffect } from 'react';
import styles from '../../styles/Analytics.module.scss';
import axios from 'axios';
import lodash from 'lodash';
import { getLocalStorageToken } from '../../utils/auth';
import { API_URL } from '../../utils/helpers';;
import { Line } from 'react-chartjs-2';

const AnalyticsCharts = () => {

  const [users, setUsers] = useState([]);
  const [viewsData, setViewsData] = useState([]);
  const [groupedByCity, setGroupedByCity] = useState([]);

  let xData = ['Day', 'Day', 'Day', 'Day', 'Day', 'Day', 'Day', 'Day', 'Day', 'Day'];
  let yData = [];

  let data = {
    labels: xData,
    datasets: [
      {
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: yData,
      },
    ],
  };

  if (users.length) {
    viewsData.forEach(view => {
      yData.push(view)
      data.datasets.data = yData;
    })
  }

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
        setViewsData(data.views_data);
        setUsers(data.data);
      } catch (e) {
        console.error(e);
      }
    }
  }, [])

  const options = {
    title: {
      display: true,
      text: `Amout of`,
    },
    legend: {
      display: false,
    },
  };

  useEffect(() => {
    if (users) {
      setGroupedByCity(lodash.groupBy(users, 'country'));
    }
  }, [users])

  return (
    <div className={styles.analyticsCharts__container}>
      <div className={styles.analyticsCharts__wrapper}>
        {console.log(data)}
        <Line data={data} width={600} height={300} options={options} />
      </div>
    </div>
  );
};

export default AnalyticsCharts;
