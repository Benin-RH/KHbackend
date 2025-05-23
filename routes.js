const express = require("express");
const Router = express.Router();

const staff = require("./Staff/staffControler");
const student = require("./Student/studentController");
const Book = require("./Book/bookController");
const favouriteBook = require("./Favourite/FavouriteController");
const lentedBook = require("./Lent/lentBookController");
const rating = require("./Ratings/ratingsController");
const message = require("./Messages/messageController");

/* staff */
Router.post("/staffRegistration", staff.staffRegistration);
Router.post("/staffLogin", staff.staffLogin);
Router.post("/staffCheckMail", staff.staffCheckMail);
Router.post("/staffChangePassword", staff.setNewPassword);
Router.post("/staff", staff.findStaff);
Router.get("/getAllUsers", staff.getAllUsers);
Router.get("/updateStaffDetails", staff.updateStaffDetails);

/* student */
Router.post("/studentRegistration", student.studentRegistration);
Router.post("/studentLogin", student.studentLogin);
Router.post("/student", student.findStudent);
Router.post("/studentCheckMail", student.studentCheckMail);
Router.post("/studentChangePassword", student.setNewPassword);
Router.get("/getAllStudents", student.getAllStudents);

/* Book */
Router.post("/addBook", Book.upload, Book.addBook);
Router.get("/getAllBooks", Book.getAllBooks);
Router.delete("/deleteBook/:id", Book.deleteBook);
Router.post("/getBook/:id", Book.getBook);
Router.post("/editBook/:bookId", Book.upload, Book.editBook);
/* fav book */

Router.post("/addUserFavouriteBooks", favouriteBook.addUserFavouriteBooks);
Router.post("/getAllUserFavouriteBooks", favouriteBook.getUserFavouriteBooks);
Router.post("/removeFavouriteBook", favouriteBook.removeFavouriteBook);
Router.post("/staffFavouriteBooks", favouriteBook.getUserFavouriteBooks);
Router.post("/studentFavouriteBooks", favouriteBook.getUserFavouriteBooks);


/* lent book */
Router.post("/lentedBook", lentedBook.lendBook);
Router.post("/lentedBook/:userId", lentedBook.getLentedBookByUser);
Router.post("/returnBook", lentedBook.returnBook);

/* Rating */
Router.post("/bookRating", rating.createRating);
Router.post("/ratedUsers/:id", rating.getRatedUsers);

/* Message */

Router.post('/sendMessage',message.sendMessage)
Router.get('/getStaffMessage/:id',message.getUserMessage)
Router.get('/getStudentMessage/:id',message.getUserMessage)

module.exports=Router


module.exports = Router;
