import os
script_dir = os.path.dirname(__file__) #<-- absolute dir the script is in
spoonacularKey_path = os.path.join(script_dir, "keys/key_Spoonacular.txt")
usdaKey_path = os.path.join(script_dir, "keys/key_USDA.txt")
yelpKey_path = os.path.join(script_dir, "keys/key_yelp.txt")

spoonacularKey = open(spoonacularKey_path, "r").read().strip()
usdaKey = open(usdaKey_path, "r").read().strip()
yelpKey = open(yelpKey_path, "r").read().strip()