import { UserRoleEnum } from './../../models/enums/UserRoleEnum';
import { model, Schema, Types } from 'mongoose';
var bcrypt = require('bcrypt');

// tslint:disable object-literal-sort-keys
const UserSchema: Schema = new Schema({
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  firstName: { type: String, default: '', required: true },
  lastName: { type: String, default: '', required: true },
  email: { type: String, default: '', required: true },
  phone: { type: String, default: '' },
  username: { type: String, default: '', required: true, unique: true, lowercase: true },
  password: { type: String, default: '', required: true },
  role: { type: UserRoleEnum, default: UserRoleEnum.User, required: true },
  // posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
});

UserSchema.statics.hashPassword = function hashPassword(password: string) {
  return bcrypt.hashSync(password, 10);
}

UserSchema.methods.isValid = function (hashedpassword: string) {
  return bcrypt.compareSync(hashedpassword, this.password);
}

module.exports = model('User', UserSchema);
export default model('User', UserSchema);