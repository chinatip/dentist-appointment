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
        defaultOpenKeys={['sub1']}
        mode='inline'
        forceSubMenuRender={true}
        inlineCollapsed={false}
      >
        <Menu.SubMenu key='sub1' title={<span>ข้อมูลส่วนตัว</span>}>
          <Menu.Item key='profile'>
            <Link to={`/profile/${id}/type/book`}>จอง</Link>
          </Menu.Item>
          <Menu.Item key='appointments'>
            <Link to={`/profile/${id}/type/appointments`}>นัดหมาย</Link>
          </Menu.Item>
          <Menu.Item key='history'>
            <Link to={`/profile/${id}/type/history`}>ประวัติ</Link>
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </Container>
  )
}