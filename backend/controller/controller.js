const validate = require("validator");
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
  const Email = await validate.isEmail(email);
  if (!Email) {
    return res
      .status(401)
      .json({ msg: `sorry but this ${email} is not a valid one` });
  }
  //
  //
  const databasePass = await db.findOne({ email });
  if (!databasePass) {
    return res
      .status(401)
      .json({ msg: "we can't find any user with this email please signup" });
  }
  //
  //
  const hashPass = databasePass.password;

  bcrypt.compare(password, hashPass).then((response) => {
    if (!response) {
      // console.log(response, "ù");
      return res.status(401).json({ msg: "you entered the wrong password" });
    }
    if (response) {
      // console.log(response, "?");
      const id = databasePass._id.toString();
      const user = { email, id };
      const accessToken = setJwt(user);
      res
        .status(200)
        .cookie("ACCESS-TOKEN", accessToken, {
          sameSite: "lax",
          secure: false,
        })
        .json({ msg: true });
    }
  });
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
    bcrypt.hash(password, 10).then((hashed) => {
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
  const { task, priority } = req.body;
  try {
    const addTaskToDb = await taskDb.create({ createdBy: _id, task, priority });
    res.status(200).json(addTaskToDb);
  } catch (error) {
    res.status(401).json({ msg: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { _id } = req.body;
    console.log(_id);
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
