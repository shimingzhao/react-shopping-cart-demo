import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import { Form, label, Label } from 'semantic-ui-react'



const renderSelectField = props => (
  <div style={{paddingBottom: 18}}>
    <Form.Field required={props.required}>
      {(props.with_label && props.with_label !== undefined && props.with_label === true)
        ?
        <label>{props.label}</label>
        :
        ''
      }
      <Dropdown
        //icon='add user' floating labeled button className='icon'
        selection
        {...props.input}  // <--- ????
        value={props.input.value}
        onChange={(param,data) => {
          props.input.onChange(data.value)
          if ('handleChange' in props){
            props.handleChange(param, data)
          }
         }
        }
        // onLabelClick={(param,data) => {
        //   props.input.onLabelClick(data.value)
        //   if ('handleLabelClick' in props){
        //     props.handleLabelClick(param, data)
        //   }
        //  }}
        // onAddItem={(param,data) => {
        //   props.input.onAddItem(data.value)
        //   if ('handleonAddItem' in props){
        //     props.handleonAddItem(param, data)
        //   }
        //  }}
        placeholder={props.label}
        options={props.options}
        multiple={props.multiple}
        disabled={props.disabled}
        error={(props.meta.touched && props.meta.error) && true}
        loading={props.loading}
        //defaultValue={props.defaultValue}



       />

       {props.meta.touched && props.meta.error && <Label pointing color='red' >{props.meta.error}</Label>}

     </Form.Field>
  </div>


)


export default renderSelectField
