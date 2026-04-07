import { useState, useMemo } from 'react'
import './App.css'

interface Recipe {
  id: number;
  title: string;
  ingredients: string[];
  instructions: string[];
  image: string;
  category: string;
}

const MOCK_RECIPES: Recipe[] = [
  {
    id: 1,
    title: "Fresh Tomato Pasta",
    ingredients: ["Pasta", "Tomato", "Garlic", "Basil", "Olive Oil"],
    instructions: [
      "Boil water and cook pasta.",
      "Sauté garlic in olive oil.",
      "Add chopped tomatoes and basil.",
      "Toss with pasta and serve."
    ],
    image: "https://picsum.photos/seed/pasta/400/300",
    category: "Main Dish"
  },
  {
    id: 2,
    title: "Chicken Stir Fry",
    ingredients: ["Chicken", "Broccoli", "Soy Sauce", "Ginger", "Garlic", "Onion"],
    instructions: [
      "Cut chicken and vegetables.",
      "Sauté ginger and garlic.",
      "Cook chicken until browned.",
      "Add vegetables and soy sauce.",
      "Stir fry until tender."
    ],
    image: "https://picsum.photos/seed/chicken/400/300",
    category: "Main Dish"
  },
  {
    id: 3,
    title: "Simple Omelette",
    ingredients: ["Egg", "Milk", "Cheese", "Salt", "Pepper", "Onion"],
    instructions: [
      "Whisk eggs and milk.",
      "Pour into a hot pan.",
      "Add cheese and folded over.",
      "Serve warm."
    ],
    image: "https://picsum.photos/seed/egg/400/300",
    category: "Breakfast"
  },
  {
    id: 4,
    title: "Greek Salad",
    ingredients: ["Tomato", "Cucumber", "Feta Cheese", "Olive Oil", "Oregano", "Onion"],
    instructions: [
      "Chop all vegetables.",
      "Mix in a large bowl.",
      "Top with feta and olive oil.",
      "Sprinkle oregano."
    ],
    image: "https://picsum.photos/seed/salad/400/300",
    category: "Salad"
  },
  {
    id: 5,
    title: "Garlic Butter Shrimp",
    ingredients: ["Shrimp", "Garlic", "Butter", "Lemon", "Parsley"],
    instructions: [
      "Sauté garlic in butter.",
      "Add shrimp and cook until pink.",
      "Squeeze lemon juice.",
      "Garnish with parsley."
    ],
    image: "https://picsum.photos/seed/shrimp/400/300",
    category: "Seafood"
  }
];

function App() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const addIngredient = () => {
    if (inputValue.trim() && !ingredients.includes(inputValue.trim())) {
      setIngredients([...ingredients, inputValue.trim()]);
      setInputValue('');
    }
  };

  const removeIngredient = (ing: string) => {
    setIngredients(ingredients.filter(item => item !== ing));
  };

  const filteredRecipes = useMemo(() => {
    if (ingredients.length === 0) return MOCK_RECIPES;
    return MOCK_RECIPES.filter(recipe => 
      recipe.ingredients.some(ing => 
        ingredients.some(myIng => ing.toLowerCase().includes(myIng.toLowerCase()))
      )
    );
  }, [ingredients]);

  return (
    <div className="app">
      <header className="header">
        <div className="container">
          <div className="logo">
            <span className="logo-icon">🥗</span>
            <h1>FridgeFeast</h1>
          </div>
          <p className="subtitle">Discover delicious meals from your available ingredients</p>
        </div>
      </header>

      <main className="container">
        <section className="ingredient-manager">
          <h2>My Ingredients</h2>
          <div className="input-group">
            <input 
              type="text" 
              placeholder="Enter an ingredient (e.g. Tomato, Chicken)" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addIngredient()}
            />
            <button className="btn btn-primary" onClick={addIngredient}>Add</button>
          </div>
          <div className="ingredient-list">
            {ingredients.map(ing => (
              <span key={ing} className="tag">
                {ing}
                <button onClick={() => removeIngredient(ing)} className="remove-tag">&times;</button>
              </span>
            ))}
          </div>
        </section>

        <section className="recipe-gallery">
          <div className="section-header">
            <h2>Recommended Recipes</h2>
            <span className="count">{filteredRecipes.length} recipes found</span>
          </div>
          <div className="recipe-grid">
            {filteredRecipes.map(recipe => (
              <div key={recipe.id} className="recipe-card" onClick={() => setSelectedRecipe(recipe)}>
                <div className="card-image">
                  <img src={recipe.image} alt={recipe.title} />
                  <span className="category-tag">{recipe.category}</span>
                </div>
                <div className="card-content">
                  <h3>{recipe.title}</h3>
                  <div className="match-info">
                    {recipe.ingredients.slice(0, 3).join(', ')}...
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {selectedRecipe && (
        <div className="modal-overlay" onClick={() => setSelectedRecipe(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedRecipe(null)}>&times;</button>
            <div className="modal-body">
              <img src={selectedRecipe.image} alt={selectedRecipe.title} className="modal-image" />
              <div className="modal-info">
                <h2>{selectedRecipe.title}</h2>
                <div className="ingredients-section">
                  <h3>Ingredients</h3>
                  <ul>
                    {selectedRecipe.ingredients.map((ing, i) => (
                      <li key={i}>{ing}</li>
                    ))}
                  </ul>
                </div>
                <div className="instructions-section">
                  <h3>Instructions</h3>
                  <ol>
                    {selectedRecipe.instructions.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="footer">
        <div className="container">
          <p>&copy; 2026 FridgeFeast. Find your next favorite meal.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
