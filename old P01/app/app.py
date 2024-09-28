'''
Mango: Aryaman Goenka, Sadid Ethun, Haotian Gan
Softdev
P00: ArRESTed Development
2021-12-12
'''
import os
import re
import sqlite3
from weakref import KeyedRef
import db_builder
from flask import Flask, render_template, request, session, redirect, url_for
import json
import requests
import random
import recipes
import base64
import usda_api
app = Flask(__name__)
app.secret_key = 'Mango'

import keyManager
print("Yelp Key = ", keyManager.yelpKey)
print("USDA Key = ", keyManager.usdaKey)
print("Spoonacular Key = ", keyManager.spoonacularKey)



# Utility function to check if there is a session
def logged_in():
    return session.get('username') is not None

@app.route('/', methods=['GET', 'POST'])
def landing():
    # Check for session existence
    #db_builder.dbsetup()
    if logged_in():
      username = session['username']
      user_id = db_builder.get_id_from_username(username)
      templateArgs = {
          "user_id": user_id,
          "username": session.get('username'),
          "user_info": db_builder.get_user_info(user_id),
          "db_builder": db_builder,
      }
      return render_template('home.html', **templateArgs)
    else:
      # If not logged in, show login page
      return render_template('intro.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    method = request.method
    # Check for session existance
    if method == 'GET':
      if logged_in():
        return redirect(url_for('landing'))
      else:
        # If not logged in, show login page
        return render_template('login.html', error=False)

    if method == 'POST':

      # Get information from request.form since it is submitted via post
      username = request.form['username']
      password = request.form['password']
      error = db_builder.login(username, password)

    if error:
        # If incorrect, give feedback to the user
        return render_template('login.html', error=error)
    else:
        # Store user info into a cookie
        session['username'] = username
        return redirect(url_for('landing'))


@app.route('/register', methods=['GET','POST'])
def register():
    method = request.method
    # Check for session existence
    if method == "GET":
        if logged_in():

            return redirect(url_for('landing'))
        else:
            # If not logged in, show regsiter page
            return render_template('register.html', error_message="")

    if method == "POST":
        new_username = request.form["new_username"]
        new_password = request.form["new_password"]
        confirm_password = request.form["confirm_password"]

        error_message = ""
        if not new_username:
            error_message = "Error: No username entered!"
        elif not new_password:
            error_message = "Error: No password entered!"
        elif confirm_password != new_password:
            error_message = "Error: Passwords do not match!"

        if error_message:
            return render_template("register.html", error_message=error_message)

        error_message = db_builder.signup(new_username, new_password)

        if error_message:
            return render_template("register.html", error_message=error_message)
        else:
            session['username'] = new_username
            return redirect(url_for('landing'))

@app.route('/logout', methods=['GET', 'POST'])
def logout():

    # Once again check for a key before popping it
    if logged_in():
        session.pop('username')

    # After logout, return to login page
    return redirect(url_for('landing'))


####BLOG FUNCTIONS#####
#######################


@app.route('/user/<string:username>/user_profile', methods=['GET'])
def display_user_profile(username):
    if not logged_in:
        return redirect(url_for('landing'))
    user_id = db_builder.get_id_from_username(username)
    templateArgs = {
        
        "user_personal_info": db_builder.get_user_info(user_id),
        "username": username,
        "user_id": user_id,
        "viewing_username": session.get('username')
        
    }
    
    return render_template("edit_profile.html", **templateArgs)

@app.route('/user/<string:username>/saved_restaurants', methods=['GET'])
def display_user_favoriteRestaurants(username):
    if not logged_in:
        return redirect(url_for('landing'))
    user_id = db_builder.get_id_from_username(username)
    templateArgs = {
        "favorite_restaurants" : db_builder.get_favorite_restaurant(user_id, 0, 50),
        "user_personal_info": db_builder.get_user_info(user_id),
        "user_post_count": db_builder.get_user_post_count(user_id),
        "user_favorite_recipe_count": db_builder.get_favorite_recipe_count(user_id),
        "user_favorite_restaurant_count": db_builder.get_favorite_restaurant_count(user_id),
        "username": username,
        "user_id": user_id,
        "lookingAtOwnBlog": session.get('username') == username,
        "viewing_username": session.get('username')
    }
    
    return render_template("favorite_restaurants.html", **templateArgs)

@app.route('/user/<string:username>/saved_recipes', methods=['GET'])
def display_user_favoriteRecipes(username):
    if not logged_in:
        return redirect(url_for('landing'))
    user_id = db_builder.get_id_from_username(username)
    templateArgs = {
        "favorite_recipes" : db_builder.get_favorite_recipes(user_id, 0, 50),
        "user_personal_info": db_builder.get_user_info(user_id),
        "user_post_count": db_builder.get_user_post_count(user_id),
        "user_favorite_recipe_count": db_builder.get_favorite_recipe_count(user_id),
        "user_favorite_restaurant_count": db_builder.get_favorite_restaurant_count(user_id),
        "username": username,
        "user_id": user_id,
        "lookingAtOwnBlog": session.get('username') == username,
        "viewing_username": session.get('username')
    }
    
    return render_template("favorite_recipes.html", **templateArgs)

@app.route('/user/<string:username>/user_posts', methods=['GET'])
def display_user_posts(username):
    if not logged_in:
        return redirect(url_for('landing'))
    user_id = db_builder.get_id_from_username(username)
    
    templateArgs = {
        "print": print,
        "openModalOnLoad": request.args.get('openModalOnLoad', None),
        "db_builder": db_builder,
        "user_posts" : db_builder.get_posts(user_id, 0, 50),
        "user_personal_info": db_builder.get_user_info(user_id),
        "user_post_count": db_builder.get_user_post_count(user_id),
        "user_favorite_recipe_count": db_builder.get_favorite_recipe_count(user_id),
        "user_favorite_restaurant_count": db_builder.get_favorite_restaurant_count(user_id),
        "username": username,
        "user_id": user_id,
        "lookingAtOwnBlog": session.get('username') == username,
        "viewer_user_id": db_builder.get_id_from_username(session.get('username')),
        "viewing_username": session.get('username')
    }
   
    
    return render_template("user_posts.html", **templateArgs)

@app.route('/api/update_user_info', methods=['POST'])
def update_user_info():
    if not logged_in(): 
        return redirect(url_for('landing'))
    user_id = db_builder.get_id_from_username(session.get('username'))
    username = session.get('username')
    bio = request.form.get('bio', "")
    display_name = request.form.get('display_name', "")
    original = db_builder.get_user_info(user_id)
    db_builder.update_user_info(user_id, original['preferred_cuisines'], original['diet'], original['intolerances'], display_name, bio, original['profile_picture'])
    return redirect(f"/user/{username}/saved_recipes")

@app.route('/api/make_comment', methods=['POST'])
def make_comment():
    if not logged_in(): 
        return redirect(url_for('landing'))
    user_id = db_builder.get_id_from_username(session.get('username'))
    db_builder.create_comment(user_id, request.json['post_id'], request.json['comment'])
    #print((user_id, request.json['post_id'], request.json['comment']))
    return {
        "successful": True
    }

@app.route('/api/delete_comment', methods=['POST'])
def delete_comment():
    if not logged_in(): 
        return redirect(url_for('landing'))
    user_id = db_builder.get_id_from_username(session.get('username'))
    db_builder.delete_comment(user_id, request.json['comment_id'])
    return {
        "successful": True
    }
    
    
    
    
@app.route('/api/update_user_profile_picture', methods=['POST'])
def update_user_profile_picture():
    if not logged_in(): 
        return redirect(url_for('landing'))
    user_id = db_builder.get_id_from_username(session.get('username'))
    username = session.get('username')
    image_link = request.files.get('profile_picture') #Not actually a link. This is actually a file. 
    image_string = base64.b64encode(image_link.read()).decode('ascii')
    original = db_builder.get_user_info(user_id)
    db_builder.update_user_info(user_id, original['preferred_cuisines'], original['diet'], original['intolerances'], original['display_name'], original['bio'], f"data:{image_link.mimetype};base64,{str(image_string)}")
    return redirect(f"/user/{username}/saved_recipes")

@app.route('/api/make_post', methods=['POST'])
def make_post():
    if not logged_in():
        return redirect(url_for('landing'))
    user_id = db_builder.get_id_from_username(session.get('username'))
    username = session.get("username")
    image_link = request.files.get('image_link') #Not actually a link. This is actually a file. 
    image_string = base64.b64encode(image_link.read()).decode('ascii')
    
    post_description = request.form.get("post_description")
    
    db_builder.create_post(user_id, None, f"data:{image_link.mimetype};base64,{str(image_string)}", post_description)
    return redirect(f"/user/{username}/user_posts")

@app.route('/api/delete_post', methods=['POST'])
def delete_post():
    if not logged_in():
        return redirect(url_for('landing'))
    username = session.get('username')
    user_id = db_builder.get_id_from_username(username)
    post_id = request.form.get('post_id')
    db_builder.delete_post(user_id, post_id)
    return redirect(f'/user/{username}/user_posts')

@app.route('/api/is_post_favorited', methods=['POST'])
def is_post_favorited():
    #print(request.json)
    user_id = request.json['user_id']
    post_id = request.json['post_id']
    return {
        'favorited': db_builder.is_post_favorited(user_id, post_id)
    }

@app.route('/api/is_recipe_favorited', methods=['POST'])
def is_recipe_favorited():
    user_id = request.json['user_id']
    recipe_id = request.json['recipe_id']
    return {
        'favorited': db_builder.is_recipe_favorited(user_id, recipe_id)
    }

@app.route('/api/favorite_recipe', methods=['POST'])
def favorite_recipe():
    #print(request.data)
    user_id = request.json['user_id']
    recipe_id = request.json['recipe_id']
    db_builder.favorite_recipe(user_id, recipe_id, recipes.getRecipeInformation(recipe_id))
    return {"message": "Successfully favorited recipe"}
    

@app.route('/api/unfavorite_recipe', methods=['POST'])
def unfavorite_recipe():
    #print(request.data)
    user_id = request.json['user_id']
    recipe_id = request.json['recipe_id']
    db_builder.unfavorite_recipe(user_id, recipe_id)
    return {"message": "Successfully unfavorited recipe"}

### Restaurants
def get_restaurantJSON_by_id(restaurant_id):
  my_headers = {'Authorization' : f'Bearer {keyManager.yelpKey}'}
  r = requests.get(f'https://api.yelp.com/v3/businesses/{restaurant_id}', headers=my_headers)
  return r.json()

@app.route('/api/is_restaurant_favorited', methods=['POST'])
def is_restaurant_favorited():
    user_id = request.json['user_id']
    restaurant_id = request.json['restaurant_id']
    return {
        'favorited': db_builder.is_restaurant_favorited(user_id, restaurant_id)
    }

@app.route('/api/favorite_restaurant', methods=['POST'])
def favorite_restaurant():
    #print(request.data)
    user_id = request.json['user_id']
    restaurant_id = request.json['restaurant_id']
    db_builder.favorite_restaurant(user_id, restaurant_id, get_restaurantJSON_by_id(restaurant_id))
    return {"message": "Successfully favorited restaurant"}
    

@app.route('/api/unfavorite_restaurant', methods=['POST'])
def unfavorite_restaurant():
    print(request.data)
    user_id = request.json['user_id']
    restaurant_id = request.json['restaurant_id']
    db_builder.unfavorite_restaurant(user_id, restaurant_id)
    return {"message": "Successfully unfavorited restaurant"}

  
####API FUNCTIONS#####
#######################

@app.route('/recipe/<int:recipe_id>', methods=['GET'])
def recipe_page(recipe_id):
    login = False
    recipe = recipes.getRecipeInformation(recipe_id)
    if logged_in():
        login = True
        templateArgs = {
        'usda_api': usda_api,
        'recipe': recipe,
        'username': session.get('username'),
        'user_id': db_builder.get_id_from_username(session.get('username'))
        }
    else:
        login = False
        templateArgs = {
        'usda_api': usda_api,
        'recipe': recipe
    }
    return render_template('recipe_page.html', **templateArgs, logged_in=login)
    

 

@app.route('/restaurants', methods=['GET', 'POST'])
def restaurant():
    
    login = False
    if logged_in():
        login = True
    else:
        login = False

    random_cats = ['pizza', 'indpak', 'japanese', 'chinese', 'vegan', 'restuarants']
    x = random.randrange(0,5)

    my_headers = {'Authorization' : f'Bearer {keyManager.yelpKey}'}
    r = requests.get(f'https://api.yelp.com/v3/businesses/search?location=NYC&categories={random_cats[x]}', headers=my_headers)
    
    if logged_in():
        return render_template('restaurants.html', data=r.json()['businesses'], logged_in=login, username=session.get('username'), user_id=db_builder.get_id_from_username(session.get('username')))
    else: 
        return render_template('restaurants.html', data=r.json()['businesses'], logged_in=login)
    

@app.route('/restaurants/search', methods=['GET', 'POST'])
def restaurants_search():
    
    login = False
    if logged_in():
        login = True
    else:
        login = False
    
    my_headers = {'Authorization' : f'Bearer {keyManager.yelpKey}'}
    method = request.method


    if method == 'GET':
        keyword = request.args['keyword']
        new_location = request.args['location']
        cuisine = request.args['cuisine']
    
        #r = requests.get(f'https://api.yelp.com/v3/businesses/search?location=NYC&categories=restuarants', headers=my_headers)
        #return render_template('restaurants.html', data=r.json()['businesses'], logged_in=login)
    if method == 'POST':
        keyword = request.form['keyword']
        new_location = request.form['location']
        cuisine = request.form['cuisine']
    
    new_location = new_location.lower()
    if cuisine == "All Cuisines":
        cuisine = 'restaurants'
    else:
        cuisine = cuisine.lower()

    #r = requests.get(f"https://api.yelp.com/v3/businesses/search?location=NYC&categories=restuarants&term={s}", headers=my_headers)
    #r = requests.get(f"https://api.yelp.com/v3/businesses/search?location=NYC&categories={cuisine}", headers=my_headers)
    #return render_template('restaurants.html', data=r.json()['businesses'], logged_in=login) 
    username = session.get('username')
    user_id = db_builder.get_id_from_username(username)
    if new_location == "" and keyword == "":
        r = requests.get(f"https://api.yelp.com/v3/businesses/search?location=NYC&categories={cuisine}", headers=my_headers)
        return render_template('restaurants.html', data=r.json()['businesses'], logged_in=login, username=username, user_id=user_id) 
    elif new_location != "" and keyword != "":
        r = requests.get(f"https://api.yelp.com/v3/businesses/search?location={new_location}&categories=restaurants&term={keyword}", headers=my_headers)
        return render_template('restaurants.html', data=r.json()['businesses'], logged_in=login, username=username, user_id=user_id) 
    elif new_location != "" and keyword == "":
        r = requests.get(f"https://api.yelp.com/v3/businesses/search?location={new_location}&categories={cuisine}", headers=my_headers)
        return render_template('restaurants.html', data=r.json()['businesses'], logged_in=login, username=username, user_id=user_id) 
    elif keyword != "" and new_location == "":
        r = requests.get(f"https://api.yelp.com/v3/businesses/search?location=NYC&categories=restaurants&term={keyword}", headers=my_headers)
        return render_template('restaurants.html', data=r.json()['businesses'], logged_in=login, username=username, user_id=user_id) 
    else:
        return ""

@app.route('/restaurants/view', methods=['GET', 'POST'])
def restaurants_view():
    login = False
    if logged_in():
        login = True
    else:
        login = False
    i = request.args.get('id')
    my_headers = {'Authorization' : f'Bearer {keyManager.yelpKey}'}
    r = requests.get(f"https://api.yelp.com/v3/businesses/{i}", headers=my_headers)
    hours = r.json()['hours']
    #open = False
    #if r.json()['hours']['is_open_now'] == 'true':
        #open = True
    #print(hours)
    return render_template('restaurant_page.html', res=r.json(), hours=hours, open=open, logged_in=login, username=session.get('username'), user_id=db_builder.get_id_from_username(session.get('username')))

@app.route('/recipes/search', methods=['GET', 'POST'])
def recipes_search():
    login = False
    if logged_in():
        login = True
    else:
        login = False

    if login:    
        user_id = db_builder.get_id_from_username(session.get("username"))
        if(request.method == 'GET'):
            return render_template('recipes.html', user_id=user_id, username=session.get("username"), logged_in=login)
        if(request.method == 'POST'):
            query = request.form.get("search")
            return render_template('recipes.html', recipes=recipes.searchRecipes(query), logged_in=login,
            user_id=user_id, username=session.get("username"))
    else:
        if(request.method == 'GET'):
            return render_template('recipes.html')
        if(request.method == 'POST'):
            query = request.form.get("search")
            return render_template('recipes.html', recipes=recipes.searchRecipes(query))

if __name__ == '__main__':
    app.debug = True
    app.run()