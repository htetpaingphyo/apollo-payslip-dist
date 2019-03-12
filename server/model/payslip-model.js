const mongoose = require("mongoose");
const db = "mongodb://root:root123@ds115154.mlab.com:15154/hrdb";

// connecting database server
mongoose.connect(db, { useNewUrlParser: true }, err => {
  if (err) {
    console.error(err);
  } else {
    console.log("Connection successful!");
  }
});

const LocalSchema = new mongoose.Schema({
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

var Local = mongoose.model("LocalEmployee", LocalSchema, "LocalEmployees");

const ExpatSchema = new mongoose.Schema({
  No: String,
  EmployeeName: String,
  Email: String,
  MonthlySalary_USD: String,
  FxRate: String,
  BaseSalary_MMK: String,
  WorkingDays: String,
  ActualWorkedDays: String,
  TotalBaseSalary_MMK: String,
  HousingAllowance_MMK: String,
  MedicalAllowance_MMK: String,
  OtherBenefits_MMK: String,
  GrossTaxableIncome_MMK: String,
  SSB_MMK: String,
  TaxPayment_MMK: String,
  ThirdPartyPaidBenefits_MMK: String,
  OtherDeduction_MMK: String,
  TotalDeduction_MMK: String,
  NetPay_MMK: String,
  NetPay_USD: String,
  ExpenseClaims_USD: String,
  TotalPayable_USD: String
});

var Expat = mongoose.model("ExpatEmployee", ExpatSchema, "ExpatEmployees");

module.exports = {
  Local: Local,
  Expat: Expat
};
