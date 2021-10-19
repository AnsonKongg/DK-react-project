// Calculate the average of event_reviews rate
export const calculateRate = event_reviews => {
  const sum = event_reviews && event_reviews.length > 0 ?
    event_reviews.reduce(
      (previousValue, currentValue) => previousValue + currentValue.rate,
      0
    ) / event_reviews.length : 0;
  return Number(sum).toFixed(1);
};