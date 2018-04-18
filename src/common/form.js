import _ from 'lodash'
import React from 'react'
import styled, { css } from 'styled-components'
import { Form, Input, Select, Button } from 'antd'

import { DatePicker } from 'common'

const cssFontInput = css`
  // font-size: 20px;
`

const cssGhostButton = css`
  ${cssFontInput};
`
const cssNormalButton = css`
  ${cssFontInput};
`
const NavigationContainer = styled.div`
  display: flex;
`
const FormButton = styled(Button)`
  // ${props => props.ghost? cssGhostButton: cssNormalButton}
`
export const NavigationButton = ({ onSubmit, onBackStep, last }) => {
  return (
    <NavigationContainer>
      {onBackStep && <FormButton onClick={onBackStep}>{'ย้อนกลับ'}</FormButton>}
      <FormButton onClick={onSubmit}>{ !last? 'ต่อไป': 'ตกลง'}</FormButton>
    </NavigationContainer>
  )
}

export const Row = styled.div`
  display: flex;
`

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
}

const getOptions = (options) => {
  const { list, label, mode } = options
  const selectOptions = []

  _.forEach(list, (l) => {
    if (label) {
      selectOptions.push({ label: label(l), value: l._id })
    } else {
      selectOptions.push({ label: l.name, value: l._id })
    }
  })

  return { selectOptions, mode }
}

const getInputItem = ({ date, textarea, options }) => {
  if (date) {
    return <DatePicker value={date} />
  } else if (textarea) {
    return <Input.TextArea row={4} />
  } else if (options) {
    const { selectOptions, mode } = getOptions(options)
    
    return (
      <Select mode={mode}>
        { selectOptions.map((s) => {
          return <Select.Option value={s.value}>{s.label}</Select.Option>
        })}
      </Select>
    )
  }

  return <Input />
}

export const FormItem = ({ getFieldDecorator, label, message, field, required = true, hidden, ...props }) => {
  return (
    <Form.Item
      {...formItemLayout}
      label={label}
      className={hidden && 'hidden'}
    >
      { getFieldDecorator(field, {
        rules: [{ required: props.date? false: required, message }],
      })(
        getInputItem(props)
      )}
    </Form.Item>
  )
}

const FormContainerWrapper = styled.div`
  .ant-row {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-right: 40px;
  }

  .hidden {
    display: none;
  }

  .ant-upload, .ant-upload-list-item {
    ${cssFontInput};
    margin-right: 0;
    margin-bottom: 0;
    min-height: 170px;
    min-width: 130px;
  }

  .ant-form-item-label {
    width: 100%;
    text-align: left;
    line-height: 20px;
    margin-left: 5px;
    
    label {
      ${cssFontInput};
      margin-bottom: 0;
      &::before, &::after {
        display: none;
      }
    }
  }

  .ant-input {
    ${cssFontInput};
  }

  .ant-form-item-control-wrapper, .ant-calendar-picker {
    width: 100%;

    textarea {
      min-height: ${props => props.step3? 200: 100}px;
    }
  }

  .ant-calendar-picker-icon:after {
    color: #fff;
  }

  .has-error .ant-form-explain {
    color: rgba(241, 220, 220, 0.37);
  }
  
  ${Row} {
    ${props => props.small && 'flex-direction: column;'}
    .ant-row:last-child {
      margin-right: 0px ;
    }
  }
`
export const FormContainer = ({ children, width, step3 }) => {
  return (
    <FormContainerWrapper step3={step3} small={width < 800}>
      <Form>{children}</Form>
    </FormContainerWrapper>
  )
}