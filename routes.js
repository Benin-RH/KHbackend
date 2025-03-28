
const express=require("express");
const Router=express.Router();
const staff=require('./Staff/staffControler')
const student=require('./Student/studentController')
const Book=require('./Book/bookController')
const favouriteBook=require('./Favourite/FavouriteController')
const lentedBook=require('./Lent/lentBookController')

/* staff */
Router.post("/staffRegistration", staff.staffRegistration);
Router.post("/staffLogin", staff.staffLogin);
Router.post("/staffCheckMail",staff.staffCheckMail);
Router.post("/staffChangePassword",staff.setNewPassword);
Router.post("/staff",staff.findStaff);


/* student */
Router.post("/studentRegistration", student.studentRegistration);
Router.post("/studentLogin", student.studentLogin);
Router.post("/student",student.findStudent);
Router.post("/studentCheckMail",student.studentCheckMail);
Router.post("/studentChangePassword",student.setNewPassword);


/* Book */
Router.post('/addBook',Book.upload,Book.addBook)
Router.get('/getAllBooks',Book.getAllBooks)
Router.delete('/deleteBook/:id',Book.deleteBook)
Router.post('/getBook/:id',Book.getBook)
Router.put('/editBook/:id',Book.editBook)

/* fav book */
Router.post('/addUserFavouriteBooks',favouriteBook.addUserFavouriteBooks)
Router.post('/getAllUserFavouriteBooks',favouriteBook.getUserFavouriteBooks)
Router.post('/removeFavouriteBook',favouriteBook.removeFavouriteBook)

/* lent book */
Router.post('/lentedBook',lentedBook.lendBook)

module.exports=Router

