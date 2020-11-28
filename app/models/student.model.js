module.exports = (sequelize, Sequelize) => {
  const Student = sequelize.define("student", {
    email: {
      type: Sequelize.STRING,
    },
  });

  return Student;
};
