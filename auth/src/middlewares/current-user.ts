import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
	id: string;
	email: string;
}

// In the below declare, we are telling TypeScript that inside of the Express project find the interface of
// request that was already defined inside there, but take that interface that was already created and
// we want to add in this additional property to it.
// So we want to have a property called current user that might be defined.
// or may not be defined.
// And the reason it may or may not is because the user might not be logged in.
// But if we do define the current user property on the request object, we are going to set it to type
// user payload.
declare global {
	namespace Express {
		interface Request {
			currentUser?: UserPayload;
		}
	}
}

export const currentUser = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (!req.session?.jwt) {
		return next();
	}
	try {
		const payload = jwt.verify(
			req.session.jwt,
			process.env.JWT_KEY!
		) as UserPayload;
		req.currentUser = payload;
	} catch (err) {}
	next();
};
