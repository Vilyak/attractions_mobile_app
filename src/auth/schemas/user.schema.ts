import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
});

export const History = new mongoose.Schema({
  username: String,
  states: Array,
});

export const Route = new mongoose.Schema({
  username: String,
  state: Array,
});