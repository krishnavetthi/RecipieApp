import React from 'react';

const Recipie = ({ data, ingredients }) => {
  return (
    <div>
      <ul>
        <li>
          <img src={data.meals[0].strMealThumb} alt={data.meals[0].strMeal} />
        </li>
        <li className="heading">Recipe: {data.meals[0].strMeal}</li>
        <li className="heading">Area Origin: {data.meals[0].strArea}</li>

        <h3>Ingredients:</h3>
        <ul className="ingredients">
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>

        <h3>Instructions:</h3>
        <div className="instructions">
          <p>{data.meals[0].strInstructions}</p>
        </div>

        <h3></h3>
        <a href={data.meals[0].strSource}>For detailed recipie Click on this link</a>
      </ul>
    </div>
  );
};

export default Recipie;
