const express = require('express');
const router = express.Router();
const financeController = require('../controllers/financeController');
const { protect, authorize } = require('../middleware/authMiddleware');

const financeRoles = ['superadmin', 'schooladmin', 'finance', 'financemanager'];

// Dashboard
router.get('/dashboard', protect, authorize(...financeRoles), financeController.getDashboardSummary);

// Student Bills
router.get('/student-bills', protect, authorize(...financeRoles, 'principal', 'teacher', 'student', 'parent'), financeController.getStudentBills);
router.post('/student-bills/bulk', protect, authorize(...financeRoles), financeController.bulkImportStudentBills);
router.post('/student-bills', protect, authorize(...financeRoles), financeController.createStudentBill);
router.put('/student-bills/:id', protect, authorize(...financeRoles), financeController.updateStudentBill);
router.delete('/student-bills/:id', protect, authorize(...financeRoles), financeController.deleteStudentBill);
router.post('/student-bills/:id/pay', protect, authorize(...financeRoles, 'parent', 'student'), financeController.recordStudentFeePayment);

// Staff Salaries
router.get('/staff-salaries', protect, authorize(...financeRoles), financeController.getStaffSalaries);
router.post('/staff-salaries/bulk', protect, authorize(...financeRoles), financeController.bulkImportStaffSalaries);
router.post('/staff-salaries', protect, authorize(...financeRoles), financeController.generateStaffSalary);
router.put('/staff-salaries/:id', protect, authorize(...financeRoles), financeController.updateStaffSalary);
router.delete('/staff-salaries/:id', protect, authorize(...financeRoles), financeController.deleteStaffSalary);
router.post('/staff-salaries/:id/pay', protect, authorize(...financeRoles), financeController.recordStaffSalaryPayment);

// School Expenses
router.get('/expenses', protect, authorize(...financeRoles), financeController.getSchoolExpenses);
router.post('/expenses', protect, authorize(...financeRoles), financeController.addSchoolExpense);
router.put('/expenses/:id', protect, authorize(...financeRoles), financeController.updateSchoolExpense);
router.delete('/expenses/:id', protect, authorize(...financeRoles), financeController.deleteSchoolExpense);
router.post('/expenses/:id/pay', protect, authorize(...financeRoles), financeController.recordSchoolExpensePayment);

// Payment History / Ledger
router.get('/payment-history', protect, authorize(...financeRoles), financeController.getPaymentHistory);
router.post('/payment-history', protect, authorize(...financeRoles), financeController.addPaymentHistory);

module.exports = router;
