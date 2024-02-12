const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://admin:Sayu1fyqWVxa8iMz@test-cluster-1.qiqhvln.mongodb.net/course-2"
);

const Adminschema = new mongoose.Schema({
  username: String,
  password: String,
});

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  gender: String,
  password: String,

  purchasedCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

const CourseSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageLink: String,
  price: Number,
});

const Admin = mongoose.model("Admin", Adminschema);
const User = mongoose.model("User", UserSchema);
const Course = mongoose.model("Course", CourseSchema);

module.exports = {
  Admin,
  User,
  Course,
};
