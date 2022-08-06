const express = require('express');
const tourController = require('./../controllers/tourController');

const router = express.Router();

// router.param('id', tourController.checkID);

router
  .route('/top_5_cheap')
  .get(tourController.aliasTopTour, tourController.getAllTours);

router.route('/tourStats').get(tourController.getTourStat);
router.route('/monthly-plan/:year').get(tourController.monthlyPlane);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
