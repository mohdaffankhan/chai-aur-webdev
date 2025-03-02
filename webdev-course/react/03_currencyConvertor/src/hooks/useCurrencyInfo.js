import { useState, useEffect } from "react";

function useCurrencyInfo(currency) {
  const [data, setData] = useState({});
  useEffect(() => {
    fetch(
      `https://v6.exchangerate-api.com/v6/6785b15a0cd3a95097054a2e/latest/${currency}`
    )
      .then((res) => res.json())
      .then((res) => setData(res.conversion_rates));
  }, [currency]);
  return data;
}

export default useCurrencyInfo;
