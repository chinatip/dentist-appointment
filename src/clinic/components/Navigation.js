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
        defaultOpenKeys={['sub1']}
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
          <Menu.Item key='dentists'>
            <Link to={`/clinic/dentists`}>หมอฟัน</Link>
          </Menu.Item>
          {/* <MenuItem key={1} path='status' label='สถานะ' />
          <MenuItem key={2} path='timetable' label='ตารางเวลา' />
          <MenuItem key={3} path='edit' label='แก้ไข' /> */}
        </Menu.SubMenu>
      </Menu>
    </Container>
  )
}