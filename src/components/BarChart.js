import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { loadSurvey } from "../client/surveyDB";

export default class Example extends PureComponent {
  static demoUrl = "https://codesandbox.io/s/simple-bar-chart-tpz8r";

  constructor() {
    super();
    this.state = {
      data: {},
    };
  }

  componentDidMount = async () => {
    var results = await loadSurvey();
    var items = results.Items;

    var amerYes = 0,
      amerNo = 0,
      japYes = 0,
      japNo = 0,
      indYes = 0,
      indNo = 0,
      thaiYes = 0,
      thaiNo = 0;
    items.forEach((element) => {
      switch (element.foodType) {
        case "american":
          if (element.recommend === "yes") {
            amerYes++;
          } else {
            amerNo++;
          }
          break;
        case "japanese":
          if (element.recommend === "yes") {
            japYes++;
          } else {
            japNo++;
          }
          break;
        case "indian":
          if (element.recommend === "yes") {
            indYes++;
          } else {
            indNo++;
          }
          break;
        case "thai":
          if (element.recommend === "yes") {
            thaiYes++;
          } else {
            thaiNo++;
          }
          break;
        default:
          console.log("nothing was found");
      }
    });
    var result = [];
    result.push({ category: "american", yes: amerYes, no: amerNo });
    result.push({ category: "japanese", yes: japYes, no: japNo });
    result.push({ category: "indian", yes: indYes, no: indNo });
    result.push({ category: "thai", yes: thaiYes, no: thaiNo });

    this.setState({
      data: result,
    });
  };

  render() {
    return (
      <ResponsiveContainer width="100%" aspect={3}>
        <BarChart
          width={500}
          height={300}
          data={this.state.data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="recommend" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="yes" fill="#8884d8" />
          <Bar dataKey="no" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
