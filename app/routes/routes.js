module.exports = (app) => {
  const students = require("../controllers/student.controller.js");
  const teacher = require("../controllers/teacher.controller.js");
  var router = require("express").Router();

  // Create a new Student
  router.post("/", teacher.createStudentAPI);

  router.get("/", teacher.findCommonStudents);

  app.use("/api/students", router);
};
