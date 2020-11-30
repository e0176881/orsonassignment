module.exports = (sequelize, DataTypes) => {
  const Teacher = sequelize.define("teacher", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });

  return Teacher;
};
