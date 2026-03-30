const User = require('../models/user');
const AppError = require('../utils/AppError')

const signup = async (req, res, next) => {
  try{
    const {name, email, password, confirm_password} = req.body;
    if(password !== confirm_password){
      console.error('Password has to match. Try again.');
      throw new AppError("Password has to match. Try again.", 404);
    }
    let user = await User.create({name, email, password});
    res.status(201).json({
      message: "User created",
      user
    })
  }catch(err){
    next(err)
  }
}

// const updateUser = async (req, res, next) => {
//   try{
//     const id = req.params.id;
//     const user = await User.findByIdAndUpdate(id, req.body);
//     if(!user){
//       console.error("No such user with that id")
//     }
//     res.status(200).json({
//       message: "User updated"
//     })
//   }catch(err){
//     console.error(err);
//   }
// }

// const deleteUser = async (req, res, next) => {
//   try{
//     const id = req.params.id;
//     const user = await User.findByIdAndDelete(id);
//     if(!user){
//       console.error("No user with that id")
//     }
//     res.status(200).json({
//       message: "User deleted successfully."
//     })
//   }catch(err){}
// }

const login = async (req, res, next) => {
  try{
    const {email, password} = req.body
    const user = await User.findOne({ email });
    if(!user){
      console.error("No user with that email");
      throw new AppError("No user with that email", 404);
    }
    const pass = user.password;
    if(password !== pass){
      throw new AppError("Invalid credentials. Try again.", 400)
    }
    res.status(200).json({
      message: "Successful login",
      user
    })
  }catch(err){
    next(err)
  }
}

module.exports = {
  signup,
  login
}