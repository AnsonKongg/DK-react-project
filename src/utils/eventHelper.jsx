/**
 * Calculate the average of event_reviews rate
 * @param {array} event_reviews
 * @returns {number}
 */
export const calculateRate = (event_reviews) => {
  const sum =
    event_reviews && event_reviews.length > 0
      ? event_reviews.reduce(
          (previousValue, currentValue) => previousValue + currentValue.rate,
          0
        ) / event_reviews.length
      : 0;
  return Number(sum).toFixed(1);
};
/**
 * Check user whether attend an event.
 * @param {array} attendees
 * @returns {boolean}
 */
export const checkUserAttend = (attendees, user_id) => {
  return Boolean(attendees?.find((attendee) => attendee.id === user_id));
};
