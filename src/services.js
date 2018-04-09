import { client, resolve } from 'react-resolver'
import axios from 'axios'

import { Loader } from 'common'

export const API_URL = 'http://localhost:8080'

export const LIST = 'list'
export const CREATE = 'create'
export const UPDATE = 'update'
export const DELETE = 'delete'

export const APPOINTMENT =  'appointments'
export const CLINIC = 'clinics'
export const DENTIST = 'dentists'
export const DENTIST_APPOINTMENT = 'dentist-timeslots'
export const PATIENT = 'patients'
export const TREATMENT = 'treatments'

export const LOADER = client(Loader)

export const FETCH = (table, action, body = null) => {
  return resolve(table, () => {
    const url = `${API_URL}/${table}/${action}`

    return axios.post(url, body).then(({ data }) => data)
  })
}