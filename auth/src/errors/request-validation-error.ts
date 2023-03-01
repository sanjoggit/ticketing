import { CustomError } from "./custom-error";
import { ValidationError } from "express-validator";

export class RequestValidationError extends CustomError {
	statusCode = 400;
	constructor(public errors: ValidationError[]) {
		super("Invalid request parameters"); // super is called to invoke the constructor

		// Below code is written just becuase we are extending a built in class Which is Error
		Object.setPrototypeOf(this, RequestValidationError.prototype);
	}
	serializeErrors() {
		return this.errors.map((err) => {
			return { message: err.msg, field: err.param };
		});
	}
}
