import { scrypt, randomBytes } from "crypto"; // its a built-in module in node
import { promisify } from "util"; // nodejs built-in module

// scrypt is a callback function that is why promisify is used to make it promised based function.
const scryptAsync = promisify(scrypt);

export class Password {
	static async toHash(password: string) {
		const salt = randomBytes(8).toString("hex");
		const buf = (await scryptAsync(password, salt, 64)) as Buffer;
		return `${buf.toString("hex")}.${salt}`;
	}
	static async compare(storedPassword: string, suppliedPassword: string) {
		const [hashedPassword, salt] = storedPassword.split(".");
		const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;
		return buf.toString("hex") === hashedPassword;
	}
}
