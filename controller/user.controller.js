const bcrypt =require("bcryptjs");
const jwt= require("jsonwebtoken");
const db = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


async function login(req, res) {
    if (!req.body.email) return res.status(400).send({ err: 'email is empty' });
    const user = await db.User.findOne({ where: { email: req.body.email }, attributes: { include: ['password'] } });
    console.log({ body: user.password });
    const secret = process.env.secret || '123456azerty';
    if (!user) {
        return res.status(400).send({ err: 'The userModel not found' });
    }
    const match = await bcrypt.compareSync(req.body.password, user.password)
    console.log({ match: match });
    if (user && match) {
        console.log(user);
        const token = jwt.sign(
            {
                id: user.id,

                // isAdmin: userModel.isAdmin
            },
            secret,
            { expiresIn: '1d' }
        );

        res.status(200).send({ user: user, token: token });
    } else {
        res.status(400).send({ err: 'password is wrong!' });
    }
}

async function register(req, res) {
    console.log(req.body);
    const olduser = await db.User.findOne({ where: { email: req.body.email } });
    if (olduser) {
        return res.status(400).send({ err: 'Email Exist' });
    }

    await db.User.create({
        name: req.body.name,
        email: req.body.email,
        phonenumber: req.body.phonenumber,
        password: bcrypt.hashSync(req.body.password, 10),

    })
        .then((obj) => {
            res.json({
                status: true,
                message: 'success.',
                date: obj
            });
        })
        .catch(async (err) => {
            res.status(400).json('Error creating ' + err.message)
        });
}

async function getAll() {
return await db.User.findAll();
}

async function getById(id) {
return await getUser(id);
}



async function update(id, params) {
const user = await getUser(id);

  // validate
  const usernameChanged = params.username && user.username !== params.username;
  if (usernameChanged && await db.User.findOne({ where: { username: params.username } })) {
      throw 'Username "' + params.username + '" is already taken';
  }

  // hash password if it was entered
  if (params.password) {
      params.passwordHash = await bcrypt.hash(params.password, 10);
  }

  // copy params to user and save
  Object.assign(user, params);
  await user.save();
}

async function _delete(id) {
  const user = await getUser(id);
  await user.destroy();
}

// helper functions

async function getUser(id) {
  const user = await db.User.findByPk(id);
  if (!user) throw 'User not found';
  return user;
}








module.exports= {
    register,login,getAll,
    getById,
    update,
    delete: _delete
}