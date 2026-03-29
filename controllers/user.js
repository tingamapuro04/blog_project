const User = require('../models/user');

const signup = async (req, res, next) => {
  try{
    const {name, email, password, confirm_password} = req.body;
    if(password !== confirm_password){
      console.error('Password has to match. Try again.')
    }
    let user = await User.create({name, email, password});
    res.status(201).json({
      message: "User created",
      user
    })
  }catch(err){
    console.error(err)
  }
}

const updateUser = async (req, res, next) => {
  try{
    const id = req.params.id;
    const user = await User.findByIdAndUpdate(id, req.body);
    if(!user){
      console.error("No such user with that id")
    }
    res.status(200).json({
      message: "User updated"
    })
  }catch(err){
    console.error(err);
  }
}

const deleteUser = async (req, res, next) => {
  try{
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id);
    if(!user){
      console.error("No user with that id")
    }
    res.status(200).json({
      message: "User deleted successfully."
    })
  }catch(err){}
}

const login = async (req, res, next) => {
  try{
    const {email, password} = req.body
    const user = await User.findOne({ email });
    if(!user){
      console.error("No user with that email");
      res.status(404).json({
        message: "No user with that email"
      })
    }
    const pass = user.password;
    if(password !== pass){
      res.status(400).json({
        message: "Invalid credentials. Try again.",
      });
    }
    res.status(200).json({
      message: "Successful login",
      user
    })
  }catch(err){}
}

module.exports = {
  signup,
  login,
  updateUser,
  deleteUser
}