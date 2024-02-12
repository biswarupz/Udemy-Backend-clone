const express = require("express");
const jwt = require("jsonwebtoken");
const adminMiddleware = require("../middlewares/admin");
const { Admin, Course, User } = require("../db/db");
const { JWT_SECRET } = require("../config");
const router = express.Router();

router.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  await Admin.create({ username, password });
  res.json({ msg: "Admin is created" });
});

router.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = await User.findOne({ username, password });
  if (user) {
    const token = jwt.sign(
      {
        username,
      },
      JWT_SECRET
    );
    res.json({ token });
  } else {
    res.status(411).json({ msg: "username or password is incorrect" });
  }
});

router.post("/create/courses", adminMiddleware, async (req, res) => {
  try {
    const title = req.body.title;
    const description = req.body.description;
    const imageLink = req.body.imageLink;
    const price = req.body.price;

    const newCourse = await Course.create({
      title,
      description,
      imageLink,
      price,
    });
    res.json({ msg: "course successfully created", id: newCourse._id });
  } catch (error) {
    console.log(error);
  }
});
router.get("/courses", adminMiddleware, async (req, res) => {
  console.log(req.username);
  const courses = await Course.find({});
  res.json({ courses });
});

module.exports = router;
