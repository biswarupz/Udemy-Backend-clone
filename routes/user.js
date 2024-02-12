const express = require("express");
const userMiddleware = require("../middlewares/user");
const { User, Course } = require("../db/db");
const router = express.Router();

router.post("/signup", async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const gender = req.body.gender;
  const password = req.body.password;

  const userCreate = await User.create({ username, email, gender, password });
  res.json({ userid: userCreate._id });
});

router.get("/courses", async (req, res) => {
  const allCourses = await Course.find({});
  res.json({ Courses: allCourses });
});

router.post("/courses/:course_id", userMiddleware, async (req, res) => {
  const course_id = req.params.course_id;
  const username = req.headers.username;
  console.log(username, course_id);
  await User.updateOne(
    {
      username: username,
    },
    {
      $push: {
        purchasedCourses: course_id,
      },
    }
  );
  res.json({ msg: "course purchased" });
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  const user = await User.findOne({
    username: req.headers.username,
  });

  const courses = await Course.find({
    _id: {
      $in: user.purchasedCourses,
    },
  });

  res.json({ courses: courses });
});
module.exports = router;
