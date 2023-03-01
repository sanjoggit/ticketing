import { CustomError } from "./custom-error";

export class NotAuthorizedError extends CustomError {
	statusCode = 401;
	constructor() {
		super("Not Authorized");
		// Below code is written just becuase we are extending a built in class Which is Error
		Object.setPrototypeOf(this, NotAuthorizedError.prototype);
	}
	serializeErrors() {
		return [{ message: "Not Authorized" }];
	}
}
