const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// Ensure connection is loaded from .env
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async () => {
    console.log("Connected to MongoDB for deduplication process");
    const Student = require('./models/studentSchema');

    // Aggregate completely matching rollNum + school identity
    const duplicates = await Student.aggregate([
        {
            $group: {
                _id: { rollNum: "$rollNum", school: "$school" },
                count: { $sum: 1 },
                docs: { $push: "$_id" }
            }
        },
        {
            $match: {
                count: { $gt: 1 }
            }
        }
    ]);

    let deletedCount = 0;
    for (const dup of duplicates) {
        // Retain the newest record (last pushed), discard the older dupes
        const keep = dup.docs.pop();
        const removalResult = await Student.deleteMany({ _id: { $in: dup.docs } });
        deletedCount += removalResult.deletedCount;
        console.log(`Identified duplicates for Roll No: ${dup._id.rollNum}. Fixed.`);
    }

    console.log(`Deduplication completed. Cleaned up ${deletedCount} conflicting database records.`);
    process.exit(0);
}).catch((err) => {
    console.error("Database connection failed for deduplication:", err);
    process.exit(1);
});
