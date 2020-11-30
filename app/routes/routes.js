module.exports = (app) => {
  const student = require("../controllers/student.controller.js");
  const teacher = require("../controllers/teacher.controller.js");
  var router = require("express").Router();

  // Create a new Student
  router.post("/register", teacher.createStudentAPI);

  router.post("/suspend", student.suspendStudent);

  router.get("/commonstudents", teacher.findCommonStudents);

  app.use("/api", router);
};
