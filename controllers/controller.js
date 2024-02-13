import State from '../models/State.js';

export const getStates = async (req, res) => {
  const { minPopulation, maxPopulation, sortOrder, searchString } = req.body;
  // Define sort order
  let sortQuery = sortOrder === 'asc' ? { population: 1 } : { population: -1 };
  
  // Initialize query object with population criteria
  let queryCriteria = {
    population: { $gte: minPopulation, $lte: maxPopulation }
  };
  
  // Add name to query criteria if it is not null and not an empty string
  if (searchString) {
    queryCriteria.name = { $regex: searchString, $options: 'i' }; // 'i' for case-insensitive search
  }
  
  try {
    const states = await State.find(queryCriteria).sort(sortQuery);
    res.json(states); // Send back JSON response
  } catch (error) {
    console.error('Error fetching states:', error);
    res.status(500).send(error);
  }
};


export const loadStates = async (req, res) => {
  const states = await State.find();

  // Render 'index.ejs' with the states data
  res.render('index', { states });
};
