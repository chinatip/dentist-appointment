import React from 'react'
function refreshClinics(data){
    let listItems = null;
    let root;
    if(data && data.length > 0)
    {
      listItems = data.map((d,id) => <option value={id+1} key={id}>{d.name}</option>);
      root = data[0].name;
    }
    return listItems;
  }



function refreshTreatments(data){
    let listTreatments = null;
      if(data && data.length > 0){
        console.log("Treatment",data);
        listTreatments = data.map( (d,id) => 
        <option value={id+1} key={id}>
          {d.treatment_name}
        </option>
      );
    }
    return listTreatments;
  }

function refreshDentists(data,users){
    let listDentists = null;
    if(users && users.length > 0)
    {
      if(data && data.length > 0){
          listDentists = data.map( (d,id) => 
          <li key={data[id].person_id}>
            {users[data[id].person_id-1].firstname}
          </li>
        );
      }
    }
    return listDentists;
  }


function refreshPatients(data,users){
    let listPatients = null;
    if(users && users.length > 0){
      if(data && data.length > 0){
          listPatients = data.map( (d,id) => 
          <option key={data[id].person_id}>
            {users[data[id].person_id-1].firstname}
          </option>
        );
      }
      return listPatients;
    }
  }

function refreshTimeslots(data,dentists,users){
    let listTimeslots = null;
      if(data && data.length > 0){
        console.log("Timeslot",data);
        console.log('Users',users)
        if(dentists && dentists.length > 0){
          console.log("Timeslot dent",dentists,users);
        listTimeslots = data.map( (d,id) => 
        <li key={id}>
          {users[dentists[d.dentist_id-1].person_id-1].firstname+":"+d.startTime.split("T")[1].split("Z")[0]+"-"+d.endTime.split("T")[1].split("Z")[0]}
          <button>Pick</button>
        </li>
      );
      }
    }
    return listTimeslots;
  }

  export default {
    refreshClinics,refreshDentists,refreshPatients,refreshTimeslots,refreshTreatments
  }