import React from 'react'
import { connect } from 'react-redux'
import { getTranslate , getActiveLanguage } from 'react-localize-redux'
import yup from 'yup'



const _schema = (props) => (


  yup.object().shape({


  'delivery-spec': yup.object().shape({

    'sender': yup.object().shape({

      'name': yup.string().required('Required?'),
      'contact-phone': yup.string().required('Required'),
      'address-details': yup.object().shape({

        'address-line-1': yup.string().required('Required'),
        'city': yup.string().required('Required'),
        'postal-zip-code': yup.string().required('Required')


      })

    }),

    'notification': yup.object().shape({
      'email': yup.string().required('Required')
    })


  })

})

)



const schema = connect(
  state => ({
    svgArr: 'state.svgArr'
  })
)(_schema);

export default schema;

//export default schema
