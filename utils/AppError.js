class AppError extends Error {
    constructor(message, statusCode) {
      super(message);
  
      this.statusCode = statusCode;
      // Determine Status ('fail' pour 4xx, 'error' pour 5xx)
      this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
      // Indicated if the error is operational (true) or programming (false)
      this.isOperational = true;
  
      // Capture the stack trace for debugging
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  module.exports = AppError;