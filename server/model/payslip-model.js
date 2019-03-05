const mongoose = require('mongoose');
const db = "mongodb://root:root123@ds115154.mlab.com:15154/hrdb";

// connecting database server
mongoose.connect(
  db,
  { useNewUrlParser: true },
  err => {
    if (err) {
      console.error(err);
    } else {
      console.log("Connection successful!");
    }
  }
);

const empSchema = new mongoose.Schema({
  EmpId: String,
	Payable: String,
	Name: String,
	Email: String,
	Region: String,
	Designation: String,
	BankDetails: String,
	BaseSalary: String,
	TotalWorkingDays: String,
	ActualWorkingDays: String,
	TotalBaseSalary: String,
	OvertimeHR: String,
	Overtime: String,
	OthersIncome: String,
	GrossTaxableIncome: String,
	SSB: String,
	InitialTax: String,
	TaxAdjustment: String,
	TaxPayment: String,
	OthersDeduction: String,
	TotalDeduction: String,
	NetPay: String,
	NewPerDiem: String,
	Others: String
});

module.exports = mongoose.model('Payslip', empSchema, 'Payslips');
