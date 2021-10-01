import { isValidId } from '../utils/db.js';
import { User } from '../models/user.js';
import { BadRequestError } from '../errors/badRequestError.js';

export const getAll = async (_req, res) => {
  const users = await User.find({});
  res.send(users);
};

export const getById = async (req, res) => {
  const { id } = req.params;

  const validId = isValidId(id);
  if (!validId) throw new BadRequestError('Invalid id');

  const user = await User.findById(id);
  if (!user) throw new BadRequestError('User does not exist');

  res.send(user);
};

export const create = async (req, res) => {
  const { firstName, lastName, email, description, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new BadRequestError('Email already in use', 'EMAIL_ALREADY_IN_USE');
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
