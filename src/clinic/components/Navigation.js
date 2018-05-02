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

export default ({ type, id }) => {
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
            <Link to={`/clinic/${id}/type/status`}>สถานะการนัดหมาย</Link>
          </Menu.Item>
          <Menu.Item key='timetable'>
            <Link to={`/clinic/${id}/type/timetable`}>ตารางเวลา</Link>
          </Menu.Item>
          <Menu.Item key='patients'>
            <Link to={`/clinic/${id}/type/patients`}>คนไข้</Link>
          </Menu.Item>
          <Menu.Item key='book'>
            <Link to={`/clinic/${id}/type/book`}>นัดหมาย</Link>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key='sub1' title={<span>หมอฟัน</span>}>
          <Menu.Item key='dentists'>
            <Link to={`/clinic/${id}/type/dentists`}>ประวัติ</Link>
          </Menu.Item>
          <Menu.Item key='dentistsWorks'>
            <Link to={`/clinic/${id}/type/dentistsWorks`}>ตารางงาน</Link>
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </Container>
  )
}