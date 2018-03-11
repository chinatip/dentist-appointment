import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { fetchUsersWithRedux } from 'redux/user';
import { fetchClinicsWithRedux } from 'redux/clinic';
import { PageContainer } from 'common';

const Container = styled.div`
  
`;



class Index extends Component {

  constructor(props){
    super(props);
    this.state = {
      clinics: [],
    }
  }


	componentDidMount(){
    this.props.fetchClinicsWithRedux();
  }

  componentWillUpdate(nextProps, nextState) {
    if(this.state.clinics != this.props.clinics.clinics)
    this.setState({
      clinics : this.props.clinics.clinics,
    });
  }

  handleClick(e){
    alert("Select "+e.target.value);
  }

  render() {

    const data = this.state.clinics;
    console.log(this.state.clinics)
    let listItems = null;
    if(data != undefined)
    {listItems = data.map((d,id) => <li key={id}>{d.name}<button value={d.name} onClick={this.handleClick.bind(this)}>Select</button></li>);}
    
    return (
      <PageContainer title={'Home'}>
        <Container>
          {listItems }
        </Container>
      </PageContainer>
    );
  }
}

function mapStateToProps(state){
	return {
    clinics: state.clinics,
  }
}


export default connect(mapStateToProps, {fetchClinicsWithRedux})(Index);

