import React, { useEffect } from "react";
import ChartsEmbedSDK from "@mongodb-js/charts-embed-dom";

function RevenueMonth(props) {
  useEffect(() => {
    const sdk = new ChartsEmbedSDK({
      baseUrl: "https://charts.mongodb.com/charts-rbs-mbaoy", // REPLACE with the Base URL from your Embed Chart dialog.
    });

    const chart = sdk.createChart({
      chartId: "6440270f-3ba0-4f39-882a-65ebbb307c65", // REPLACE with the Chart ID from your Embed Chart dialog.
      height: "480px",
      width: "400px",
      // Additional options go here
    });

    chart.render(document.getElementById("chart1"));

    // Clean up the chart when component unmounts
    // return () => {
    //   chart.destroy();
    // };
  }, []); // Empty dependency array to run the effect only once
  return <div id="chart1"></div>;
}

export default RevenueMonth;