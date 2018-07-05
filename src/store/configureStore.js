if (process.env.NODE_ENV === 'production') {
  module.exports = require('./configureStore.prod')
  console.log('Welcome to production')
} else if (process.env.NODE_ENV === 'production') {
  console.log('Welcome to dev')
  module.exports = require('./configureStore.dev')
}
else {
  console.log('Welcome to dev')
  module.exports = require('./configureStore.dev')
}
