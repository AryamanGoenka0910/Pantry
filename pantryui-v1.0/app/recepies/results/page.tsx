import React from "react";

const RecipeUI = () => {
  return (
    <div className="p-6">
      {/* Header Section */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b pt-40 pb-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Delicious Pasta Carbonara</h1>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="bg-purple-200 text-purple-800 px-3 py-1 rounded-full text-sm">Italian</span>
            <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm">Quick & Easy</span>
            <span className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm">30 Minutes</span>
          </div>
        </div>
        <button className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700">
          Save Recipe
        </button>
      </header>

      {/* Tabs for Steps */}
      <nav className="flex gap-6 border-b mb-6">
        <button className="text-blue-600 border-b-2 border-blue-600 px-2 py-1 font-medium">Ingredients</button>
        <button className="text-gray-600 hover:text-blue-600 px-2 py-1 font-medium">Preparation</button>
        <button className="text-gray-600 hover:text-blue-600 px-2 py-1 font-medium">Serving</button>
      </nav>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Ingredients</h2>
          <ul className="space-y-2 text-gray-700">
            <li>• 200g of spaghetti</li>
            <li>• 100g pancetta</li>
            <li>• 2 large eggs</li>
            <li>• 50g Parmesan cheese</li>
            <li>• Salt and black pepper</li>
          </ul>
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Preparation</h2>
          <p className="text-gray-700">
            Cook the spaghetti in a large pot of salted water. While the pasta cooks, fry the pancetta in a pan
            until crispy. Beat the eggs and mix with grated Parmesan. Combine everything and enjoy!
          </p>
        </div>

        {/* Right Column */}
        <div>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img
              src="https://via.placeholder.com/400x300?text=Pasta+Carbonara"
              alt="Recipe"
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="mt-4 flex justify-between items-center">
            <button className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300">Replace</button>
            <button className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300">Remove</button>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="flex justify-between items-center mt-8 border-t pt-4">
        <button className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300">Modify Recipe</button>
        <div>
          <span className="text-lg font-bold">Calories:</span> 600 kcal
        </div>
        <button className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700">
          Add to Favorites
        </button>
      </footer>
    </div>
  );
};

export default RecipeUI;
