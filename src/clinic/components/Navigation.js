import React from 'react'
import { Menu } from 'antd'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Container = styled.div`
  height: 100%;

  .ant-menu {
    height: 100%;
    width: 220px;
  }
`

export default ({ type }) => {
  return (
    <Container>
      <Menu
        defaultSelectedKeys={[type]}
        defaultOpenKeys={['sub1', 'sub2']}
        mode='inline'
        forceSubMenuRender={true}
        inlineCollapsed={false}
      >
        <Menu.SubMenu key='sub1' title={<span>จัดการคลินิค</span>}>
          <Menu.Item key='status'>
            <Link to={`/clinic/status`}>สถานะการนัดหมาย</Link>
          </Menu.Item>
          <Menu.Item key='timetable'>
            <Link to={`/clinic/timetable`}>ตารางเวลา</Link>
          </Menu.Item>
          <Menu.Item key='patients'>
            <Link to={`/clinic/patients`}>คนไข้</Link>
          </Menu.Item>
          <Menu.Item key='book'>
            <Link to={`/clinic/book`}>นัดหมาย</Link>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key='sub1' title={<span>หมอฟัน</span>}>
          <Menu.Item key='dentists'>
            <Link to={`/clinic/dentists`}>ประวัติ</Link>
          </Menu.Item>
          <Menu.Item key='dentistsWorks'>
            <Link to={`/clinic/dentistsWorks`}>ตารางงาน</Link>
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </Container>
  )
}