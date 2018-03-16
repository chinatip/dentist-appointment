//Service for Timeslot
const apiURL = `http://35.198.239.97:8000`
export function fetchTimeslotsByDate(date){
    console.log(date);
    const URL = apiURL+"/api/timeslots/?startDate="+date;
    return fetch(URL, { method: 'GET'})
        .then((response) => response.json())

}

export function fetchTimeslots(){
  const URL = apiURL+"/api/timeslots/";
  return fetch(URL, { method: 'GET'})
      .then((response) => response.json())

}

export function createTimeslot(newTimeslot){
    const URL = apiURL+"/api/timeslots/";
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