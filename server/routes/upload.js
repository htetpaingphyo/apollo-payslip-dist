const express = require("express");
const multer = require("multer");
const xlsx = require("xlsx-to-json");
const Payslip = require(__basedir + "/server/model/payslip-model");
const api = express.Router();

/** defining where to store uploaded file... */
var storage = multer.diskStorage({
  destination: function(req, file, callback) {
    //request, file, callback
    callback(null, __basedir + "/uploads/");
  },
  filename: function(req, file, callback) {
    callback(
      null,
      file.originalname +
        "-" +
        Date.now() +
        "." +
        file.originalname.split(".")[file.originalname.split(".").length - 1]
    );
  }
});

/** Check whether the file is 'xlsx' or not! */
var upload = multer({
  storage: storage,
  fileFilter: function(req, file, callback) {
    var ext = ["xlsx"].indexOf(
      file.originalname.split(".")[file.originalname.split(".").length - 1]
    );
    if (ext == -1) {
      return callback(
        new Error(
          "Unsupport file type occurred! Please make sure you are uploading excel file."
        )
      );
    }
    callback(null, true);
  }
}).single("payslip");

/** Processing upload */
api.post("/", function(req, res) {
  upload(req, res, function(err) {
    if (err) {
      console.log(err);
      return;
    }

    // converting excel to json...
    exceltojson = xlsx;
    try {
      var result = 'Payslip uploaded successfully';
      Payslip.remove({}, () => {
        console.log('Cleaning database completed.');
      })
      exceltojson(
        {
          input: req.file.path,
          output: null,
          lowerCaseHeaders: true
        },
        function(error, payslips) {
          if (error)
          {
            result = 'An error while uploading. Please try again!';
            console.log(error);
          }
          else
          {
            for (var i in payslips)
            {
              const payslip = new Payslip(payslips[i]);
              payslip.save((error, slip) => {
                if (error)
                {
                  result = 'An error while uploading. Please try again!';
                  console.log(error);
                }
                else
                {
                  console.log(`${payslip._id} is successfully saved to database!`);
                }
              });
            }
            res.json({
              message: result
            });
          }
        }
      );
      // remove excel file after uploading...
      // fs.unlinkSync(req.file.path);
    } catch (e) {
      res.status(400).send();
    }
  });
});

/** Api testing */
api.get("/", (req, res) => {
  res.end(`${req.originalUrl} works here!`);
});

module.exports = api;
