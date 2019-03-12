/** Preprocessing */
const express = require("express");
const api = express.Router();
const payslip = require(__basedir + "/server/model/payslip-model");
const upload = require("./upload");
const mail = require('./sendmail');
const url = require('url');

/** api setup */
api.use('/upload', upload);
api.use('/sendmail', mail);

/** Payslip routing */
api.get("/", (req, res) => {
  res.end("api works properly.");
  console.log(`Http: ${req.httpVersion} Method: ${req.method} Url: ${req.url} From: ${req.ip}`);
});

api.get("/payslips", (req, res) => {
  if(req.query.stat == 'local') {
    payslip.Local.find((err, slips) => {
      if (err) {
        res.send(err);
      } else {
        res.send(slips);
      }
    });
  } else {
    payslip.Expat.find((err, slips) => {
      if (err) {
        res.send(err);
      } else {
        res.send(slips);
      }
    });
  }

});

module.exports = api;
