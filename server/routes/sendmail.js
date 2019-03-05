const express = require('express');
const outlook = require('nodejs-nodemailer-outlook');
const payslip = require(__basedir + "/server/model/payslip-model");
const api = express.Router();

api.get('/', (req, res) => {
  console.log(`${req.originalUrl} works here!`);
});

api.post('/', (req, res) => {
  for ( var i in req.body ) {

    recipient = req.body[i];

    payslip.findOne({ Email: recipient }, (error, slip) => {
      if (error) {
        console.log(error);
      } else {
        sendMail(slip.Email, `
        <style>
          table { border-collapse: collapse; }
          th, td { border: 1px solid #ddd; padding: 3px; font-family: Calibri; font-size: 10.5pt; }
          .emp-info { background: lightyellow; }
          .income, .payable { background: lightgreen; }
          .deduction { background: red; }
        </style>
        <table>
        <thead>
          <tr>
            <th class='emp-info'>No.</th>
            <th class='emp-info'>Name</th>
            <th class='emp-info'>Email</th>
            <th class='emp-info'>Region</th>
            <th class='emp-info'>Designation</th>
            <th class='emp-info'>Bank Details</th>
            <th class='income'>Base Salary</th>
            <th class='income'>Total Working Days</th>
            <th class='income'>Actual Working Days</th>
            <th class='income'>Total Base Salary</th>
            <th class='income'>Overtime (HR)</th>
            <th class='income'>Overtime</th>
            <th class='income'>Others Income</th>
            <th class='income'>Gross Taxable Income</th>
            <th class='deduction's>SSB</th>
            <th class='deduction'>Initial Tax</th>
            <th class='deduction'>Tax Adjustment</th>
            <th class='deduction'>Tax Payment</th>
            <th class='deduction'>Others Deduction</th>
            <th class='deduction'>Total Deduction</th>
            <th class='payable'>Net Pay</th>
            <th class='payable'>New Per Diem</th>
            <th class='payable'>Others</th>
            <th class='payable'>Payable</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${slip['EmpId']}</td>
            <td>${slip['Name']}</td>
            <td>${slip['Email']}</td>
            <td>${slip['Region']}</td>
            <td>${slip['Designation']}</td>
            <td>${slip['BankDetails']}</td>
            <td>${slip['BaseSalary']}</td>
            <td>${slip['TotalWorkingDays']}</td>
            <td>${slip['ActualWorkingDays']}</td>
            <td>${slip['TotalBaseSalary']}</td>
            <td>${slip['OvertimeHR']}</td>
            <td>${slip['Overtime']}</td>
            <td>${slip['OthersIncome']}</td>
            <td>${slip['GrossTaxableIncome']}0</td>
            <td>${slip['SSB']}</td>
            <td>${slip['InitialTax']}</td>
            <td>${slip['TaxAdjustment']}</td>
            <td>${slip['TaxPayment']}</td>
            <td>${slip['OthersDeduction']}</td>
            <td>${slip['TotalDeduction']}</td>
            <td>${slip['NetPay']}</td>
            <td>${slip['NewPerDiem']}</td>
            <td>${slip['Others']}</td>
            <td>${slip['Payable']}</td>
          </tr>
        </tbody></table>`);
      }
    });
  }
});

function sendMail(recipient, message) {

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  const d = new Date();

  outlook.sendEmail({
    auth: {
      user: "may.phyoshein@apollo-towers.com",
      pass: "mps19891"
    },
    from: "may.phyoshein@apollo-towers.com",
    to: recipient,
    subject: `Payslip Information for ${monthNames[d.getMonth()]}`,
    html: message
  });
  console.log(`Email successfully sent to: ${recipient}.`);
}

module.exports = api;
