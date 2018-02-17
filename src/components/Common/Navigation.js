import React, { Component } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  width: 100%;
  height: 56px;
  background: linear-gradient(to right, rgba(66, 200, 247, 0.77) 0%, #4aebff 100%);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  color: #fff;
`;
  const InnerContainer = styled.div`
  display: flex;
  height: 100%;
  margin: 0 auto;
  max-width: 976px;
`;

const NavContainer = styled.div`
  width: 200px;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0.01px;
  margin: auto 0;
`;

const NavItem = ({ title, link }) => {
  return (
    <NavContainer>
      <Link to={link}>
        {title}
      </Link>
    </NavContainer>
  );
};

class Navigation extends Component {
  render() {
    return (
      <Container>
        <InnerContainer>
          <NavItem title={'Home'} link={'/'} />
          <NavItem title={'Appointment'} link={'/appointment'} />
          <NavItem title={'Contact'} link={'/contact'} />
        </InnerContainer>
      </Container>
    );
  }
}

export default Navigation;