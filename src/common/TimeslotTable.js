import _ from 'lodash'
import React from 'react'
import { withStateHandlers } from 'recompose'

import { Table, Button } from 'common'

const PERIODS = {
  "เช้า": [8, 9, 10, 11], 
  "บ่าย": [12, 13, 14, 15],
  "เย็น": [16, 17, 18, 19, 20]
}

const isSlotAvailable = (s) => {
  return true
}

const formatData = (slots) => {
  const timeslots = slots.map((s) => ([
    { label: `${s}:00`, value: isSlotAvailable(`${s}:00`) },
    { label: `${s}:30`, value: isSlotAvailable(`${s}:30`) }
  ]))

  return timeslots
}

const renderPeriodSlots = ({ timeslots, selectSlot, slot }) => {
  return (
    <div>
      { _.map(timeslots, (t) => {
        return (
          <div style={{ display: 'flex'}}>
            {
              t.map((s) => 
                <Button value={slot === s.label? 'select': `${s.label} ${s.value}`} onClick={() => selectSlot(s.label)}/>
              )
            }
          </div>
        )
      })}
    </div>
  )
}

const formatTable = ({appointments = [], mobile = false, selectSlot, slot }) => {
  const timeslotItem = (timeslots) => renderPeriodSlots({ timeslots, selectSlot, slot })
  const p1 = formatData(PERIODS['เช้า'])
  const p2 = formatData(PERIODS['บ่าย'])
  const p3 = formatData(PERIODS['เย็น'])
  
  const dataSourceMobile = [
    { period: 'เช้า', timeslots: p1 },
    { period: 'บ่าย', timeslots: p2 },
    { period: 'เย็น', timeslots: p2 },
  ]

  const dataSource = [{ timeslots: p1, timeslots2: p2, timeslots3: p3 }]

  const columnsMobile = [
    {
      title: 'ช่วงเวลา', 
      dataIndex: 'period',
      key: 'period',
      width: '100px'
    }, {
      title: 'เวลา',
      dataIndex: 'timeslots',
      key: 'timeslots',
      render: (timeslots) => {
        return timeslotItem(timeslots)
      }
    }
  ]

  const columns = [
    {
      title: 'ช่วงเช้า',
      dataIndex: 'timeslots',
      key: 'timeslots',
      render: (timeslots) => {
        return timeslotItem(timeslots)
      }
    },
    {
      title: 'ช่วงบ่าย',
      dataIndex: 'timeslots2',
      key: 'timeslots2',
      render: (timeslots) => {
        return timeslotItem(timeslots)
      }
    },{
      title: 'ช่วงเย็น',
      dataIndex: 'timeslots3',
      key: 'timeslots3',
      render: (timeslots) => {
        return timeslotItem(timeslots)
      }
    }
  ]

  if (mobile) {
    return { dataSource: dataSourceMobile, columns: columnsMobile }
  }

  return { dataSource, columns }
}

export default withStateHandlers(
  { slot: null },
  { 
    selectSlot: () => (slot) => {
      return { slot }
    }
  }
)((props) => {
  const { dataSource, columns } = formatTable(props)

  return <Table dataSource={dataSource} columns={columns} />
})