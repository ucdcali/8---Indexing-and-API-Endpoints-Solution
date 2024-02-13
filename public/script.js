document.getElementById('minPopulation').addEventListener('input', updateStates);
document.getElementById('maxPopulation').addEventListener('input', updateStates);
document.getElementById('stateSearch').addEventListener('input', updateStates);

let sortOrder = 'des';
document.getElementById('sortOrder').addEventListener('change', function(e) {
  const selectElement = e.target;
  sortOrder = selectElement.value;
  updateStates();
});

async function updateStates() {
  try {
    // Convert minPopulation and maxPopulation to numbers
    const minPopulation = parseInt(document.getElementById('minPopulation').value, 10);
    const maxPopulation = parseInt(document.getElementById('maxPopulation').value, 10);
    const searchString = document.getElementById('stateSearch').value;

    // Check if conversion results in NaN and handle the case appropriately
    if (isNaN(minPopulation) || isNaN(maxPopulation)) {
      console.error('Population values must be numeric');
      return; // Exit the function if values are not valid numbers
    }

    const response = await fetch('/api/states', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ minPopulation, maxPopulation, sortOrder, searchString }),
    });

    if (response.ok) {
      const states = await response.json();
      const container = document.getElementById('statesContainer');
      container.innerHTML = `<h2>States Found: ${states.length}</h2>`; // Clear previous results
      states.forEach(state => {
        let cleanUrl = state.flagImage + ".svg"; // Assuming the flagImage needs the ".svg" extension

        const stateDiv = document.createElement('div');
        stateDiv.innerHTML = `
          <h2>${state.name}</h2>
          <img src="/flags/${cleanUrl}" alt="Flag of ${state.name}" style="width:100px;">
          <p>Population: ${state.population.toLocaleString()}</p>
        `;
        container.appendChild(stateDiv);
      });
    } else {
      console.error('Response not ok with status:', response.status);
    }
  } catch (error) {
    console.error('Fetch error:', error.message);
  }
}



updateStates();
