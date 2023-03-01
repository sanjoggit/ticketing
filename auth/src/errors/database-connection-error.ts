import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
	statusCode = 500;
	reason = "Error connecting to databse";
	constructor() {
		super("Error connecting to DB");

		// Below code is written just becuase we are extending a built in class Which is Error
		Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
	}
	serializeErrors() {
		return [{ message: this.reason }];
	}
}
