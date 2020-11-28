const db = require("../models");
const { create } = require("./teacher.controller");
const Student = db.student;
const Teacher = db.teacher;

exports.addStudent = (teacherId, studentId) => {
  return Teacher.findByPk(teacherId)
    .then((teacher) => {
      if (!teacher) {
        console.log("Teacher not found!");
        return null;
      }
      return Student.findByPk(studentId).then((student) => {
        if (!student) {
          console.log("Student not found!");
          return null;
        }

        teacher.addStudent(student);
        console.log(
          `>> added Student id=${student.id} to Teacher id=${teacher.id}`
        );
        return teacher;
      });
    })
    .catch((err) => {
      console.log(">> Error while adding Student to Teacher: ", err);
    });
};

exports.create = (student) => {
  return Student.create({
    email: student.email,
  })
    .then((student) => {
      console.log(">> Created Student: " + JSON.stringify(student, null, 4));
      return student;
    })
    .catch((err) => {
      console.log(">> Error while creating Student: ", err);
    });
};

exports.findAll = () => {
  return Student.findAll({
    include: [
      {
        model: Teacher,
        as: "teachers",
        attributes: ["id", "email"],
        through: {
          attributes: [],
        },
        // through: {
        //   attributes: ["tag_id", "tutorial_id"],
        // },
      },
    ],
  })
    .then((students) => {
      return students;
    })
    .catch((err) => {
      console.log(">> Error while retrieving Students: ", err);
    });
};
