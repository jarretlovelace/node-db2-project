const Cars = require('./cars-model');
const vinValidator = require('vin-validator');

const checkCarId = async (req, res, next) => {
  try {
    const car = await Cars.getById(req.params.id);
    if (!car) {
      next({ status: 404, message: 'car with id not found' });
    } else {
      req.car = car;
      next();
    }
  } catch (err) {
    next(err);
  }
};

const checkCarPayload = (req, res, next) => {
  const { vin, make, model, mileage } = req.body;
  if (!vin) {
    return next({ status: 400, message: 'vin is missing' });
  }
  if (!make) {
    return next({ status: 400, message: 'make is missing' });
  }
  if (!model) {
    return next({ status: 400, message: 'model is missing' });
  }
  if (!mileage) {
    return next({ status: 400, message: 'mileage is missing' });
  }
  next();
};

const checkVinNumberValid = (req, res, next) => {
  const { vin } = req.body;
  if (vinValidator.validate(vin)) {
    next();
  } else {
    next({ status: 400, message: `vin ${vin} is invalid` });
  }
};

const checkVinNumberUnique = async (req, res, next) => {
  try {
    const existingCar = await Cars.getAll().where({ vin: req.body.vin }).first();
    if (existingCar) {
      return res.status(400).json({ message: `vin ${req.body.vin} already exists` });
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
};
