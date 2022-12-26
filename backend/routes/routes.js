const express = require("express");
const {
  login,
  signup,
  getAllTasks,
  getCompletedTasks,
  addTask,
  getPendingTasks,
  deleteTask,
  updateTask,
  logout,
} = require("../controller/controller");
const router = express.Router();
const { validateJwt } = require("../Auth/auth");

// login & signup

router.post("/api/user/login", login);
router.post("/api/user/signup", signup);
router.post("/api/user/logout", logout);

// get tasks

router.get("/api", validateJwt, getAllTasks); // get all person tasks
router.get("/api/completed", validateJwt, getCompletedTasks); // get all task that has been completed
router.get("/api/pending", validateJwt, getPendingTasks); // get all task that are pending

//add tasks

router.post("/api/add_task", validateJwt, addTask);

// delete tasks

router.delete("/api/delete_task", validateJwt, deleteTask);

// update tasks

router.patch("/api/update_task", validateJwt, updateTask);
module.exports = router;
