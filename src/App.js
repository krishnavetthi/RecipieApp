import './App.css';
import { useState } from 'react';
import Recipie from './feature/recipie';
import Error from './feature/error';

function App() {
  const [data, setData] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchDetails = async () => {
    const itemId = document.getElementById("itemid");
    const itemValue = itemId.value;

    try {
      setIsLoading(true);
      setData(null);
      setError('');
      
      const fetchData = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${itemValue}`
      );
      const data = await fetchData.json();

      if (!data.meals || data.meals.length === 0) {
        throw new Error('No recipe found.');
      }

      setData(data);

      // Extract ingredients dynamically
      let ingredientsArray = [];
      for (let i = 1; i <= 30; i++) {
        let ingredient = data.meals[0][`strIngredient${i}`];
        if (ingredient) {
          ingredientsArray.push(ingredient);
        }
      }

      setIngredients(ingredientsArray);
      console.log('Ingredients:', ingredientsArray);

    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="App">
      <h1>Recipe App</h1>
      <h2>Enter any food item to get the complete data of it</h2>
      <input id="itemid" type="text" placeholder="Enter Item"></input>
      <button onClick={fetchDetails}>Get Recipe</button>

      {isLoading ? (
        <>Loading ....</>
      ) : error ? (
        <>
          <Error message={error} />
        </>
      ) : data ? (
        <>
          <Recipie data={data} ingredients={ingredients} />
        </>
      ) : null}
    </div>
  );
}

export default App;
