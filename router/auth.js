// const jwt =require('jsonwebtoken');

// const express = require('express');
// const router = express.Router();

// const bcrypt = require('bcryptjs');
// require('../DB/conn');
// const User = require("../models/userSchema"); 
// router.get('/', (req, res) => {
//     res.send(`Hello world from the server rotuer js`);
// });

// //using promises

// // router.post('/register', (req, res) => {
// //     const {name, email, phone, work, password, cpassword} =req.body;

// //     if(!name ||!email ||!phone ||!work ||!password ||!cpassword){
// //         return res.status(422).json({error:"Email Already Exist"});
// //     }

// //     user.findOne({email: email})
// //         .then((userExist)=>{
// //             if(userExist){
// //                 return res.status(422).json({error:"Email already Exist" })
// //             }
// //         } )

// //     const user = new user({ name, email, phone, work, password, cpassword });

// //     user.save().then(()=>{
// //         res.status(201).json({message:"user register successfully !" });
// //     }).catch((error)=> res.status(500).json({error :"Failed to register"}));
// // }).catch(error=>{console.log(error)});

// // module.exports = router;


// // using async await
// router.post('/register', async (req, res) => {
//     const { name, email, phone, work, password, cpassword } = req.body;

//     if (!name || !email || !phone || !work || !password || !cpassword) {
//         return res.status(422).json({ error: "Please fill in all the fields" });
//     }

//     try {
//         const userExist = await User.findOne({ email: email });
//         if (userExist) {
//             return res.status(422).json({ error: "Email already exists" });
//         }else if(password != cpassword){
//             return res.status(422).json({err: "password are not matching" });
//         }

//         const user = new User({ name, email, phone, work, password, cpassword });

//         // await User.create({
//         //     name, email, phone, work, password, cpassword 
//         // })

//         // await user.save();
//         res.status(201).json({ message: "User registered successfully!" });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: "Failed to register" });
//     }
// });


// //login route
// // router.post('/signin',async(req,res)=>{
// //     try{
// //         const {email, password} = req.body;

// //         if(!email || !password){
// //             return res.status(400).json({error:"Plz filled the data"})
// //         }

// //         const user = new User({ name, email, phone, work, password, cpassword });

// //         const UserLogin = await user.findOne({email:email});
// //         res.json({message:"user Signin Successfully" })
        
// //     }catch(err){
// //         console.log(err);
// //     }
// // })


// router.post('/signin', async (req, res) => {
//     try {
//         const { email, password, name } = req.body; // Add 'name' to the destructuring
        
//         if (!email || !password || !name) { // Check for 'name' in the validation
//             return res.status(400).json({ error: "Please fill in all the required data" });
//         }

//         // Create a new user object with the provided data
//         const user = new User({ name, email, password });
        
//         // Assuming 'user' has a 'findOne' method, find the user by email
//         const UserLogin = await User.findOne({ email: email });
        
//         res.json({ message: "User Signin Successfully" });
//     } catch (err) {
//         console.log(err);
//     }
// });


// module.exports = router;







const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
require('../DB/conn');
const User = require('../models/userSchema');

router.get('/', (req, res) => {
    res.send(`Hello world from the server router js`);
});

router.post('/register', async (req, res) => {
    const { name, email, phone, work, password, cpassword } = req.body;

    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: "Please fill in all the fields" });
    }

    try {
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(422).json({ error: "Email already exists" });
        } else if (password !== cpassword) {
            return res.status(422).json({ error: "Passwords do not match" });
        }

        const user = new User({ name, email, phone, work, password, cpassword });
        await user.save();

        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to register" });
    }
});

router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Please fill in all the required data" });
        }

        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Generate and return a JWT token for authentication
        const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
        res.header('auth-token', token).json({ token, message: "User Signin Successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to sign in" });
    }
});

module.exports = router;