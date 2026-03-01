const Fee = require('../models/feeSchema.js');
const StudentFee = require('../models/studentFeeSchema.js');
const Student = require('../models/studentSchema.js');

const feeCreate = async (req, res) => {
    try {
        const { title, amount, sclassName, school, description, dueDate, adminID } = req.body;

        const fee = new Fee({
            title,
            amount,
            sclassName,
            school,
            description,
            dueDate,
            createdByAdmin: adminID
        });

        const result = await fee.save();

        // Automatically assign this fee to all students in the class
        const students = await Student.find({ sclassName, school });

        if (students.length > 0) {
            const studentFeeRecords = students.map(student => ({
                studentId: student._id,
                feeId: result._id,
                amount: amount,
                status: 'pending'
            }));
            await StudentFee.insertMany(studentFeeRecords);
        }

        res.status(200).json({ message: "Fee created and assigned successfully", result });
    } catch (err) {
        res.status(500).json({ message: "Error creating fee", error: err });
    }
};

const getStudentFees = async (req, res) => {
    try {
        const studentFees = await StudentFee.find({ studentId: req.params.id })
            .populate('feeId', 'title description dueDate')
            .sort({ createdAt: -1 });

        if (studentFees.length > 0) {
            res.status(200).json(studentFees);
        } else {
            res.status(200).json({ message: "No fees found for this student", empty: true });
        }
    } catch (err) {
        res.status(500).json({ message: "Error fetching student fees", error: err });
    }
};

const feeList = async (req, res) => {
    try {
        const fees = await StudentFee.find({})
            .populate('studentId', 'name rollNum')
            .populate('feeId', 'title amount dueDate')
            .sort({ createdAt: -1 });

        if (fees.length > 0) {
            res.status(200).json(fees);
        } else {
            res.status(200).json({ message: "No fee records found" });
        }
    } catch (err) {
        res.status(500).json({ message: "Error fetching fee list", error: err });
    }
};

const deleteFee = async (req, res) => {
    try {
        // Find if it's a base fee being deleted - this would be more complex as we'd need to delete all related StudentFees
        // For simplicity, we'll delete a specific StudentFee record if id is passed
        const result = await StudentFee.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Fee record deleted successfully", result });
    } catch (error) {
        res.status(500).json({ message: "Error deleting fee", error });
    }
};

module.exports = { feeCreate, getStudentFees, feeList, deleteFee };
