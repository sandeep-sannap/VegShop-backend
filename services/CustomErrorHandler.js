//Study more about JS Error interface
class CustomErrorHandler extends Error {
  constructor(status, msg) {
    super();

    (this.status = status), (this.message = msg);
  }

  static alreadyExists(message) {
    //study about 409 status code
    return new CustomErrorHandler(409, message);
  }

  static wrongCredential(message = "Username or password is wrong!.") {
    return new CustomErrorHandler(401, message);
  }
  static unAuthorized(message = "Unauthorized!.") {
    return new CustomErrorHandler(401, message);
  }
  static notFound(message = "404 Not Found!.") {
    return new CustomErrorHandler(404, message);
  }
  static serverError(message = "Internal server error.") {
    return new CustomErrorHandler(500, message);
  }
}

module.exports = CustomErrorHandler;
