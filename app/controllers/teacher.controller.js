const e = require("express");
const db = require("../models");
const Student = db.student;
const Teacher = db.teacher;
const StudentController = require("./student.controller");

exports.findCommonStudents = async (req, res) => {
  if (Object.keys(req.query).length === 0) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  try {
    var allStudents = [];
    var teacher_email = Object.values(req.query).toString();
    var teacher_emails = teacher_email.split(",");
    //console.log(teacher_email);
    for (var i in teacher_emails) {
      //console.log(object[i]);
      const data = await this.findByEmail(teacher_emails[i]);
      if (!data) {
        res.status(400).send({
          message: "Teacher dont exist",
        });
        return;
      }
      //console.log(data);
      for (var k in data.students) {
        //console.log(students[k].email);
        allStudents.push(data.students[k].email);
      }
      //  console.log(allStudents);
    }

    if (teacher_emails.length > 1) {
      allStudents = getNonUnique(allStudents); //remove unique students

      //remove duplicate students
    }
    var commonStudents = allStudents.filter(removeDuplicate);
  } catch (err) {
    res.status(500).send({ message: err.message });
    return;
  }
  res.status(200).send({
    students: commonStudents,
  });
};

function getNonUnique(array) {
  var map = new Map();
  array.forEach((a) => map.set(a, (map.get(a) || 0) + 1));
  return array.filter((a) => map.get(a) > 1);
}
function removeDuplicate(value, index, self) {
  return self.indexOf(value) === index;
}

exports.createStudentAPI = async (req, res) => {
  // Validate request
  if (Object.keys(req.body).length === 0) {
    res.status(400).send({
      message: "Content cannot be empty!",
    });
    return;
  }

  try {
    const teacherData = await this.findTeacher(req.body.teacher);
    if (!teacherData) {
      res.status(400).send({
        message: "Teacher dont exist",
      });
      return;
    }

    for (var s in req.body.students) {
      const student = {
        email: req.body.students[s],
      };

      //check if email is empty
      if (!student.email) {
        res.status(400).send({
          message: "Student email cannot be empty",
        });
        return;
      }

      //check if email format is invalid
      if (!validateEmail(student.email)) {
        res.status(400).send({
          message: "Email format invalid",
        });
        return;
      }

      const studentData = await StudentController.create(student);
      await this.addStudent(teacherData.id, studentData.id);
    }
  } catch (err) {
    var message = "";
    if (err.message.includes("UniqueConstraintError")) {
      message = "Student email already exist";
    } else {
      message = err.message; //if other errors exist
    }
    res.status(400).send({
      message: message,
    });
    return;
  }
  res.status(204).send();
};

exports.create = (teacher) => {
  return Teacher.create({
    email: teacher.email,
  })
    .then((teacher) => {
      // console.log(">> Created Teacher: " + JSON.stringify(teacher, null, 2));
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
        attributes: ["id", "email", "suspended"],
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
        attributes: ["id", "email", "suspended"],
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
  return Teacher.findOne({
    where: {
      email: email,
    },
    include: [
      {
        model: Student,
        as: "students",
        attributes: ["id", "email", "suspended"],
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
        //  console.log(
        //    `>> added Student id=${student.id} to Teacher id=${teacher.id}`
        //   );
        return teacher;
      });
    })
    .catch((err) => {
      //  throw err;
      //   console.log(">> Error while adding Student to Teacher: ", err);
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

exports.allTeachers = async (req, res) => {
  try {
    const teachers = await this.findAll();
    res.status(200).send(teachers);
  } catch (err) {
    res.status(400).send({ message: "an error occured" });
  }
};

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
