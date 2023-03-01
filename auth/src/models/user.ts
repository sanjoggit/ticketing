import mongoose from "mongoose";
import { Password } from "../services/password";

interface UserAttrs {
	email: string;
	password: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
	build(attrs: UserAttrs): UserDoc;
}

interface UserDoc extends mongoose.Document {
	email: string;
	password: string;
}

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	// this second parameter in mongoose is option
	// below we are passing toJSON property to modify the returned value
	// in the below code we re removing the _id, password and __v property and replacing _id with id
	// so only id and email is returned as response from this schema
	{
		toJSON: {
			transform(doc, ret) {
				ret.id = ret._id;
				delete ret._id;
				delete ret.password;
				delete ret.__v;
			},
		},
	}
);

// below pre function is mongoose middleware function, when we try to save data to databse, a callback function is called
// the purpose of done arguement is to handle async operation inside callback function. the done is called once all the work is done inside callback function.
// The callback function is using the "function keyword" as opposed to an arrow function. So a quick reminder, whenever we put together a middleware function, we get access to the document that is being saved. So the actual user that we're trying to persist to the database as this inside of this function. If we use an arrow function. Then the value of "this" inside the function would be overridden and would be actually instead equal to the context of this entire file as opposed to our user document, not what we want. So that's why we are using the "function keyword" instead of the arrow function.
userSchema.pre("save", async function (done) {
	if (this.isModified("password")) {
		const hashed = await Password.toHash(this.get("password"));
		this.set("password", hashed);
	}
	done();
});

// this extra step is done instead of just calling the User instance is to support type for the above model
userSchema.statics.build = (attrs: UserAttrs) => {
	return new User(attrs);
};

// angle bracket in typescript refers to generic type, in the below function model
// UserDoc is the first arguement which provides types to the model function and UserModel
// is the return type what model returns.
const User = mongoose.model<UserDoc, UserModel>("User", userSchema);
export { User };
