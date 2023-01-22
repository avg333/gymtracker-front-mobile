import moment from "moment";

export function dateToBars(date) {
  return moment(date).format("YYYY/MM/DD")
}

export function dateToDayMonth(date) {
  return moment(date).format("DD MMM")
}

export function dateToISO8601(date) {
  return moment(date).format("YYYY-MM-DD")
}

export function dateToTimeStamp(date) {
  return moment(date).format("DD MMM HH:mm")
}
