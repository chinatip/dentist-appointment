import _ from 'lodash'
import React from 'react'
import moment from 'moment'
import { stringToMoment } from 'common/utils'

import { Table, Button } from 'common'

const PERIODS = {
  "เช้า": [8, 9, 10, 11], 
  "บ่าย": [12, 13, 14, 15],
  "เย็น": [16, 17, 18, 19, 20]
}

const getSlot = (slot, availableSlots) => {
  let slotAvailable = null
  availableSlots.forEach((s) => {
    if (stringToMoment(s.startTime).format('H:mm') === slot) {
      slotAvailable = s
    }
  })

  return slotAvailable
}

const formatData = (slots, availableSlots) => {
  const timeslots = slots.map((s) => ([
    { label: `${s}:00`, value: getSlot(`${s}:00`, availableSlots) },
    { label: `${s}:30`, value: getSlot(`${s}:30`, availableSlots) }
  ]))

  return timeslots
}

const renderPeriodSlots = ({ timeslots, updateSlot, slot }) => {
  return (
    <div>
      { _.map(timeslots, (t) => {
        return (
          <div style={{ display: 'flex'}}>
            {
              t.map((s) => {
                let isSelect = false

                if (typeof slot === 'object') {
                  isSelect = slot && s.value? (slot._id === s.value._id): false
                } else if (s.value) {
                  isSelect = slot? (stringToMoment(s.value.startTime).format('H:mm') === slot): false
                } else {
                  isSelect = (slot === s.label)
                }

                const currentSlot = s.value || s.label 
                return <button onClick={!!s.value && ((s) => updateSlot(currentSlot))} style={{ color: (isSelect? 'blue': (!!s.value? 'green':'grey'))}}>{s.label}</button>
              })
            }
          </div>
        )
      })}
    </div>
  )
}

const formatTable = ({ availableSlots = [], mobile = false, updateSlot, slot }) => {
  const timeslotItem = (timeslots) => renderPeriodSlots({ timeslots, updateSlot, slot })
  const p1 = formatData(PERIODS['เช้า'], availableSlots)
  const p2 = formatData(PERIODS['บ่าย'], availableSlots)
  const p3 = formatData(PERIODS['เย็น'], availableSlots)
  
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

export default (props) => {
  const { dataSource, columns } = formatTable(props)

  return <Table dataSource={dataSource} columns={columns} />
}