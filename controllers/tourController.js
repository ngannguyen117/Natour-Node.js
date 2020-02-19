const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'Success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: { tours }
  });
};

exports.getTour = (req, res) => {
  const id = req.params.id * 1;
  if (id >= tours.length) {
    return res.status(404).json({
      status: 'fail',
      messsage: 'Invalid ID'
    });
  }
  const tour = tours.find(e => e.id === id);

  res.status(200).json({
    status: 'Success',
    data: { tour }
  });
};

exports.createTour = (req, res) => {
  const newID = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newID }, req.body);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    err => {
      if (err)
        res.status(404).json({
          status: 'Fail'
        });
      else {
        res.status(201).json({
          status: 'success',
          data: {
            tour: newTour
          }
        });
      }
    }
  );
};

exports.updateTour = (req, res) => {
  if (req.params.id * 1 >= tours.length) {
    return res.status(404).json({
      status: 'fail',
      messsage: 'Invalid ID'
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>'
    }
  });
};

exports.deleteTour = (req, res) => {
  if (req.params.id * 1 >= tours.length) {
    return res.status(404).json({
      status: 'fail',
      messsage: 'Invalid ID'
    });
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
};
