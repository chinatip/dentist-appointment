  //Service for Appointment
const apiURL = `http://35.198.239.97:8000`
export function fetchAppointments(){
    const URL = apiURL+"/api/appointments/";
    return fetch(URL, { method: 'GET'})
        .then((response) => response.json())
        .then((appointments) => this.setState({ appointments: appointments }))
  }

export function createAppointment(newAppointment){
    const URL = apiURL+"/api/appointments/";
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
    const URL = apiURL+"/api/appointments/"+id;
    return fetch(URL, { method: 'GET'})
        .then((response) => response.json())
  }

export function updateAppointment(id,newAppointment){
    const URL = apiURL+"/api/appointments/"+id;
    return fetch(URL,  {
              method: 'PUT',
              body: {newAppointment}
          })
          .then(response => response.json())
  }