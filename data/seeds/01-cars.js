const cars = [
    { 
      vin: '1G8JW54R12Y537371',
      make: 'Land Rover',
      model: 'Defender', 
      mileage: 120000, 
      title: 'clean', 
      transmission: 'automatic'
  },
  { 
      vin: '3FA6P0H70ER133703', 
      make: 'Chevrolet', 
      model: 'Camero', 
      mileage: 90000, 
      title: 'clean', 
      transmission: 'manual' 
  },
  { 
      vin: '1J4NT4FBXAD617696', 
      make: 'GMC', 
      model: 'Sierra', 
      mileage: 75000, 
      title: 'salvage', 
      transmission: 'automatic' 
  },
  ]
  
    exports.seed = async function (knex) {
      await knex('cars').truncate()
      await knex('cars').insert(cars)
    }
    