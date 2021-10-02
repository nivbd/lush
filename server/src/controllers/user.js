import { isValidId } from '../utils/db.js';
import { User } from '../models/user.js';
import { BadRequestError } from '../errors/badRequestError.js';
import { ERRORS } from '../consts/errors.js';

export const getAll = async (_req, res) => {
  const users = await User.find({});
  res.send(users);
};

export const getById = async (req, res) => {
  const { id } = req.params;

  const validId = isValidId(id);
  if (!validId) throw new BadRequestError(ERRORS.INVALID_ID.message);

  const user = await User.findById(id);
  if (!user) throw new BadRequestError(ERRORS.USER_DOES_NOT_EXIST.message);

  res.send(user);
};

export const create = async (req, res) => {
  const { firstName, lastName, email, description = '', password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new BadRequestError(ERRORS.EMAIL_IN_USE.message, ERRORS.EMAIL_IN_USE.error_code);
  }

  const newUser = User.build({
    first_name: firstName,
    last_name: lastName,
    email,
    password,
    description,
  });

  const savedUser = await newUser.save();
  res.status(201).send(savedUser);
};
