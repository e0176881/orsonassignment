const e = require("express");
const db = require("../models");
const Student = db.student;
const Teacher = db.teacher;
const StudentController = require("./student.controller");
const TeacherController = require("./teacher.controller");
exports.retrieveNotification = async (req, res) => {
  if (!req.query) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const teacher_email = req.body.teacher;
  const notif = req.body.notification;

  var students_receiving_notif = [];
  const teacher = await TeacherController.findByEmail(teacher_email);
  const studentList = teacher.students;
  console.log(JSON.stringify(studentList));
  for (var i in studentList) {
    if (studentList[i].suspended == false) {
      students_receiving_notif.push(studentList[i].email);
    }
  }
  // assumption is that any invalid @mentioned emails will be ignored and will not receive given notifications
  // It is still considered as a valid request where students under the teachers, who are not suspended, will still receive notifications
  var notif_msg = notif.split(" ");
  for (var i in notif_msg) {
    if (notif_msg[i].indexOf("@") == 0) {
      var email = notif_msg[i].substring(1, notif_msg[i].length);
      var mentioned_student = await StudentController.findByEmail(email);
      if (mentioned_student) {
        // console.log(mentioned_student);
        if (
          !students_receiving_notif.includes(mentioned_student) &&
          mentioned_student.suspended == false
        ) {
          students_receiving_notif.push(mentioned_student.email);
        }
      } else {
        //TODO : handle invalid email
        console.log("invalid email");
        //   res.status(400).send({
        //     message: "mentioned email " + email + " is invalid",
        //   });
      }
    }
  }

  res.status(200).send({ recipients: students_receiving_notif });
};
