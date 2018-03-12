import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled, { withTheme } from 'styled-components';
import { PageContainer, DatePicker, Select, Button, Modal } from 'common';


const Container = styled.div`
  
`;



class Index extends Component {

  constructor(props){
    super(props);
    this.state = {
      users: [],
      clinics: [],
      root: null,
    }
  }

  //Service for Clinic

  fetchClinics(){
    const URL = "http://35.198.239.97:8000/api/clinics/";
    return fetch(URL, { method: 'GET'})
        .then((response) => response.json())
        .then((clinics) => this.setState({ clinics: clinics }))
  }

  createClinic(newClinic){
    const URL = "http://35.198.239.97:8000/api/clinics/";
    return fetch(URL, {
            method: 'post',
            body: newClinic
          }).then(function(response) {
            return response.json();
          })
  }

  getClinic(id){
    const URL = "http://35.198.239.97:8000/api/clinics/"+id;
    return fetch(URL, { method: 'GET'})
        .then((response) => response.json())
  }

  updateClinic(id,newClinic){
    const URL = "http://35.198.239.97:8000/api/clinics/"+id;
    return fetch(URL,  {
              method: 'PUT',
              body: {newClinic}
          })
          .then(response => response.json())
  }

  //Service for User

  fetchUsers(){
    const URL = "http://35.198.239.97:8000/api/users/";
    return fetch(URL, { method: 'GET'})
        .then((response) => response.json())
        .then((users) => this.setState({ users: users }))
  }

  createUser(newUser){
    const URL = "http://35.198.239.97:8000/api/users/";
    return fetch(URL, {
            method: 'post',
            body: newUser
          }).then(function(response) {
            return response.json();
          })
  }

  getUser(id){
    const URL = "http://35.198.239.97:8000/api/users/"+id;
    return fetch(URL, { method: 'GET'})
        .then((response) => response.json())
  }

  updateUser(id,newUser){
    const URL = "http://35.198.239.97:8000/api/users/"+id;
    return fetch(URL,  {
              method: 'PUT',
              body: {newUser}
          })
          .then(response => response.json())
  }

	componentDidMount(){
      this.fetchClinics();
      this.fetchUsers();
  }

  // componentWillUpdate(nextProps, nextState) {
  //   console.log("Users:",nextProps.users)
  //   // if(this.state.clinics != nextProps.clinics.clinics || this.state.users != nextProps.users.users)
  //   // this.setState({
  //   //   clinics : nextProps.clinics.clinics,
  //   //   users: nextProps.users.users,
  //   // });
  // }

  handleClick(e){
    alert("Select "+e.target.value);
  }

  render() {
    console.log("clinics :",this.state.clinics);
    console.log("users :",this.state.users);
    console.log("clinic at 1 :",this.getClinic(1));
    console.log("User at 1 :",this.getUser(1));
    const data = this.state.clinics;

    const userDB = this.state.users;
    let listItems = null;
    if(data && data.length > 0)
    {
      listItems = data.map((d,id) => <li key={id}>{d.name}<button value={d.name} onClick={this.handleClick.bind(this)}>Select</button></li>);
      console.log("GET :",data);
      console.log("GET :",data[0].name);
    }
    
    let listUsers = null;
    if(userDB != undefined)
    {listUsers = userDB.map((d,id) => <li key={id}>{d.firstname}<button value={d.id_number} onClick={this.handleClick.bind(this)}>Select</button></li>);}
    

    // let root = data[0].name;
    
    return (
      <PageContainer title={'Home'}>
        <Container>
          <div>Clinic List</div>
          {/* <Select value={root} options={listItems} /> */}
          <div>User List</div>
          {listUsers}
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

