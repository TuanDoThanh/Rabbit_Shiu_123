import React, { useEffect } from "react";
import ChartsEmbedSDK from "@mongodb-js/charts-embed-dom";

function BookSold(props) {
  useEffect(() => {
    const sdk = new ChartsEmbedSDK({
      baseUrl: "https://charts.mongodb.com/charts-rbs-mbaoy", // REPLACE with the Base URL from your Embed Chart dialog.
    });

    const chart = sdk.createChart({
      chartId: "6442484a-cff1-4c36-85d1-fb0b759d20f7", // REPLACE with the Chart ID from your Embed Chart dialog.
      height: "480px",
      width: "700px",
      // Additional options go here
    });

    chart.render(document.getElementById("chart2"));

    // Clean up the chart when component unmounts
    // return () => {
    //   chart.destroy();
    // };
  }, []);
  return <div id="chart2"></div>;
}

export default BookSold;