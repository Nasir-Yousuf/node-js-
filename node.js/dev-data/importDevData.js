// const mongoose = require('mongoose');
// const detenv = require('dotenv');
// const fs = require('fs');
// const Tour = require('../models/tourModel');

// // const Tour = require('./../models/tourModel');

// detenv.config({ path: './../config.env' });

// // connecting to the dataBase
// const DB = process.env.DATABASE.replace(
//   '<PASSWORD>',
//   process.env.DATABASE_PASSWORD
// );

// mongoose
//   .connect(DB, {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false
//   })
//   .then(() => console.log('db Connection successful'));

// //Reading

// const tours = JSON.parse(fs.readFileSync('./data/tours-simple.json', 'utf-8'));

// //Import data into db
// const importData = async () => {
//   try {
//     await Tour.create(tours);
//     console.log('Data successfully loaded');
//   } catch (err) {
//     console.log(err);
//   }
//   process.exit();
// };

// //Delete alal data from db
// const deleteData = async () => {
//   try {
//     await Tour.deleteMany();
//     console.log('Data successfully deleted');
//   } catch (err) {
//     console.log(err);
//   }
//   process.exit();
// };

// if (process.argv[2] === '--import') {
//   importData();
// } else if (process.argv[2] === '--delete') {
//   deleteData();
// }

// mongoose
//   .connect(DB, {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false
//   })
//   .then(() => console.log('db Connection successful'));

//==================================================================================================================================================================================================================
//DATABASE START HERE ##############################################################################################################################################################################################
//==================================================================================================================================================================================================================

// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const fs = require('fs');
// const Tour = require('../models/tourModel');
// // const Tour = require('../models/tourModel');

// dotenv.config({ path: './../config.env' });

// const DB = process.env.DATABASE.replace(
//   '<PASSWORD>',
//   process.env.DATABASE_PASSWORD
// );

// mongoose
//   .connect(DB, {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false
//   })
//   .then(() => console.log('database connection successfull'));

// const tours = JSON.parse(fs.readFileSync('./data/tours-simple.json', 'utf-8'));

// // Immport data to db
// const importData = async () => {
//   try {
//     await Tour.create(tours);
//     console.log('data loaded successfully ');
//   } catch (err) {
//     console.log(err);
//   }
//   process.exit();
// };
// const deleteData = async () => {
//   try {
//     await Tour.deleteMany();
//     console.log('data deleted successfully ');
//   } catch (err) {
//     console.log(err);
//   }
//   process.exit();
// };

// // deleteData();
// // importData();

// // console.log(process.argv);

// if (process.argv[2] === '--import') {
//   importData();
// } else if (process.argv[2] === '--delete') {
//   deleteData();
// }

// ==================================================================================================================================================================================================================
// DATABASE START HERE ##############################################################################################################################################################################################
// ==================================================================================================================================================================================================================
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const Tour = require('./../models/tourModel');

dotenv.config({ path: './../config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('database connect successfully');
  });

const tours = JSON.parse(fs.readFileSync('./data/tours.json', 'utf-8'));

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('data loaded successfully ');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('data deleted successfully ');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
