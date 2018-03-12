import React from 'react'
var dateList = [],dates=[];


function refreshClinics(data){
    let listItems = null;
    let root;
    if(data && data.length > 0)
    {
      listItems = data.map((d,id) => <option value={id+1} key={id}>{d.name}</option>);
      root = data[0].name;
    }
    if(listItems == null) return <option value="-1">none</option>
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
    if(listTreatments == null) return <option value="-1">none</option>
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
    if(listDentists== null) return <option value="-1">none</option>
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
      if(listPatients == null) return <option value="-1">none</option>
      return listPatients;
    }
  }




function refreshTimeslots(data,dentists){
    // var a = JSON.parse(dentists);

    let listTimeslots = null;
      for(let i = 0 ; dentists && i< dentists.length ; i++){
        if(data && data.length > 0){
          listTimeslots = data.map((d,id) => (
            (d.dentist_id === dentists[i].person_id) ?
            (<li key={id}>
            {d.dentist_id +": "+d.startTime.split("T")[1].split("Z")[0]+"-"+d.endTime.split("T")[1].split("Z")[0]}
            <button>Pick</button>
            </li>) : ""
          ))
        }
      }
    if(listTimeslots == null) return <option value="-1">none</option>  
    return listTimeslots;
  }

  function updateDates(newItem){
    console.log(newItem,dateList.indexOf(newItem))
    if(dateList.indexOf(newItem) < 0 ) {

      dateList.push(newItem)
      dates.push(<option value={newItem}>{newItem}</option>)
    }
  }

  function refreshDateLists(data){
    // var a = JSON.parse(dentists);

    if(data && data.length > 0){
      data.map( (d,id) => 
        updateDates(d.startTime.split("T")[0]))
    }
    // if(listDates == null) return <option value="-1">none</option>  
    return dates;
  }

  export default {
    refreshClinics,
    refreshDentists,
    refreshPatients,
    refreshTimeslots,
    refreshTreatments,
    refreshDateLists
  }