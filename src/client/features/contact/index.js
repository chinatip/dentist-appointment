import React, { Component } from 'react';
import styled from 'styled-components';

import PageContainer from 'client/components/PageContainer';
import Updater from '../service/backend/UpdaterWrapper';
import Fetcher from '../service/backend/FetcherWrapper';
import ListItem from '../service/backend/ListItemWrapper';
import Getter from '../service/backend/GetterWrapper';
import Deleter from '../service/backend/DeleteWrapper';



const Container = styled.div`
  
`;

class Index extends Component {

  constructor(props){
    super(props);
    this.state = {
      clinic: 1,
      clinicName: 'none',
      clinicAddress: 'none',
      currClinic: null
    }


  }

	componentDidMount(){
    Fetcher.fetchClinics().then((clinics) => this.setState({ clinics: clinics }));

    Getter.getClinic(this.state.clinic).then((clinic) => this.setState({ clinicName: clinic.name,
      clinicAddress: clinic.address }));

  }

componentWillUpdate(nextProps, nextState) {

  if(this.state.clinic != nextState.clinic){
    Getter.getClinic(nextState.clinic).then((clinic) => this.setState({ clinicName: clinic.name,
    clinicAddress: clinic.address }));
  }

}


  handleChange(event){
    let key = event.target.name;
    let val = event.target.value;
    this.setState({[key]: val});
    console.log("Will :",key,val);
  }



  handleSubmit(event) {
    console.log('INPUT: ', this.state.clinicName,this.state.clinicAddress);
    let submitType= event.target.name;
    let newClinic = {
      "name":this.state.clinicName,
      "address": this.state.clinicAddress
    };
    if(submitType === "update") Updater.updateClinic(this.state.clinic,newClinic);
    else if(submitType === "delete"){
      // Deleter.deleteClinic(this.state.clinic);
      alert("Delete")
    }
    event.preventDefault();
  }



  render() {

    return (
      <PageContainer title={'Contact'}>
        <Container>

          <div>Clinic List</div>
          <select name="clinic" value={this.state.clinic} onChange={this.handleChange.bind(this)}>
            {ListItem.refreshClinics(this.state.clinics)}
          </select>

          <form>
          <div>Clinic</div>
          <input name="clinicName" value={this.state.clinicName} onChange={this.handleChange.bind(this)} />
          <input name="clinicAddress" value={this.state.clinicAddress} onChange={this.handleChange.bind(this)} />
          <button type="submit" name="update" onClick={this.handleSubmit.bind(this)}>Update</button>
          <button type="submit" name="delete" onClick={this.handleSubmit.bind(this)}>Delete</button>
          </form>
        </Container>
      </PageContainer>
    );
  }
}

export default Index;