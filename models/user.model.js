module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                    msg: "Must be a valid email address",
                },
                notEmpty: {
                    msg: "Email cannot be empty",
                },
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phonenumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
  
    return User;
};