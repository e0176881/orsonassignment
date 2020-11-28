const db = require("../models");
const Student = db.student;
const Teacher = db.teacher;
const StudentController = require("./student.controller");
const TeacherController = require("./teacher.controller");

exports.findCommonStudents = (req, res) => {
  if (!req.query) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  this.findByEmail(req.query)
    .then((data) => {
      console.log(JSON.stringify(data["teacher"]));
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};
exports.createStudentAPI = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  //console.log(req.body.students.length);
  TeacherController.findTeacher(req.body.teacher)
    .then((teacherData) => {
      for (var s in req.body.students) {
        // console.log(req.body.students[s]);

        const student = {
          email: req.body.students[s],
        };

        StudentController.create(student)
          .then((data) => {
            this.addStudent(teacherData.id, data.id)
              .then((data) => {
                res.status(204).send();
                // .send({
                //   message:
                //     err.message ||
                //     "Some error occurred while creating the Teacher.",
                // });
              })
              .catch((err) => {
                res.status(500).send({
                  message: err.message,
                });
              });
            console.log(data);
          })
          .catch((err) => {
            //create student fail
          });
      }
    })
    .catch((err) => {
      //teacher fail
    });
};

exports.create = (teacher) => {
  return Teacher.create({
    email: teacher.email,
  })
    .then((teacher) => {
      console.log(">> Created Teacher: " + JSON.stringify(teacher, null, 2));
      return teacher;
    })
    .catch((err) => {
      console.log(">> Error while creating Teacher: ", err);
    });
};

exports.findAll = () => {
  return Teacher.findAll({
    include: [
      {
        model: Student,
        as: "students",
        attributes: ["id", "email"],
        through: {
          attributes: [],
        },
      },
    ],
  })
    .then((teachers) => {
      return teachers;
    })
    .catch((err) => {
      console.log(">> Error while retrieving Teachers: ", err);
    });
};

exports.findById = (id) => {
  return Teacher.findByPk(id, {
    include: [
      {
        model: Student,
        as: "students",
        attributes: ["id", "email"],
        through: {
          attributes: [],
        },
      },
    ],
  })
    .then((teacher) => {
      return teacher;
    })
    .catch((err) => {
      console.log(">> Error while finding Teacher: ", err);
    });
};

exports.findByEmail = (email) => {
  return Teacher.findOne(
    { where: { email: email } },
    {
      include: [
        {
          model: Student,
          as: "students",
          attributes: ["id", "email"],
          through: {
            attributes: [],
          },
        },
      ],
    }
  )
    .then((teacher) => {
      return teacher;
    })
    .catch((err) => {
      console.log(">> Error while finding Teacher: ", err);
    });
};

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

exports.findTeacher = (email) => {
  return Teacher.findOne({ where: { email: email } })
    .then((teacher) => {
      return teacher;
    })
    .catch((err) => {
      console.log(">> Error while finding Teacher: ", err);
    });
};
