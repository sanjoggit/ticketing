export abstract class CustomError extends Error {
	abstract statusCode: number;
	constructor(message: string) {
		super(message);
		// Below code is written just becuase we are extending a built in class Which is Error
		Object.setPrototypeOf(this, CustomError.prototype);
	}

	abstract serializeErrors(): {
		message: string;
		field?: string;
	}[];
}
