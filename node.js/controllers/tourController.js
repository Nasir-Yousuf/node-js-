// ====================================================================================
// TOUR CONTROLLER
// ====================================================================================

const Tour = require('./../models/tourModel');
const APIFeatures = require('./../utilities/apiFeatures');

exports.aliasTopTour = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';

  next();
};
// query = Tour.find && queryString = req.query

exports.getAllTours = async (req, res) => {
  try {
    //EXECUTE QUERY
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const tours = await features.query;

    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      data: {
        err
      }
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 404,
      message: err
    });
  }
};
exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(200).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.getTourStats = async (req, res) => {
  try {
    const stats = await Tour.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4.5 } }
      },
      {
        $group: {
          _id: { $toUpper: '$difficulty' },
          numTours: { $sum: 1 },
          numRatings: { $sum: '$ratingsQuantity' },
          avgRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' }
        }
      },
      {
        $sort: { avgPrice: 1 }
      },
      {
        $match: { _id: { $ne: 'EASY' } }
      }
    ]);
    // console.log(stats);
    res.status(200).json({
      status: 'success',
      data: {
        stats
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.getTourStat = async (req, res) => {
  try {
    const stats = await Tour.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4.5 } }
      },
      {
        $group: {
          _id: '$difficulty',
          numTours: { $sum: 1 },
          numRatings: { $sum: '$ratingsQuantity' },
          avgRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' }
        }
      },
      {
        $sort: { avgPrice: 1 }
      }
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        stats
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fucked',
      message: err
    });
  }
};

exports.getMonthlyPlane = async (req, res) => {
  try {
    const year = req.params.year * 1;

    const plan = await Tour.aggregate([
      {
        $unwind: '$startDates'
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`)
          }
        }
      },
      {
        $group: {
          _id: { $month: '$startDates' },
          numTourStart: { $sum: 1 },
          tours: { $push: '$name' }
        }
      },
      {
        $addFields: { month: '$_id' }
      },
      {
        $project: {
          _id: 0
        }
      },
      {
        $sort: { numTourStart: -1 }
      },
      {
        $limit: 1000
      }
    ]);

    res.status(200).json({
      numTour: plan.length,
      status: 'succcess',
      data: {
        date: plan
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fucked',
      message: err
    });
  }
};
exports.monthlyPlane = async (req, res) => {
  try {
    // eslint-disable-next-line prefer-destructuring
    const year = req.params.year;
    const plan = await Tour.aggregate([
      {
        $unwind: '$startDates'
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`)
          }
        }
      },
      {
        $group: {
          _id: { $month: '$startDates' },
          numTourStart: { $sum: 1 },
          tours: { $push: '$name' }
        }
      },
      {
        $addFields: {
          month: '$_id'
        }
      },
      {
        $project: {
          _id: 0
        }
      },
      {
        $sort: { numTourStart: -1 }
      },
      {
        $limit: 1000
      }
    ]);
    res.status(200).json({
      numOfTour: plan.length,
      status: 'success',
      data: {
        plan
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fucked',
      message: err
    });
  }
};
//=================================================================================================================================
// Before the execution query ::: ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++=============================
// FILTERING  && BUILD QUERY
// const queryObj = { ...req.query };
// const exclutedFields = ['page', 'sort', 'limit', 'fields'];
// exclutedFields.forEach(el => delete queryObj[el]);
// console.log(queryObj, exclutedFields);

// // ADVANCED FILTERING
// let queryStr = JSON.stringify(queryObj);
// queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

// let query = Tour.find(JSON.parse(queryStr));

// if (req.query.sort) {
//   query = query.sort(req.query.sort);
// }

//BUILDING QUERY
//1A) fILTERING
// const queryObj = { ...req.query };
// const exclutedFields = ['page', 'sort', 'limit', 'fields'];
// exclutedFields.forEach(el => delete queryObj[el]);
// // console.log(queryObj, req.query);

// let queryObjStr = JSON.stringify(queryObj);
// queryObjStr = queryObjStr.replace(
//   /\b(gte|gt|lte|lt)\b/g,
//   match => `$${match}`
// );
// const queryObjStrObj = JSON.parse(queryObjStr);

// let query = Tour.find(queryObjStrObj);
// console.log(queryObjStrObj);

//SORTING
// if (req.query.sort) {
//   const sortBy = req.query.sort.split(',').join(' '); //the coma will gone and became a full string
//   query = query.sort(sortBy);
// } else {
//   query = query.sort('-createdAt');
// }

//LIMITING FIELD
// if (req.query.fields) {
//   const fieldsBy = req.query.fields.split(',').join(' ');
//   query = query.select(fieldsBy);
// } else {
//   query = query.select('-__v');
// }

// const page = req.query.page * 1 || 1;
// const limit = req.query.limit * 1 || 100;
// const skip = (page - 1) * limit;
// query = query.skip(skip).limit(limit);

// if (req.query.page) {
//   const numTours = await Tour.countDocuments();

//   if (numTours <= skip) throw new Error('page not found');
// }
