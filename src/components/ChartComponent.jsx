import axios from 'axios';
import { Chart as ChartJS, registerables } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(...registerables);

const ChartComponent = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    axios.get('https://backendvs-2.onrender.com/admin')
     .then((response) => {
        const data = response.data;
        console.log(data); // Check if data is fetched correctly
        const getRandomColors = (numColors) => {
          const colors = [];
          for (let i = 0; i < numColors; i++) {
            const color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.6)`;
            colors.push(color);
          }
          return colors;
        };
        if (data && data.length > 0) {
          const labels = data.map((result) => result.partyname);
          const barColors = getRandomColors(data.length);
          const datasets = [{
            label: 'Total Votes',
            backgroundColor: barColors,
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            data: data.map((result) => result.totalvotes),
          }];

          setChartData({
            labels,
            datasets,
          });
        } else {
          console.log('No data received.');
        }
      })
     .catch((error) => {
        console.log(error);
      });
  }, []);

  const options = {
    scales: {
      x: {
        type: 'category',
      },
      y:{
        type:'linear',
        ticks: {
            callback: (value) => Number(value*10),
          },
      }
    },
  };

  return (
    <div className='min-h-screen w-[90%] my-10'>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default ChartComponent;