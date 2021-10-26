import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

import { actualizeGraphData } from "../../../functions/helpers";

const TokenChart = ({ data, className }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const getGraphData = async (data) => {
      let actualizedData = actualizeGraphData(data, { period: "1M" });

      setChartData(actualizedData);
    };

    if (data) getGraphData(data);
  }, [data]);

  return data ? (
    <div className={className}>
      <Line
        data={{
          labels: [],
          datasets: [
            {
              data: chartData,
              fill: false,
              backgroundColor: "rgb(26,176,196)",
              borderColor: "rgba(26,176,196,1)",
              borderWidth: 1.7,
              lineTension: 1,
            },
          ],
        }}
        options={{
          responsive: true,
          aspectRatio: false,
          maintainAspectRatio: false,
          legend: {
            display: false,
          },
          elements: {
            point: {
              pointStyle: "line",
              radius: 0,
            },
          },
          tooltips: {
            enabled: false,
          },
          scales: {
            xAxes: [
              {
                type: "time",
                distribution: "series",
                time: {
                  unit: "hour",

                  displayFormats: {
                    quarter: "MMM YYYY",
                  },
                },
                ticks: { display: false },
                gridLines: {
                  display: false,
                  drawBorder: false,
                },
              },
            ],
            yAxes: [
              {
                ticks: { display: false },
                gridLines: {
                  display: false,
                  drawBorder: false,
                },
              },
            ],
          },
        }}
      />
    </div>
  ) : null;
};
export default TokenChart;
