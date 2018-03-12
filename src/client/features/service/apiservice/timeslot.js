//Service for Timeslot
const apiURL = `http://35.198.239.97:8000`
export function fetchTimeslots(date,dentist){
    const URL = apiURL+"/api/timeslots/?startDate="+date+"&dentist="+dentist;
    return fetch(URL, { method: 'GET'})
        .then((response) => response.json())

  }

export function createTimeslot(newTimeslot){
    const URL = apiURL+"/api/timeslots/";
    return fetch(URL, {
            method: 'post',
            body: newTimeslot
          }).then(function(response) {
            return response.json();
          })
  }

export function getTimeslot(id){
    const URL = apiURL+"/api/timeslots/"+id;
    return fetch(URL, { method: 'GET'})
        .then((response) => response.json())
  }

  export function updateTimeslot(id,newTimeslot){
    const URL = apiURL+"/api/timeslots/"+id;
    return fetch(URL,  {
              method: 'PUT',
              body: {newTimeslot}
          })
          .then(response => response.json())
  }