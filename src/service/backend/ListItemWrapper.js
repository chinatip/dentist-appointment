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
        listTreatments = data.map( (d,id) => 
        <option value={id+1} key={id}>
          {d.name}
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
            {users[data[id].person_id-1].name+" "+data[id].specialty_id }
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
            {users[data[id].person_id-1].name}
          </option>
        );
      }
      if(listPatients == null) return <option value="-1">none</option>
      return listPatients;
    }
  }




function refreshTimeslots(specialty,data,dentists){
    // var a = JSON.parse(dentists);

    console.log(specialty,data,dentists)

    let listTimeslots = null;
    let timeslotFilter;
        if(data && data.length > 0 && dentists && dentists.length > 0){
          timeslotFilter = ("TEST",data.filter( slotTime => dentists.map(dentist =>dentist.id).indexOf(slotTime.dentist_id) >= 0));
          listTimeslots = timeslotFilter.map((d,id) => <li key={id}>
          {d.dentist_id +": "+d.startTime.split("T")[1].split("Z")[0]+"-"+d.endTime.split("T")[1].split("Z")[0]}
          <button>Pick</button>
          </li>)
          
        }
        
    //   console.log("TEST :",listTimeslots);
    if(listTimeslots == null) return <option value="-1">none</option>  
    return listTimeslots;
  }

  function updateDates(newItem){
    if(dateList.indexOf(newItem) < 0 ) {

      dateList.push(newItem)
      dates.push(<option key={dateList.length} value={newItem}>{newItem}</option>)
    }
  }

  function getDates(){
    return dateList;
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
    refreshDateLists,
    getDates
  }