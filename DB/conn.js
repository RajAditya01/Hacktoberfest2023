const mongoose =require('mongoose');
const DB = process.env.DATABASE;
require("dotenv").config();
console.log(DB);
mongoose.connect(DB, {
}).then(() => {
    console.log(`Connection successful`);
}).catch((err) => {
    console.log(`No connection`);
    console.log(err);
});

