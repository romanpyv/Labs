import React from "react";
import {Chart} from "react-charts";
import "./BarChart.css";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";

export default function BarChart(props) {
  const data = React.useMemo(
    () => [
      {
        label: 'Mark',
        data: [
          ...props.questions.map((item, index) => [item.text, (props.answers[index] / 3 * 100)]),
          ['', 100],
          ['', 0],
          ['Summary', props.generalScore],
        ],
      },
    ],
    [],
  );

  const series = React.useMemo(
    () => ({
      type: 'bar',
    }),
    [],
  );

  const axes = React.useMemo(
    () => [
      {primary: true, type: 'ordinal', position: 'bottom'},
      {position: 'left', type: 'linear', stacked: false},
    ],
    [],
  );

  console.log(props, 'chart');

  return (
    <div>
      <h1>Chart</h1>
      {props.questions.length === props.answers.length ?
        <div className="chart-container">
          <Chart data={data} series={series} axes={axes} tooltip/>

          <Link to="/result">
            <Button>Watch result</Button>
          </Link>
        </div>
        :
        <div>
          <h2>Finish test first!</h2>
        </div>
      }
    </div>
  );
}