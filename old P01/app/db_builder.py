'''
Mango: Aryaman Goenka, Sadid Ethun, Haotian Gan
Softdev
P01: ArRESTed Development
2021-12-12
'''

import sqlite3   
import random 
import json

DB_FILE="Mangos.db"
db = sqlite3.connect(DB_FILE, check_same_thread=False)

def dbsetup():
  c = db.cursor()               #facilitate db ops -- you will use cursor to trigger db events

  # run SQL statement

  # User Personal Info Table:
  ## preferredCuisines, and intolerances are lists. Diet is a single string.
    ### intolerances are things that the user cannot eat (i.e soy, egg, diary)
    ### we'll use this data to filter search results
  ## Supported cuisines are: https://spoonacular.com/food-api/docs#Cuisines
  ## Supported intolerances are: https://spoonacular.com/food-api/docs#Intolerances
  ## Supported diets are on the spoonacular api docs

  
  command = "CREATE TABLE IF NOT EXISTS user (user_id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)"
  c.execute(command)      # test SQL stmt in sqlite3 shell, save as string

  command = "CREATE TABLE IF NOT EXISTS user_personal_info (user_id INTEGER PRIMARY KEY NOT NULL, preferred_cuisines TEXT DEFAULT '[]', diet TEXT DEFAULT '', intolerances TEXT DEFAULT '[]', display_name TEXT DEFAULT '', bio TEXT DEFAULT '', profile_picture TEXT DEFAULT '/static/images/defaultProfile.jpg')"
  c.execute(command) 

  # User Favorite Resturants:
    # To do

  # User Favorite Recipes: 
    # Recipes can be organized into their own folders, just like songs on spotify. 
  command = "CREATE TABLE IF NOT EXISTS user_favorite_recipe (user_id INTEGER NOT NULL, recipe_id INTEGER, spoonacularRecipeJSON TEXT)"
  c.execute(command) 

  

  # User Recipe Folders:
    # This is used to keep track of how many folders a user has
  command = "CREATE TABLE IF NOT EXISTS user_folder (user_id INTEGER NOT NULL, folder TEXT)"
  c.execute(command) 

  # User Favorite Posts:
  command = "CREATE TABLE IF NOT EXISTS user_favorite_post (user_id INTEGER NOT NULL, post_id INTEGER)"
  c.execute(command) 

  # User Posts:
  command = "CREATE TABLE IF NOT EXISTS user_post (post_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, user_id INTEGER NOT NULL, recipe_id INTEGER, image_link TEXT, post_description TEXT)"
  c.execute(command) 

  command = "CREATE TABLE IF NOT EXISTS user_favorite_restaurant (user_id INTEGER, restaurant_id TEXT NOT NULL, restaurantJSON TEXT)"
  c.execute(command)

  # Post Comments:
  command = "CREATE TABLE IF NOT EXISTS user_comment (comment_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, user_id INTEGER NOT NULL, post_id INTEGER NOT NULL, comment TEXT)"
  c.execute(command) 
  db.commit() #save changes

dbsetup()

# Authorization, username, and user_id functions
##

# Adds to the user database if the username is availible
# Returns an error message to display if there was an issue or an empty string otherwise
def signup(username, password):
  c = db.cursor()

  c.execute("""SELECT username FROM user WHERE username=?""",[username])
  result = c.fetchone()

  if result:
      return "Error: Username already exists"

  else:
      c.execute('INSERT INTO user VALUES (null, ?, ?)', (username, password))
      
      db.commit()
      # Uses empty quotes since it will return false when checked as a boolean
      return  ""

# Tries to check if the username and password are valid
def login(username, password):
  c = db.cursor()

  c.execute("""SELECT username FROM user WHERE username=? AND password=?""",[username, password])
  result = c.fetchone()

  if result:
      ##access this specifc user data
      return False

  else:
      return True

def create_post(user_id, recipe_id, image_link, post_description):
  c = db.cursor()
  c.execute("INSERT INTO user_post VALUES(null, ?, ?, ?, ?)", (user_id, recipe_id, image_link, post_description))
  db.commit()

def update_post(post_id, recipe_id, image_link, post_description):
  c = db.cursor()
  c.execute(f'UPDATE user_post SET recipe_id = ?, post_description = ?, image_link = ? where post_id == ?', (recipe_id, image_link, post_description, post_id))
  db.commit()
  
def delete_post(user_id, post_id):
  c = db.cursor()
  c.execute(f'DELETE FROM user_post where user_id == ? and post_id == ?', (user_id, post_id))
  c.execute(f'DELETE FROM user_comment where post_id == ?', [post_id])
  db.commit()

def get_posts(user_id, offset, limit):
    """Returns a list of posts"""
    c = db.cursor()
    result = list(c.execute(f'SELECT post_id, user_id, recipe_id, image_link, post_description FROM user_post WHERE user_id == ? order by post_id DESC limit ? offset ? ', (user_id, limit, offset)))
    return [{
        "post_id": post_id,
        "user_id": user_id,
        "recipe_id": recipe_id,
        "image_link": image_link,
        "post_description": post_description,
    } for (post_id, user_id, recipe_id, image_link, post_description) in result] #all the entries of a user

def favorite_post(user_id, post_id):
  c = db.cursor()
  c.execute("INSERT INTO user_favorite_post VALUES(null, ?, ?)", (user_id, post_id))
  db.commit()

def unfavorite_post(user_id, post_id):
  c = db.cursor()
  c.execute("DELETE FROM user_favorite_post where user_id = ? and post_id = ?", (user_id, post_id))
  db.commit()

def is_post_favorited(user_id, post_id):
  c = db.cursor()
  c.execute("SELECT * FROM user_favorite_post where user_id = ? and post_id = ?", (user_id, post_id))
  if c.fetchone():
    return True
  else:
    return False

def favorite_recipe(user_id, recipe_id, spoonacularRecipeJSON):
  user_id = int(user_id)
  recipe_id = int(recipe_id)
  spoonacularRecipeJSON = json.dumps(spoonacularRecipeJSON)
  c = db.cursor()
  c.execute("INSERT INTO user_favorite_recipe VALUES(?, ?, ?)", (user_id, recipe_id, spoonacularRecipeJSON))
  db.commit()

def get_favorite_recipes(user_id, offset, limit):
    
    c = db.cursor()
    result = list(c.execute(f'SELECT user_id, recipe_id, spoonacularRecipeJSON FROM user_favorite_recipe WHERE user_id == ? order by rowid DESC limit ? offset ? ', (user_id, limit, offset)))
    return [{
        "user_id": user_id,
        "recipe_id": recipe_id,
        "spoonacularRecipeJSON": json.loads(spoonacularRecipeJSON),
    } for (user_id, recipe_id, spoonacularRecipeJSON) in result] #all the entries of a user

def unfavorite_recipe(user_id, recipe_id):
  c = db.cursor()
  c.execute("DELETE FROM user_favorite_recipe where user_id = ? and recipe_id = ?", (user_id, recipe_id))
  db.commit()

def is_recipe_favorited(user_id, post_id):
  c = db.cursor()
  c.execute("SELECT * FROM user_favorite_recipe where user_id = ? and recipe_id = ?", (user_id, post_id))
  if c.fetchone():
    return True
  else:
    return False

#Favorite Restaurants
def favorite_restaurant(user_id, restaurant_id, restaurantJSON):
  restaurantJSON = json.dumps(restaurantJSON)
  c = db.cursor()
  c.execute("INSERT INTO user_favorite_restaurant VALUES(?, ?, ?)", (user_id, restaurant_id, restaurantJSON))
  db.commit()

def get_favorite_restaurant(user_id, offset, limit):
    c = db.cursor()
    result = list(c.execute(f'SELECT user_id, restaurant_id, restaurantJSON FROM user_favorite_restaurant WHERE user_id == ? order by rowid DESC limit ? offset ? ', (user_id, limit, offset)))
    return [{
        "user_id": user_id,
        "restaurant_id": restaurant_id,
        "restaurantJSON": json.loads(restaurantJSON),
    } for (user_id, restaurant_id, restaurantJSON) in result] #all the entries of a user

def unfavorite_restaurant(user_id, restaurant_id):
  c = db.cursor()
  c.execute("DELETE FROM user_favorite_restaurant where user_id = ? and restaurant_id = ?", (user_id, restaurant_id))
  db.commit()

def is_restaurant_favorited(user_id, restaurant_id):
  c = db.cursor()
  c.execute("SELECT * FROM user_favorite_restaurant where user_id = ? and restaurant_id = ?", (user_id, restaurant_id))
  if c.fetchone():
    return True
  else:
    return False
  

def create_comment(user_id, post_id, comment):
  c = db.cursor()
  c.execute("INSERT INTO user_comment VALUES(null, ?, ?, ?)", (user_id, post_id, comment))
  db.commit()
  
def delete_comment(user_id, comment_id):
  c = db.cursor()
  c.execute('DELETE FROM user_comment where comment_id == ?', [comment_id])
  db.commit()

def get_comments(post_id, offset, limit):
    
    c = db.cursor()
    result = list(c.execute(f'SELECT comment_id, user_id, post_id, comment FROM user_comment WHERE post_id == ? order by comment_id limit ? offset ? ', (post_id, limit, offset)))
    return [{
        "comment_id": comment_id,
        "user_id": user_id,
        "post_id": post_id,
        "comment": comment,
    } for (comment_id, user_id, post_id, comment) in result] #all the entries of a user

def get_favorite_recipe_count(user_id):
  c = db.cursor()
  return len(list(c.execute("SELECT * FROM user_favorite_recipe WHERE user_id = ?", [user_id])))

def get_user_post_count(user_id):
  c = db.cursor()
  return len(list(c.execute("SELECT * FROM user_post WHERE user_id = ?", [user_id])))

def get_favorite_restaurant_count(user_id):
  c = db.cursor()
  return len(list(c.execute("SELECT * FROM user_favorite_restaurant WHERE user_id = ?", [user_id])))


def create_user_info(user_id):
  c = db.cursor()
  c.execute("INSERT INTO user_personal_info VALUES(?, ?, ?, ?, ?, ?, ?)", (user_id, "[]", "", "[]", "", "", "/static/images/defaultProfile.jpg"))
  db.commit()
  
def update_user_info(user_id, preferred_cuisines, diet, intolerances, display_name, bio, profile_picture):
  c = db.cursor()
  preferred_cuisines = json.dumps(preferred_cuisines)
  intolerances = json.dumps(intolerances)
  c.execute("UPDATE user_personal_info SET preferred_cuisines = ?, diet = ?, intolerances = ?, display_name = ?, bio = ?, profile_picture = ? WHERE user_id = ?", (preferred_cuisines, diet, intolerances, display_name, bio, profile_picture, user_id))
  db.commit()

def get_user_info(user_id): 
  c = db.cursor()
  c.execute("SELECT user_id, preferred_cuisines, diet, intolerances, display_name, bio, profile_picture FROM user_personal_info WHERE user_id = ?", [user_id])
  result = c.fetchone()
  if(not result):
    create_user_info(user_id)
    c = db.cursor()
    c.execute("SELECT user_id, preferred_cuisines, diet, intolerances, display_name, bio, profile_picture FROM user_personal_info WHERE user_id = ?", [user_id])
    result = c.fetchone()
  
  return {
        "user_id": user_id,
        "preferred_cuisines": json.loads(result[1]),
        "diet": result[2],
        "intolerances": json.loads(result[3]),
        "display_name": result[4],
        "bio": result[5],
        "profile_picture": result[6]
    } 

def get_id_from_username(username): 
  c = db.cursor()
  c.execute("SELECT user_id FROM user where username = ?", [username])
  return c.fetchone()[0]

def get_username_from_id(user_id): 
  c = db.cursor()
  c.execute("SELECT username FROM user where user_id = ?", [user_id])
  return c.fetchone()[0]

def get_random_users(count):
    c = db.cursor()
    rows = list(c.execute('SELECT COUNT(*) FROM user'))[0][0] #length of users table
    population_count = count if rows >= count else rows
    user_ids = random.sample(range(1,rows+1), population_count) #takes 10 distinct random users
    usernames = [get_username_from_id(user_id) for user_id in user_ids]
    return [
        {
            'username': username,
            'user_id': user_id
        } 
    for (username, user_id) in zip(usernames, user_ids)]

def get_random_posts(count):
    c = db.cursor()
    results = list(c.execute("SELECT * FROM user_post"))
    sample_size = count if count < len(results) else len(results)
    results = random.sample(results, sample_size)
    return [{
        'post_id': post_id,
        'user_id': user_id,
        'recipe_id': recipe_id,
        'image_link': image_link,
        'post_description': post_description
      } for (post_id, user_id, recipe_id, image_link, post_description) in results]
  