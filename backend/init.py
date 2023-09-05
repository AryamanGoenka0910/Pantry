import os
script_dir = os.path.dirname(__file__) #<-- absolute dir the script is in
spoonacularKey_path = os.path.join(script_dir, "keys/Spoonacular.txt")
spoonacularKey = open(spoonacularKey_path, "r").read().strip()
