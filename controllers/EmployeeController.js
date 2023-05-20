const { response } = require("express");
const Employee = require("../models/Employee");

// Show the list of Employess
const index = (req, res, next) => {
  Employee.find()
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch((error) => {
      res.json({
        message: "An error occoured!!",
      });
    });
};

// Show a single employee
const show = (req, res, next) => {
  let employeeID = req.body.employeeID;
  Employee.findById(employeeID)
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch((error) => {
      res.json({
        message: "An error occoured!!",
      });
    });
};

// add new employee
const store = (req, res, next) => {
  let employee = new Employee({
    name: req.body.name,
    designation: req.body.designation,
    email: req.body.email,
    phone: req.body.phone,
    age: req.body.age,
  });

  //for single file upload
  // if (req.file) {
  //   employee.avatar = req.file.path;
  // }

  //multiple file uploads
  if (req.files) {
    let path = "";
    req.files.forEach(function (files, index, arr) {
      path = path + files.path + ",";
    });
    path = path.substring(0, path.lastIndexOf(","));
    employee.avatar = path;
  }

  employee
    .save()
    .then((response) => {
      res.json({
        message: "EMPLOYEE ADDED SUCCESFULLY!!",
      });
    })
    .catch((error) => {
      res.json({
        message: "An error occoured!!",
      });
    });
};

//update an employee
const update = (req, res, next) => {
  let employeeID = req.body.employeeID;

  let updatedData = {
    name: req.body.name,
    designation: req.body.designation,
    email: req.body.email,
    phone: req.body.phone,
    age: req.body.age,
  };

  Employee.findByIdAndUpdate(employeeID, { $set: updatedData })
    .then(() => {
      res.json({
        message: "Employee updated successfully!!",
      });
    })
    .catch((error) => {
      res.json({
        message: "An error occoured!!",
      });
    });
};

// delete an employee
const destroy = (req, res, next) => {
  let employeeID = req.body.employeeID;
  Employee.findByIdAndRemove(employeeID)
    .then(() => {
      res.json({
        message: " Employee deleted",
      });
    })
    .catch((error) => {
      res.json({
        message: "An error occured",
      });
    });
};

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
