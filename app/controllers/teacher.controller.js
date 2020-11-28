const e = require("express");
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

  if (JSON.stringify(req.query.teacher.length) > 0) {
    console.log("got");
    var allStudents = [];
    this.findAll()
      .then((data) => {
        //   console.log(">> Found Teachers: " + JSON.stringify(data, null, 2));

        for (var j in data) {
          for (var i in req.query.teacher) {
            if (data[j].email === req.query.teacher[i]) {
              var students = data[j].students;
              for (var k in students) {
                allStudents.push(students[k].email);
              }
            }
          }
        }
        var nonUniqueStudents = getNotUnique(allStudents); //remove non unique students
        var commonStudents = nonUniqueStudents.filter(onlyUnique); //remove duplicate students
        console.log();
        res.status(200).send({
          students: commonStudents,
        });
      })
      .catch((err) => {
        console.log(">> Error while finding Teacher: ", err);
      });
  } else {
    this.findByEmail(req.query.teacher)
      .then((data) => {
        this.findById(data.id)
          .then((data) => {
            //
            //console.log(JSON.stringify(data.students, null, 2))

            var commonStudents = [];
            for (var i in data.students) {
              commonStudents.push(data.students[i].email);
            }
            res.status(200).send(JSON.stringify({ students: commonStudents }));
          })
          .catch((err) => {
            res.status(500).send({
              message: err.message,
            });
          });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message,
        });
      });
  }
};
function getNotUnique(array) {
  var map = new Map();
  array.forEach((a) => map.set(a, (map.get(a) || 0) + 1));
  return array.filter((a) => map.get(a) > 1);
}
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

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
              })
              .catch((err) => {
                res.status(500).send({
                  message: err.message,
                });
              });
            //  console.log(data);
          })
          .catch((err) => {
            res.status(500).send({
              message: err.message,
            });
            //create student fail
          });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
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

exports.multipleSearch = (data) => {
  return Teacher.findAll({
    where: {
      [Op.and]: [{ id: id1 }, { id: id2 }],
    },
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
