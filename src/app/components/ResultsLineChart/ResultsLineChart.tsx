"use client";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from "chart.js";
import { Line } from "react-chartjs-2";
import { getUserAverages } from "./getUserAverages";
import styles from "./resultsLineChart.module.css";

ChartJS.register(CategoryScale, LineElement, LinearScale, PointElement, Title, Tooltip, Legend, Filler);
ChartJS.defaults.backgroundColor = "#000";
ChartJS.defaults.borderColor = "#ffffff49";
ChartJS.defaults.color = "#11e30a";

type ResultsLineChartProps = {
  user: User;
};
const ResultsLineChart = ({ user }: ResultsLineChartProps) => {
  const { userSpeeds, userScores } = getUserAverages(user);

  return (
    <div className={styles.chart_container}>
      <Line
        className={styles.chart}
        width={5000}
        height={2000}
        data={{
          labels: userSpeeds,
          datasets: [
            {
              label: "Your Score",
              data: userScores,
              borderColor: "#bd1717",
            },
          ],
        }}
        options={{
          scales: {
            y: {
              title: {
                display: true,
                text: "Average Score",
              },
              beginAtZero: true,
              max: 100,
            },
            x: {
              title: { display: true, text: "Reading Speed" },
              beginAtZero: true,
            },
          },
          plugins: {
            legend: { display: false },
          },
        }}
      />
    </div>
  );
};

export default ResultsLineChart;
