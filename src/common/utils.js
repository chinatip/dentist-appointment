import moment from 'moment'

export const stringToMoment = (dateString) => {
  return moment(dateString, moment.HTML5_FMT.DATETIME_LOCAL_MS).zone(-7)
}

export const momentToString = (date) => {
  return moment(date._i).add(7, 'h')
}