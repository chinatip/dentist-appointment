import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled, { withTheme } from 'styled-components';
import PageContainer from 'client/components/PageContainer';
import user from '../../../redux/user';

import {fetchClinics} from '../service/apiservice/clinic';
import {fetchUsers} from '../service/apiservice/user';
import {fetchDentists} from '../service/apiservice/dentist';
import {fetchPatients} from '../service/apiservice/patient';
import {fetchTreatments} from '../service/apiservice/treatment';
import {fetchTimeslotsByDate, fetchTimeslots} from '../service/apiservice/timeslot';

import ListItem from '../service/backend/ListItem';

const Container = styled.div`
  
`;



class Index extends Component {

  constructor(props){
    super(props);
    this.state = {
      users: [],
      clinics: [],
      dentists: [],
      clinic: 1,
      treatment: 1,
    }
    this.handleChange = this.handleChange.bind(this);
  }


	componentDidMount(){
      fetchClinics().then((clinics) => this.setState({ clinics: clinics }));
      fetchTreatments().then((treatments) => this.setState({ treatments: treatments }))
      
      fetchUsers().then((users) => this.setState({ users: users }));
      fetchDentists(this.state.clinic,this.state.treatment).then((dentists) => this.setState({ dentists: dentists }))
      fetchPatients().then((patients) => this.setState({ patients: patients }))
      
      fetchTimeslots().then((dates) => this.setState({ dates: dates}))
      fetchTimeslotsByDate(this.state.date).then((timeslots) => this.setState({ timeslots: timeslots}))
  }

  componentWillUpdate(nextProps, nextState) {

        if(this.state.clinic != nextState.clinic || this.state.treatment != nextState.treatment){
          fetchDentists(nextState.clinic,nextState.treatment).then((dentists) => this.setState({ dentists: dentists }))
        }
        if(this.state.date != nextState.date)
        fetchTimeslotsByDate(nextState.date).then((timeslots) => this.setState({ timeslots: timeslots}))



  }

  handleClick(e){
    alert("Select "+e.target.value);
  }

  handleChange(event){
    let key = event.target.name;
    let val = event.target.value;
    this.setState({[key]: val});
    console.log("Will :",key,val);
  }



  render() {    
    return (
      <PageContainer title={'Home'}>
        <Container>
          <div>Clinic List</div>
          <select name="clinic" value={this.state.clinic} onChange={this.handleChange.bind(this)}>
            {ListItem.refreshClinics(this.state.clinics)}
          </select>
          <div>Treatment List</div>
          <select name="treatment" value={this.state.treatment} onChange={this.handleChange.bind(this)}>
          {ListItem.refreshTreatments(this.state.treatments)}
          </select>
          <div>Dentist List</div>
          <ul>
          {ListItem.refreshDentists(this.state.dentists,this.state.users)}
          </ul>

          <div>Date List</div>
          <select name="date" value={this.state.date} onChange={this.handleChange.bind(this)}>
          {ListItem.refreshDateLists(this.state.dates)}
          </select>

          <div>Timeslot List</div>
          <ul>
          {ListItem.refreshTimeslots(this.state.timeslots,this.state.dentists,this.state.users)}
          </ul>
        </Container>
      </PageContainer>
    );
  }
}

// function mapClinicStateToProps(state){
// 	return {
//     clinics: state.clinics,
//   }
// }

// function mapStateToProps(state){
//   console.log("MAP USER",state.users)
//   console.log("MAP CLINIC",state.clinics)
//   return {
//     users: state.users,
//   }
// }


export default Index;

