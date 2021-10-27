import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import styles from "../../styles/pages/graph/Graph.module.scss";

import {
  actualizeGraphData,
  formatPrice,
  calcPriceChange,
} from "@/functions/helpers";
import { Button } from "reactstrap";
import Select from "react-select";
// import PriceChangePercent from "../../common/PriceChangePercent";
import moment from "moment";

const Graph = ({
  data,
  defaultValue,
  defaultPeriods,
  headings,
  noDataPlaceholder,
  hasNoData,
}) => {
  const periods = defaultPeriods
    ? defaultPeriods
    : [
        {
          label: "24H",
          value: "1D",
        },
        {
          label: "1M",
          value: "1M",
        },
        {
          label: "1Y",
          value: "1Y",
        },
      ];
  const [selectedPeriod, setSelectedPeriod] = useState({
    period: defaultValue ? defaultValue : "1D",
    animation: true,
  });
  const [graphData, setGraphData] = useState([]);

  const [minimalValue, setMinimalValue] = useState();
  const [maximalValue, setMaximalValue] = useState();
  const [priceChange, setPriceChange] = useState();

  useEffect(() => {
    if (data && selectedPeriod.period) {
      let dataActual = actualizeGraphData(
        data[selectedPeriod.period].map((d) => ({
          x: d[0],
          y: d[1],
        })),
        selectedPeriod
      );
      setPriceChange(
        calcPriceChange(dataActual[0].y, dataActual[dataActual.length - 1].y)
      );
      setGraphData(dataActual ? dataActual : []);

      if (dataActual) {
        let values = dataActual.map((v) => +v.y);
        let minimum = Math.min(...values);
        let maximum = Math.max(...values);

        let delta = maximum - minimum;
        let percentValue = delta - delta * 0.15;

        minimum = minimum - percentValue;
        maximum = maximum + percentValue;

        setMinimalValue(minimum);
        setMaximalValue(maximum);
      }
    } else if (graphData.length) setGraphData([]);
  }, [selectedPeriod, data]);

  const changePeriod = (period) => {
    setSelectedPeriod({
      period: period,
      animation:
        (selectedPeriod.period === "1Y" && period === "1M") ||
        (selectedPeriod.period === "1M" && period === "1D") ||
        (selectedPeriod.period === "1Y" && period === "1D")
          ? false
          : true,
    });
  };

  return data ? (
    <>
      <div className={`${styles.periodSelectWrapper} d-block d-lg-none`}>
        <Select
          className={styles.periodSelect}
          isSearchable={false}
          isClearable={false}
          classNamePrefix="custom-select-field"
          value={{
            value: selectedPeriod.period,
            label:
              selectedPeriod.period === "1D" ? "24H" : selectedPeriod.period,
          }}
          defaultValue={selectedPeriod.period}
          onChange={(v) => changePeriod(v.value)}
          options={periods}
        />
      </div>
      <div className={`${styles.graphInner}  h-100 w-100`}>
        <div className={`${styles.tokenGraphPrice} d-flex position-absolute`}>
          {!headings ? (
            <>
              <strong>{formatPrice(data.price)}</strong>
              <PriceChangePercent
                positiveClass={styles.positive}
                negativeClass={styles.negative}
                neutralClass={styles.neutral}
                percent={priceChange || data.priceChange}
              />
            </>
          ) : (
            headings
          )}
        </div>
        <div
          className={`${styles.graphPeriods} d-none d-lg-block position-absolute`}
        >
          {periods.map((period, key) => (
            <Button
              key={key}
              className={`${styles.btn} ${
                selectedPeriod.period == period.value ? styles.active : ""
              } `}
              onClick={() => changePeriod(period.value)}
            >
              {period.label}
            </Button>
          ))}
        </div>

        {graphData.length && (
          <>
            <div
              className={`${styles.chartInner} ${
                hasNoData ? styles.noData : ""
              } `}
            >
              {hasNoData ? (
                noDataPlaceholder
              ) : (
                <Line
                  data={{
                    labels: ["Таке"],
                    datasets: [
                      {
                        data: graphData,
                        fill: true,
                        backgroundColor: "rgba(15, 128, 153, 0.05)",
                        borderColor: "#0F8099",
                        lineTension: 0,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    bezierCurve: false,
                    responsiveAnimationDuration: true,
                    animation: {
                      easing: "easeOutSine",
                      duration: selectedPeriod.animation ? 400 : 0,
                    },
                    legend: {
                      display: false,
                    },

                    elements: {
                      point: {
                        pointStyle: "circle",
                        borderWidth: 0,
                        radius: 0,
                        backgroundColor: "#0F8099",
                        hoverBorderWidth: 5.5,
                      },
                    },
                    hover: {
                      mode: "index",
                      intersect: false,
                      animationDuration: 400,
                    },
                    layout: {},
                    tooltips: {
                      intersect: false,
                      mode: "index",
                      position: "nearest",
                      backgroundColor: "#01405C",
                      xPadding: 34,
                      yPadding: 18,
                      bodyAlign: "center",
                      titleAlign: "center",
                      bodyFontFamily: "'Google Sans', sans-serif",
                      titleFontFamily: "'Google Sans', sans-serif",
                      titleFontColor: "#ffffff",
                      titleFontSize: 18,
                      bodyFontSize: 14,
                      bodyFontColor: "#81A6B6",

                      callbacks: {
                        label: () => {
                          return null;
                        },
                        title: (item) => {
                          var item = item[0];
                          return formatPrice(+item.value);
                        },
                        afterBody: (item) => {
                          return moment(item[0].label).format(
                            "DD MMM YYYY HH:mm"
                          );
                        },
                      },
                    },
                    scales: {
                      yAxes: [
                        {
                          gridLines: {
                            drawBorder: false,
                            display: false,
                          },
                          ticks: {
                            maxTicksLimit: 6,
                            min: minimalValue,
                            max: maximalValue,
                            callback: function (value) {
                              return value != minimalValue &&
                                value != maximalValue
                                ? value
                                : null;
                            },
                          },
                        },
                      ],
                      xAxes: [
                        {
                          ticks: {
                            maxRotation: 0,
                            autoSkip: true,
                            maxTicksLimit: window
                              ? window.innerWidth < 768 &&
                                window.innerWidth >= 550
                                ? 6
                                : window.innerWidth < 550
                                ? selectedPeriod.period === "1Y"
                                  ? 4
                                  : 5
                                : window.innerWidth <= 1024
                                ? 8
                                : 9
                              : 9,
                            fontFamily: "'Google Sans', sans-serif",
                            fontColor: "#11343F",
                            fontSize: 13,
                            callback: (v, index, labels) => {
                              if (index === 0 || labels.length - 1 === index)
                                return "";
                              else return v;
                            },
                          },
                          type: "time",
                          distribution: "series",
                          gridLines: {
                            display: false,
                          },
                          time: {
                            parser: "YYYY-MM-DD HH:mm:ss",
                            unit:
                              selectedPeriod.period === "1D"
                                ? "hour"
                                : selectedPeriod.period === "1M"
                                ? "day"
                                : "month",
                            displayFormats: {
                              hour: "HH:00",
                              month:
                                window && window.innerWidth < 559
                                  ? "MM.DD.YY"
                                  : "DD MMM YYYY",
                            },
                          },
                        },
                      ],
                    },
                  }}
                />
              )}
            </div>
            <span className={styles.chartDelayInfo}>
              Charting data is 5 mins delayed
            </span>
          </>
        )}
      </div>
    </>
  ) : null;
};

export default Graph;


