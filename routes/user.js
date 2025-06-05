const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");
// const upload = require("../middlewares/upload");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const Pet = require('../models/registerpet');


const{login,signUp} = require("../controller/Auth");
const{registerPet} = require("../controller/registerPet");
// const{auth,isAdmin,isStudent} = require("../middlewares/auth");
const { isAuthenticated } = require('../middlewares/isAuthenticated');

router.post("/login",login);
router.post("/signUp",signUp);
// Route for registering a pet
router.post("/register", isAuthenticated, upload.single("profilephoto"), registerPet);


// GET pet details by ID
router.get('/petdetails/:id', async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id).populate('owner', 'email phone');

    if (!pet) {
      return res.status(404).json({ success: false, message: 'Pet not found' });
    }

    res.json({
      success: true,
      pet: {
        name: pet.name,
        breed: pet.breed,
        age: pet.age,
        bio: pet.bio,
        profilePhoto: pet.profilePhoto,
        owner: pet.owner ? {
          email: pet.owner.email,
          phone: pet.owner.phone
        } : null
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

//for my-pets section
// GET pets for a specific user (by owner ID)
// GET all pets by user id
router.get('/pets/user/:userId',auth, async (req, res) => {
  try {
    const pets = await Pet.find({ owner: req.params.userId });
    res.json({ success: true, pets });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});



//testing middleware
// router.get("/test",auth,(req,res)=>{//syntax => (path,middlewares,handler)
//     res.json({
//         success:true,
//         message:"welcome to the protected route of test",
//     })
// })

//protected routes
//   /student path prr ane se sbse pehle auth middleware chalega jo check krega ki user authenticate
//  hai ya nhi fir isStudent wala jo check krega ki user student hai ya nhi
//token ke payload me role pass kra tha whi role se verify krenge
// router.get("/student",auth,isStudent,(req,res)=>{//syntax => (path,middlewares,handler)
//     res.json({
//         success:true,
//         message:"welcome to the protected route of student",
//     })
// })

// router.get("/admin",auth,isAdmin,(req,res)=>{//syntax => (path,middlewares,handler)
//     res.json({
//         success:true,
//         message:"welcome to the protected route of admin",
//     })
// })

module.exports = router;