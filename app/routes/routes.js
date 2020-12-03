module.exports = (app) => {
  const student = require("../controllers/student.controller.js");
  const teacher = require("../controllers/teacher.controller.js");
  const notification = require("../controllers/notification.controller.js");
  var router = require("express").Router();

  // Create a new Student
  router.post("/register", teacher.createStudentAPI);

  router.post("/suspend", student.suspendStudent);

  router.get("/commonstudents", teacher.findCommonStudents);

  router.get("/students", student.allStudents);

  router.get("/teachers", teacher.allTeachers);

  //router.post("/createStudent", student.createStudent);

  router.delete("/deleteStudent/:id", student.deleteStudent);

  router.post("/retrievefornotifications", notification.retrieveNotification);

  app.use("/api", router);
};
