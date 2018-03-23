import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled, { withTheme } from 'styled-components';
import PageContainer from 'client/components/PageContainer';
import user from 'redux/user';

import Fetcher from 'service/backend/FetcherWrapper';
import ListItem from 'service/backend/ListItemWrapper';
import Creator from 'service/backend/CreatorWrapper';
import Updater from 'service/backend/UpdaterWrapper';
import Getter from 'service/backend/GetterWrapper';
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
      clinicName: '',
      clinicAddress: '',
    }
    this.handleChange = this.handleChange.bind(this);
  }

	componentDidMount(){
    Fetcher.fetchClinics().then((clinics) => this.setState({ clinics: clinics }));
    Fetcher.fetchSpecialties().then((specialties) => this.setState({ specialties: specialties}))
    Fetcher.fetchTreatments().then((treatments) => this.setState({ treatments: treatments }))
    
    Fetcher.fetchUsers().then((users) => this.setState({ users: users }));
    //////////////////
    Getter.getTreatment(this.state.treatment).then((treatment) => this.setState({ specialty: treatment.specialty_id}))
    Fetcher.fetchDentists(this.state.clinic,this.state.specialty).then((dentists) => this.setState({ dentists: dentists }))
    Fetcher.fetchPatients().then((patients) => this.setState({ patients: patients }))
    
    Fetcher.fetchTimeslots().then((dates) => this.setState({ dates: dates}))
    Fetcher.fetchTimeslotsByDate(this.state.date).then((timeslots) => this.setState({ timeslots: timeslots}))
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.treatment != nextState.treatment){
      //////////////////
      Getter.getTreatment(nextState.treatment).then((treatment) => this.setState({ specialty: treatment.specialty_id}))
    }

     if (this.state.clinic != nextState.clinic || this.state.specialty != nextState.specialty){
      Fetcher.fetchDentists(nextState.clinic,nextState.specialty).then((dentists) => this.setState({ dentists: dentists }))
     }

    if (this.state.date != nextState.date)
    Fetcher.fetchTimeslotsByDate(nextState.date).then((timeslots) => this.setState({ timeslots: timeslots}))
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

  handleSubmit(event) {
    console.log('INPUT: ', this.state.clinicName,this.state.clinicAddress);
    let newClinic = {
      "name":this.state.clinicName,
      "address": this.state.clinicAddress
    };
    Creator.createClinic(newClinic);
    event.preventDefault();
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
          {ListItem.refreshTimeslots(this.state.specialties,this.state.timeslots,this.state.dentists,this.state.users)}
          </ul>

          <form onSubmit={this.handleSubmit.bind(this)}>
            <label>
              name:
              <input
                name="clinicName"
                value={this.state.clinicName}
                onChange={this.handleChange.bind(this)} />
            </label>
            <br />
            <label>
              address:
              <input
                name="clinicAddress"
                value={this.state.clinicAddress}
                onChange={this.handleChange.bind(this)} />
            </label>

            <input type="submit" />
          </form>

        </Container>
      </PageContainer>
    );
  }
}

export default Index;

