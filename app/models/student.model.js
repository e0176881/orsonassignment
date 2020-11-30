module.exports = (sequelize, Sequelize) => {
  const Student = sequelize.define("student", {
    email: {
      type: Sequelize.STRING,
    },
    suspended: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  });

  return Student;
};
