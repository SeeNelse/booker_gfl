const HttpStatus = require('http-status-codes');

const AuthClass = require('../classes/Auth');
const Auth = new AuthClass;

const ErrorsClass = require('../classes/Errors');
const Errors = new ErrorsClass;

const ViewClass = require('../classes/View');
const View = new ViewClass;

module.exports = function(app) {

  app.post('/api/user/signup/:format?', (request, response) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    let result = Auth.setRegistration(request.body);
    if (result === undefined || result === false) {
      response.status(HttpStatus.NOT_ACCEPTABLE).send(View.getData(Errors.notFound(), request.params.format));
      return false;
    } 
    
    result
      .then(ViewResult => View.getData(ViewResult, request.params.format))
      .then(result => {
        if (result) {
          response.status(HttpStatus.OK).send(result);
        } else {
          response.status(HttpStatus.NOT_ACCEPTABLE).send(View.getData(Errors.notFound(), request.params.format));
        }
      });
  });

  app.put('/api/user/login/:format?', (request, response) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    let result = Auth.getLogIn(request.body);
    if (result === undefined || result === false) {
      response.status(HttpStatus.NOT_ACCEPTABLE).send(View.getData(Errors.notFound(), request.params.format));
      return false;
    } 

    result
      .then(ViewResult => View.getData(ViewResult, request.params.format))
      .then(result => {
        if (result) {
          response.status(HttpStatus.OK).send(result);
        } else {
          response.status(HttpStatus.NOT_ACCEPTABLE).send(View.getData(Errors.notFound(), request.params.format));
        }
      });
  });

}