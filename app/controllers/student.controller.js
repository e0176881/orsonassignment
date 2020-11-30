const db = require("../models");
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
      throw new Error(err);
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

exports.suspendStudent = async (req, res) => {
  if (!req.query) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const email = req.body.student;
  const student = await this.findByEmail(email);
  Student.update(
    { suspended: true },
    {
      where: { email: email },
    }
  )
    .then((num) => {
      if (num == 1) {
        res.status(204).send();
      } else {
        if (num == 0 && student.suspended == true) {
          res.status(204).send(); // affected row = 0 due to same value
        }
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Email " + email + " is invalid",
      });
    });
};

exports.findByEmail = (email) => {
  return Student.findOne({
    where: {
      email: email,
    },
    include: [
      {
        model: Teacher,
        as: "teachers",
        attributes: ["id", "email"],
        through: {
          attributes: [],
        },
      },
    ],
  })
    .then((student) => {
      return student;
    })
    .catch((err) => {
      console.log(">> Error while finding Student: ", err);
    });
};
