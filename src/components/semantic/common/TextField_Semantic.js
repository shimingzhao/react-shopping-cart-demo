import React from 'react'
import { Form, Label, Message, Icon, Segment, Input } from 'semantic-ui-react'

const renderTextField = ({input, label, type, icon, tag_labeled, tag_toggle, required, with_label, meta: {asyncValidating, touched, error}, ...props}) => (
  <div style={{paddingBottom: 20}}>


    {(tag_labeled !== undefined && (tag_labeled === true))
      ?
      <Input

        placeholder = {label}
        error={(touched && error) && true}
        value={input.value}

        label={{ tag: true, content: label }}
        labelPosition='right'

        icon={icon}
        iconPosition='left'

        {...input}
        {...props}
        loading={asyncValidating && true}
        type={type}

      />
      :
      (tag_toggle !== undefined && (tag_toggle === true))
      ?
      <Input

        //placeholder = {label}
        error={(touched && error) && true}
        value={input.value}

        label={{ basic: true, content: label }}
        labelPosition='right'

        //icon={icon}
        //iconPosition='left'

        {...input}
        {...props}
        //loading={asyncValidating && true}
        type={type}

      />
      :
      // <Input
      //
      //   //placeholder = {label}
      //   error={(touched && error) && true}
      //   value={input.value}
      //
      //   //label={{ content: label }}
      //   //labelPosition='right'
      //   size='small'
      //
      //   icon={icon}
      //   iconPosition='left'
      //
      //   {...input}
      //   {...props}
      //   loading={asyncValidating && true}
      //   type={type}
      //   //label={label}
      //
      // />

      <div>

        <Form.Field required={required}>
          {(with_label && with_label !== undefined && with_label === true)
            ?
            <label>{label}</label>
            :
            ''
          }
          <Form.Input
            error={(touched && error) && true}
            //value={input.value}

            //label={{ content: label }}
            //labelPosition='right'

            placeholder={label}

            icon={icon}
            iconPosition='left'

            {...input}
            {...props}

            type={type}

          />
        </Form.Field>

        {/* <Form.Field>
          <Label>{label}</Label>
          <Form.Input
            error={(touched && error) && true}
            value={input.value}
            // label={{ content: label }}
            // labelPosition='right'

            //label={{ content: 'label' }}
            //labelPosition='right'

            icon={icon}
            iconPosition='left'
            {...input}
            {...props}
            type={type}
          >

          </Form.Input>
        </Form.Field> */}


      </div>


    }


        {/* <Form.Input
          error={(touched && error) && true}
          value={input.value}
          //fluid
          icon={icon}
          iconPosition='left'
          placeholder = {label}
          label={label}
          {...input}
          {...props}
          loading={asyncValidating && true}
          type={type}
          //defaultValue='props.defaultValue'
          //labelPosition='left corner'
          //label={label}
        /> */}

        {touched && error && <Label pointing color='red' style={{marginTop: 5}}>{error}</Label>}

  </div>
)
export default renderTextField
