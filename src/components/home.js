
import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import "../index.css"
import axios from 'axios';

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const fetchCategories = async () => {
    try {
      const response = await axios.get("https://opentdb.com/api_category.php");
      setCategories(response.data.trivia_categories); 
      console.log(response.data.trivia_categories);
    } catch (err) {
      setError("Failed to fetch categories");
    }
  };


  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSelectChange = (event) => {
    setSelectedCategory(event.target.value); // Update state with selected option value
    console.log("Selected Category ID:", event.target.value);
  };
  return (
    <div>
      <h1 className='title'>Bienvenue au Quiz !</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
      <label htmlFor="category-select">Choose a category:</label>
      <select 
        id="category-select" 
        value={selectedCategory} 
        onChange={handleSelectChange}
        className="category-select"
      >
        <option value="">--Please choose an option--</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>

      <button className='btn'>
        <Link to={`/quiz`} state={{ category: selectedCategory }}>Commencer le Quiz</Link>
      </button>
    </div>
  )
}

