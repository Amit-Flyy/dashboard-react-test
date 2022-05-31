import React from "react";
import { Line } from 'react-chartjs-2';

import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  // BarController,
  // BubbleController,
  // DoughnutController,
  // LineController,
  // PieController,
  // PolarAreaController,
  // RadarController,
  // ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip
} from 'chart.js';

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  // BarController,
  // BubbleController,
  // DoughnutController,
  // LineController,
  // PieController,
  // PolarAreaController,
  // RadarController,
  // ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip
);

// import Chart from 'chart.js/auto';
// import {CategoryScale} from 'chart.js'; 
// Chart.register(CategoryScale);


export default function App() {
  return (

    <Line
      datasetIdKey='id'
      data={{
        labels: ['Jun', 'Jul', 'Aug'],
        datasets: [
          {
            id: 1,
            label: 'more',
            data: [5, 6, 7],
          },
          {
            id: 2,
            label: 'less',
            data: [3, 2, 1],
          },
        ],
      }}
    />
  )
}
// import React from "react";
// // import "./styles.css";

// import { Line } from "react-chartjs-2";

// const data = {
//   labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
//   datasets: [
//     {
//       label: "First dataset",
//       data: [33, 53, 85, 41, 44, 65],
//       fill: true,
//       backgroundColor: "rgba(75,192,192,0.2)",
//       borderColor: "rgba(75,192,192,1)"
//     },
//     {
//       label: "Second dataset",
//       data: [33, 25, 35, 51, 54, 76],
//       fill: false,
//       borderColor: "#742774"
//     }
//   ]
// };

// export default function App() {
//   return (
//     <div className="Apps">
//         <h1>Hi</h1>
//         <Line data={data} />
//     </div>
//   );
// }
