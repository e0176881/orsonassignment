const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const StudentController = require("./app/controllers/student.controller");
const TeacherController = require("./app/controllers/teacher.controller");
const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");

const run = async () => {
  const teacher1 = await TeacherController.create({
    email: "teacherken@gmail.com",
  });

  const teacher2 = await TeacherController.create({
    email: "teacherjoe@gmail.com",
  });

  const student1 = await StudentController.create({
    email: "commonstudent1@gmail.com",
  });

  const student2 = await StudentController.create({
    email: "commonstudent2@gmail.com",
  });

  const student3 = await StudentController.create({
    email: "student_only_under_teacher_ken@gmail.com",
  });

  await TeacherController.addStudent(teacher1.id, student1.id);
  await TeacherController.addStudent(teacher1.id, student2.id);
  await TeacherController.addStudent(teacher1.id, student3.id);
  await TeacherController.addStudent(teacher2.id, student1.id);
  await TeacherController.addStudent(teacher2.id, student2.id);
};

//db.sequelize.sync();
// // drop the table if it already exists
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
  run();
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome" });
});

require("./app/routes/routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
