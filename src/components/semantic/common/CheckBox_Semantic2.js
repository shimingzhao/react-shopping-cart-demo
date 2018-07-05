import React from 'react'
import { Form, Checkbox } from 'semantic-ui-react'

const renderToggleField = ({
  input: { value, onChange, ...input },
  meta: { touched, error },
  ...rest
}) => (
  <div style={{paddingBottom: 18}}>


    <Checkbox
      {...input}
      {...rest}

     />

    {/* <Checkbox
      {...input}
      {...rest}
      defaultChecked={!!value}
      onChange={(e, data) => {
        //console.log('toogle')
        //console.log(data)
        onChange(data.checked)
      }}
      toggle

    /> */}

  </div>
)
export default renderToggleField2
