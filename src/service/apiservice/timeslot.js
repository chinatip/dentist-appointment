import { API_URL } from 'service/const';

export function fetchTimeslotsByDate(date){
    console.log(date);
    const URL = API_URL+"/api/timeslots/?startDate="+date;
    return fetch(URL, { method: 'GET'})
        .then((response) => response.json())

}

export function fetchTimeslots(){
  const URL = API_URL+"/api/timeslots/";
  return fetch(URL, { method: 'GET'})
      .then((response) => response.json())

}

export function createTimeslot(newTimeslot){
    const URL = API_URL+"/api/timeslots/";
    return fetch(URL, {
            method: 'POST',
            body: JSON.stringify(newTimeslot),
            headers: {
              "Content-Type": 'application/json',
              "Accept": "application/json"
            }
          }).then(function(response) {
            return response.json();
          })
  }

export function getTimeslot(id){
    const URL = API_URL+"/api/timeslots/"+id+"/";
    return fetch(URL, { method: 'GET'})
        .then((response) => response.json())
  }

  export function updateTimeslot(id,newTimeslot){
    const URL = API_URL+"/api/timeslots/"+id+"/";
    return fetch(URL,  {
              method: 'PUT',
              body: {newTimeslot}
          })
          .then(response => response.json())
  }