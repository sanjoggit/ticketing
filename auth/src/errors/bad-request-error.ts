import { CustomError } from "./custom-error";

export class BadRequestError extends CustomError {
	statusCode = 400;
	constructor(message: string) {
		super(message);
		// Below code is written just becuase we are extending a built in class Which is Error
		Object.setPrototypeOf(this, BadRequestError.prototype);
	}
	serializeErrors() {
		return [{ message: this.message }];
	}
}
