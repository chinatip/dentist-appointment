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
          defaultSelectedKeys={['sub1-1']}
          defaultOpenKeys={['sub1', 'sub2']}
          mode="inline"
          forceSubMenuRender={true}
          inlineCollapsed={false}
        >
          <SubMenu key="sub1" title={<span><Icon type="calendar" /><span>นัดหมาย</span></span>}>
            <Menu.Item key="sub1-1">สรุป</Menu.Item>
            <Menu.Item key="sub1-2">สถานะ</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" title={<span><Icon type="calendar" /><span>จัดการ</span></span>}>
            <Menu.Item key="sub2-1">ตารางเวลา</Menu.Item>
            <Menu.Item key="sub2-2">ทันตแพทย์</Menu.Item>
          </SubMenu>
        </Menu>
      </Container>
    );
  }
}

export default ClinicNavigation;