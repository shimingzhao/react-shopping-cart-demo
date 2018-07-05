import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import { Form, Label } from 'semantic-ui-react'


const renderSelectField_inline = props => (
  <div>
    <Form.Field>
      <Dropdown
        inline
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
        header={props.header}
        //multiple={props.multiple}
        disabled={props.disabled}
        error={(props.meta.touched && props.meta.error) && true}
       />

       {props.meta.touched && props.meta.error && <Label pointing color='red' >{props.meta.error}</Label>}

     </Form.Field>
  </div>


)


export default renderSelectField_inline
