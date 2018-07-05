import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import { Form, Label, Flag } from 'semantic-ui-react'

const trigger = props => (
  <span>
    <Flag name={props.language} />
  </span>
)

const renderLanguage = props => (
  <div style={{paddingTop: 15, paddingRight: 15}}>
    <Form.Field>
      <Flag name={props.activeLanguage} />
      <Dropdown
        {...props.input}
        value={props.input.value}
        onChange={(param,data) => {
          props.input.onChange(data.value)
          if ('handleChange' in props){
            props.handleChange(param, data)
          }
         }
        }
        options={props.options}
       />
     </Form.Field>
  </div>


)


export default renderLanguage
