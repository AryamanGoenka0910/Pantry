"use client";

import { View, Text } from 'react-native'
import { useState } from 'react';
import React from 'react'
import GetStartedButton from "./GetStartedButton";

const INGREDIENT_OPTIONS = [
  "Eggs",
  "Butter",
  "Milk",
  "Flour",
  "Sugar",
  "Salt",
  "Pepper",
  "Olive Oil",
  "Garlic",
  "Onion",
  "Tomatoes",
  "Cheese",
  "Spinach",
];

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  /**
   * Handle typing in the search box.
   * Filter the ingredient options based on the current input.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      setFilteredOptions([]);
      return;
    }

    // Filter from INGREDIENT_OPTIONS that start with or contain the typed text
    const results = INGREDIENT_OPTIONS.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredOptions(results);
  };

  /**
   * Add a selected ingredient to tags.
   * If the ingredient is already in the tag list, do nothing or handle duplicates.
   */
  const addTag = (ingredient: string) => {
    if (!tags.includes(ingredient)) {
      setTags([...tags, ingredient]);
    }
    // Clear the search input & options
    setSearchTerm("");
    setFilteredOptions([]);
  };

  /**
   * Remove a tag if user clicks on an 'x' or similar.
   */
  const removeTag = (ingredient: string) => {
    setTags(tags.filter((tag) => tag !== ingredient));
  };

  /**
   * If user presses Enter in the search box, add the first filtered option
   * or add an exact match if it exists.
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevents the default action of the Enter key press, which would typically submit a form
      // If there's a perfect match or any filtered option, pick the first one
      if (filteredOptions.length > 0) {
        addTag(filteredOptions[0]);
      } else if (searchTerm.trim() !== "") {
        // Potentially add a new custom ingredient if you allow that
        addTag(searchTerm.trim());
      }
    }
  };

  return (
    <>
      {/* Search Section */}
      <div className="flex items-center justify-center w-full"> 
        <div className="w-full max-w-2xl relative">
          <input
            type="text"
            className="border-2 border-gray-600 rounded-lg w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-teal-600 text-black bg-white"
            placeholder="Enter all of your ingredients..."
            value={searchTerm}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
      
          {/* Autocomplete dropdown */}
          {filteredOptions.length > 0 && (
            <ul className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              {filteredOptions.map((item, index) => (
                <li
                  key={index}
                  className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-black"
                  onClick={() => addTag(item)}
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      
        {/* Button Section */}
        <div
          className={`transition duration-1000 ease-in-out ${
            tags.length > 0 ? "opacity-100 ml-4" : "opacity-0 ml-0"
          }`}
        >
          {tags.length > 0 && (
            <div className="h-full flex items-center">
              <GetStartedButton />
            </div>
          )}
        </div>
      </div>
      
      {/* Tag List */}
      {tags.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <div
              key={tag}
              className="flex items-center bg-teal-100 text-teal-800 px-3 py-1 rounded-full"
            >
              <span className="mr-2">{tag}</span>
              <button
                onClick={() => removeTag(tag)}
                className="text-teal-600 hover:text-teal-900"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default SearchBar