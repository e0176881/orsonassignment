module.exports = (sequelize, DataTypes) => {
  const Teacher = sequelize.define("teacher", {
    email: {
      type: DataTypes.STRING,
    },
  });

  return Teacher;
};
