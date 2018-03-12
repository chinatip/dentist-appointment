import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import styled from 'styled-components';

const Container = styled.div`
  height: 100%;

  .ant-menu {
    height: 100%;
    width: 220px;
  }
`;

const SubMenu = Menu.SubMenu;

class ClinicNavigation extends Component {
  render() {
    return (
      <Container>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          forceSubMenuRender={true}
          inlineCollapsed={false}
        >
          <SubMenu key="sub1" title={<span><Icon type="calendar" /><span>Appointment</span></span>}>
            <Menu.Item key="1">Overview</Menu.Item>
            <Menu.Item key="2">Status</Menu.Item>
            <Menu.Item key="3">Manage</Menu.Item>
          </SubMenu>
        </Menu>
      </Container>
    );
  }
}

export default ClinicNavigation;