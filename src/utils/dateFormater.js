import moment from "moment";

export function dateToBars(date) {
  return moment(date).format("YYYY/MM/DD")
}

export function dateToISO8601(date) {
  return moment(date).format("YYYY-MM-DD")
}
