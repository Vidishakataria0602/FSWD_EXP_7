const mongoose = require('mongoose');
const Book = require('./model/book');

const uri = "mongodb://localhost:27017/bookdb";

async function performCRUD() {
    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("✅ Connected to MongoDB");

        // INSERT
        await Book.insertMany([
            {
                bookId: "B101",
                title: "The Silent Patient",
                author: "Alex Michaelides",
                genre: "Psychological Thriller",
                publishedYear: 2019,
                language: "English"
            },
            {
                bookId: "B102",
                title: "1984",
                author: "George Orwell",
                genre: "Dystopian",
                publishedYear: 1949,
                language: "English"
            },
            {
                bookId: "B103",
                title: "Wings of Fire",
                author: "A. P. J. Abdul Kalam",
                genre: "Autobiography",
                publishedYear: 1999,
                language: "English"
            }
        ]);

        // READ
        const allBooks = await Book.find({});
        console.log("📚 All Books:\n", allBooks);

        // UPDATE
        await Book.updateOne(
            { bookId: "B101" },
            { $set: { publishedYear: 2020 } }
        );
        const updated = await Book.findOne({ bookId: "B101" });
        console.log("🔄 Updated Book:\n", updated);

        // DELETE
        const deleted = await Book.deleteOne({ bookId: "B103" });
        console.log("🗑️ Deleted Book:\n", deleted);

        // FINAL LIST
        const remaining = await Book.find({});
        console.log("📃 Remaining Books:\n", remaining);

    } catch (error) {
        console.error("❌ MongoDB Error:", error);
    } finally {
        await mongoose.disconnect();
        console.log("🔌 Disconnected from MongoDB");
    }
}

performCRUD();
