import mongoose from 'mongoose';
import { Password } from '../services/password.js';

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  {
    toJSON: {
      transform(_doc, ret) {
        delete ret.__v;
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
      },
    },
  },
);

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashPassword = await Password.toHash(this.get('password'));
    this.set('password', hashPassword);
  }
  done();
});

userSchema.statics.build = (attributes) => {
  return new User(attributes);
};

const User = mongoose.model('User', userSchema);

export { User };
