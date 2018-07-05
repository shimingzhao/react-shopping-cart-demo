const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined

const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined

const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined



//export const required = value => (value ? undefined : 'Required')
export const required = value => (value ? undefined : (sessionStorage.getItem('activeLanguage') === 'en') ? 'Required' : (sessionStorage.getItem('activeLanguage') === 'fr') ? 'Champs obligatoire' : '???')


export const maxLength50 = maxLength(50)


export const minLength2 = minLength(2)

export const number = value =>
  value && isNaN(Number(value)) ? 'Must be a number' : undefined

export const minValue18 = minValue(18)

export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined

export const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? 'Only alphanumeric characters'
    : undefined

export const phoneNumber = value =>
  value && !/^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/.test(value)
    ? 'Invalid phone number'
    : undefined

//export const sameAs = value => (value === undefined ? 'Required' : value === false : 'Passwords must match!')
//export const sameAs = value => (value === false : 'Passwords must match!')
export const sameAs = value => (value ? undefined : 'Passwords must match!')

export const checkClientExists2 = value => (value === false : 'TAKEN!')
