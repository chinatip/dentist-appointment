import { API_URL } from 'service/const';

const URL = API_URL + '/api/appointments/';

export function fetchAppointments(){
  return fetch(URL, { method: 'GET'})
      .then((response) => response.json())
      .then((appointments) => this.setState({ appointments: appointments }))
}

export function createAppointment(newAppointment){
  return fetch(URL, {
    method: 'POST',
    body: JSON.stringify(newAppointment),
    headers: {
      "Content-Type": 'application/json',
      "Accept": "application/json"
    }
  }).then(function(response) {
    return response.json();
  })
}

export function getAppointment(id){
  return fetch(URL + id + '/', { method: 'GET'})
    .then((response) => response.json())
}

export function updateAppointment(id, newAppointment){
  return fetch(URL + id + '/',  {
      method: 'PUT',
      body: {newAppointment}
  })
  .then(response => response.json())
}