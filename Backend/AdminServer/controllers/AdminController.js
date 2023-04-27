import admin from'../models/AdminModels.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


let refreshtokens = [];


export const AdminRegister = async (req, res) => {
 try{
  let file = 'N/A'
  if (req.file) {
    file = req.file.filename
  }
    const ExsistAdmin = await admin.findOne({ Admin_Email: req.body.Admin_Email });
    if (ExsistAdmin) {

      res.status(404).json({
        message: "Admin Already registered..!",

      })
    } else if(!ExsistAdmin) {
      const prefix = 'ADM'
      const Admin_ID = (prefix + Date.now())

      const Hash_password = await bcrypt.hash(req.body.Password, 10);
      const newAdmin = new admin({
        Admin_ID: Admin_ID,
        Full_Name: req.body.Full_Name,
        Admin_Email: req.body.Admin_Email,
        Job_title: req.body.Job_title,
        Contact_no: req.body.Contact_no,
        Hash_password: Hash_password,
        ProfilePicture: file


      });

      const newAcct = await newAdmin.save()
      if (newAcct) {
  
        res.status(201).json({
          message: "Registration Sucessfull..!",
          payload: newAcct
        })
      } else {

        res.status(400).json({
          message: "Somthing Went Wrong In Account Creating..!"
        })
      }


    }
  } catch (error) {
    res.status(500).json({
      message: "Somthing Went Wrong..!",
      error: error
    })



  }
}

export const Signin = async (req, res) => {
  try {   
    console.log(req.body.Admin_Email)
    const RegisterdAdmin = await admin.findOne({ Admin_Email: req.body.Admin_Email });
    // console.log(RegisterdAdmin)  
    if (RegisterdAdmin) {
      const enterdPwd = req.body.Password;
      const dbPwd = RegisterdAdmin.Hash_password;
      // console.log(enterdPwd,dbPwd)
      const checkPwd = await bcrypt.compare(enterdPwd, dbPwd);
      // console.log(checkPwd)
      if (checkPwd) {
        const token = jwt.sign({ Admin_Email: req.body.Admin_Email }, process.env.JWT_TOKEN_KEY, { expiresIn: '1h'});
        const refreshToken = jwt.sign({ Admin_Email: req.body.Admin_Email }, process.env.REFRESH_TOKEN_KEY, { expiresIn: '5h' });
        // console.log("token  "+token)
        // console.log("refresh token    "+refreshToken)
        refreshtokens.push(refreshToken);
        res.status(201).json({
          mesage: "Login Successfull..!",
          token,
          refreshToken,
          payload:{RegisterdAdmin}
        })
      } else {
        res.status(401).json({
          message: "Incorrect Password..!"
        })
      }
    } else {
      res.status(404).json({
        message: "Admin Not Registered..!"
      })
    }

  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Server error..!",
      error: error
    })
  }
}

export const tokenRefresh = (req, res, next) => {
  const refreshToken = req.body.refreshToken;
  if (refreshToken == null) {
    res.status(401).json({
      message: "Unauthorized..!"
    })
  } else if (!refreshtokens.includes(refreshToken)) {
    res.status(403).json({
      message: "Forbidden..!"
    })
  } else {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, (err, user) => {
      if (err) {
        res.status(403).json({
          message: "Forbidden..!"
        })
      } else {
        const token = jwt.sign({ Admin_Email: req.body.Admin_Email }, process.env.JWT_TOKEN_KEY, { expiresIn: "1h" });
        res.status(201).json({
          message: "Session Extended..!",
          token
        })
      }
    })
  }
}

export const Signout = (req, res) => {
  try {
    const refreshToken = req.body.refreshToken;
    refreshtokens = refreshtokens.filter(token => token !== refreshToken);
    res.status(200).json({
      message: "Signout successful!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
      error: error,
    });
  }
}

export const getAllAdmins = async (req, res) => {
  try {
    const allAdmins = await admin.find();
    if(allAdmins){
      res.status(200).json({
        message:"Fetched sucessfull..!",
        payload:allAdmins
      })
    }
  }catch(error){
    console.log(error)
  }

}

export const deleteAdmin = async(req,res) => {
  try{
 
    let userId  = req.body.Admin_ID
    const success = await admin.findOneAndDelete({Admin_ID : userId})
    if(success){
      res.status(200).json({
          message:"deleted..!"
      })
    }
    else{
      res.status(400).json({
        message:"error..!"
      })
    }
  }catch{
    res.status(500).json({
      message:"server Error..!"
    })
  }
}