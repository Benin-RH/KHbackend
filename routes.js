
const express=require("express");
const Router=express.Router();
const staff=require('./Staff/staffControler')
const student=require('./Student/studentController')
const Admin=require('./Admin/AdminControler')
const Book=require('./Book/bookController')
const favouriteBook=require('./Favourite/FavouriteController')

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

/*Admin*/
Router.post('/AdminLogin',Admin.loginAdmin);

/* Book */
Router.post('/addBook',Book.upload,Book.addBook)
Router.get('/getAllBooks',Book.getAllBooks)
Router.delete('/deleteBook/:id',Book.deleteBook)
Router.post('/getBook/:id',Book.getBook)

/* fav book */
Router.post('/addUserFavouriteBooks',favouriteBook.addUserFavouriteBooks)
Router.post('/getAllUserFavouriteBooks',favouriteBook.getUserFavouriteBooks)
Router.post('/removeFavouriteBook',favouriteBook.removeFavouriteBook)


module.exports=Router

