import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  width: 100%;
  height: 56px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  // background: linear-gradient(to right, rgba(66, 200, 247, 0.77) 0%, #4aebff 100%);
`;
  const InnerContainer = styled.div`
  display: flex;
  height: 100%;
  margin: 0 auto;
  max-width: 976px;
  display: flex;
`;

const LogoWrapper = styled.div`
  width: 250px;
  background: rgba(0,0,0,0.1);
`;

const NavContainer = styled.div`
  padding: 0 40px;
  margin: auto 0;
`;
const NavItemWrapper = styled.div`
  color: #7d7d7d;
  font-size: 16px;
  line-height: 20px;
  font-weight: 500;
  letter-spacing: 0.01px;
  text-align: right;
  transition: all 0.3s;

  &:hover {
    color: #ababab;
  }
`;

const NavItem = ({ title, link }) => {
  return (
    <NavContainer>
      <Link to={link}>
        <NavItemWrapper>{title}</NavItemWrapper>
      </Link>
    </NavContainer>
  );
};

class Navigation extends Component {
  render() {
    return (
      <Container>
        <InnerContainer>
          <LogoWrapper />
          <NavItem title={'Home'} link={'/'} />
          <NavItem title={'Appointment'} link={'/appointment'} />
          <NavItem title={'Contact'} link={'/contact'} />
        </InnerContainer>
      </Container>
    );
  }
}

export default Navigation;