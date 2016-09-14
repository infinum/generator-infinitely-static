module.exports = [{
  type: 'input',
  name: 'name',
  message: 'What is the application name?',
  default: this.appname
}, {
  type: 'input',
  name: 'description',
  message: 'What is the application description?'
}, {
  type: 'input',
  name: 'target',
  message: 'What is the Webpack target?',
  default: 'web'
}, {
  type: 'confirm',
  name: 'babel',
  message: 'Would you like babel?',
  default: true
}, {
  type: 'confirm',
  name: 'server',
  message: 'Would you dev server?',
  default: true
}, {
  type: 'input',
  name: 'port',
  message: 'What would be the dev server port?',
  default: '8080'
}, {
  type: 'confirm',
  name: 'modules',
  message: 'Would you CSS modules?',
  default: false
}, {
  type: 'confirm',
  name: 'husky',
  message: 'Would you Husky?',
  default: true
}];
