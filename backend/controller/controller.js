const validate = require("../validation/validate");
const { setJwt } = require("../Auth/auth");
const db = require("../schema/main");
const taskDb = require("../schema/tasksSchema");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).json({
      msg: "please make sure that email and password both provided",
    });
  }
  validate(email, password, res);
  const _id = await db.findOne({ email });
  const user = { email, id: _id._id.toString() };
  const accessToken = setJwt(user);
  res
    .status(200)
    .cookie("ACCESS-TOKEN", accessToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 60 * 60 * 24 * 12),
    })
    .json({ msg: "success" });
};

const signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const duplicateEmail = await db.findOne({ email });
    if (duplicateEmail) {
      return res
        .status(401)
        .json({ msg: "this email is already taken by a user" });
    }
    bcrypt.hash(password, 20).then((hashed) => {
      db.create({ email, password: hashed });
    });
    res.status(200).json({ msg: "user created !!" });
  } catch (error) {
    res.status(401).json({ msg: error.message });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const _id = req.id;
    const getUserTasks = await taskDb.find({ createdBy: _id });
    return res.status(200).json(getUserTasks);
  } catch (error) {
    res.status(401).json({ msg: error.message });
  }
};

const getCompletedTasks = async (req, res) => {
  try {
    const _id = req.id;
    const getUserTasks = await taskDb.find({
      createdBy: _id,
      completed: true,
    });
    if (!getUserTasks) {
      return res.status(401).json({ msg: "there is no completed tasks !" });
    }
    res.status(200).json(getUserTasks);
  } catch (error) {
    res.status(401).json({ msg: error.message });
  }
};

const getPendingTasks = async (req, res) => {
  try {
    const _id = req.id;
    const getUserTasks = await taskDb.find({
      createdBy: _id,
      completed: false,
    });
    if (!getUserTasks) {
      return res.status(401).json({ msg: "there is no pending tasks !" });
    }
    res.status(200).json(getUserTasks);
    s;
  } catch (error) {
    res.status(401).json({ msg: error.message });
  }
};

const addTask = async (req, res) => {
  const _id = req.id;
  const { title } = req.body;
  try {
    const addTaskToDb = await taskDb.create({ createdBy: _id, title });
    res.status(200).json(addTaskToDb);
  } catch (error) {
    res.status(401).json({ msg: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { _id } = req.body;
    const deleteThis = await taskDb.findByIdAndDelete(_id);
    res
      .status(200)
      .json({ msg: "deleted successfully", deletedItem: deleteThis });
  } catch (error) {
    res.status(401).json({ msg: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const update = req.body;

    const updateThis = await taskDb.findByIdAndUpdate(update._id, {
      ...update,
    });
    res
      .status(200)
      .json({ msg: "updated successfully", UpdatedItems: updateThis });
  } catch (error) {
    res.status(401).json({ msg: error.message });
  }
};
module.exports = {
  login,
  signup,
  getAllTasks,
  getCompletedTasks,
  addTask,
  getPendingTasks,
  deleteTask,
  updateTask,
};
