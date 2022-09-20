import React, { useEffect, useState } from 'react';
import {useParams} from "react-router-dom";
import finnHub from "../apis/finnHub";
import StockChart from "../components/StockChart";

const formatData = (data) => {
  return data.t.map((el, index) => {
    return {
      x: el * 1000,
      y: Math.floor(data.c[index])
    }
  })
}

function StockDetailPage() {
  const [chartData, setChartData] = useState();
  const {symbol} = useParams(); //params gets :symbol from the api 
  useEffect(() => {
    const fetchData = async () => {
      const date = new Date();
      const currentTime = Math.floor(date.getTime()/1000);
      let oneDay;
          //6 means Saturday, 0 means Monday
      if (date.getDay === 6) {
        oneDay = currentTime - 2 * 60 * 60 * 24
      } else if (date.getDay === 0) {
        oneDay = currentTime - 3 * 60 * 60 * 24
      } else {
        oneDay = currentTime - 60 * 60 * 24
      }
      const oneWeek = currentTime - 7 * 60 * 60 * 24;
      const oneYear = currentTime - 365 * 60 * 60 * 24;
      // again we use Promise.all() to get all data at once
      try {
        const responses = await Promise.all([finnHub.get("/stock/candle", {
          params: {
            symbol,
            resolution: 30,
            to: currentTime,
            from: oneDay
          }}), finnHub.get("/stock/candle", {
            params: {
              symbol,
              resolution: 60,
              to: currentTime,
              from: oneWeek
            }}), finnHub.get("/stock/candle", {
              params: {
                symbol,
                resolution: "W",
                to: currentTime,
                from: oneYear
              }})])
              console.log(responses);
              setChartData({
                day: formatData(responses[0].data),
                week: formatData(responses[1].data),
                year: formatData(responses[2].data)
              })
      } catch (error) {
          console.log(error)
      }
    }
    fetchData()
  }, [])  
  
  return (
    <div>
      {chartData && <StockChart chartData={chartData} symbol={symbol}/>}
    </div>
  )
}

export default StockDetailPage
