import { client, resolve } from 'react-resolver'
import axios from 'axios'

import { Loader } from 'common'

export const API_URL = 'https://pacific-inlet-14356.herokuapp.com'
export const API_GET_FB_URL = 'https://colossal-penalty.glitch.me/getUserfacebookdata'

export const LIST = 'list'
export const CREATE = 'create'
export const UPDATE = 'update'
export const DELETE = 'delete'
export const FIND_BY_ID = 'find'
export const FIND_BY_FB_ID = 'findFB'
export const FIND_BY_PATIENT_ID = 'findByPatient'

export const APPOINTMENT =  'appointments'
export const CLINIC = 'clinics'
export const DENTIST = 'dentists'
export const DENTIST_TIMESLOT = 'dentistTimeslots'
export const PATIENT = 'patients'
export const TREATMENT = 'treatments'
export const REPORT = 'reports'

export const LOADER = client(Loader)

export const FETCH = (table, action, body = null) => {
  return resolve(table, (props) => {
    const url = `${API_URL}/${table}/${action}`
    
    if (action === FIND_BY_ID) {
      const actualBody = { _id: props[body.path]}
      
      return axios.post(url, actualBody).then(({ data }) => data)
    } else if (action === FIND_BY_PATIENT_ID) {
      if (props.report) {
        const actualBody = { patient: props.report.patient }
        
        return axios.post(url, actualBody).then(({ data }) => data)
      }

      return
    }

    return axios.post(url, body).then(({ data }) => data)
  })
}

export const POST = (table, action, body) => {
  const url = `${API_URL}/${table}/${action}`
  
  return axios.post(url, body).then(({ data }) => data)
}

export const GET_FB_DATA = (id) => {
  const url = `${API_GET_FB_URL}`

  return axios.post(url, { id }).then(({ data }) => data)
}