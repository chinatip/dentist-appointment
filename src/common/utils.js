import moment from 'moment'

export const stringToMoment = (dateString) => {
  return moment(dateString, moment.HTML5_FMT.DATETIME_LOCAL_MS)
}