import requests
import re
import json
import keyManager

apiKey = keyManager.spoonacularKey

def searchRecipes(query):
  r = requests.get("https://api.spoonacular.com/recipes/complexSearch", 
  params={'instructionsRequired': True, 'addRecipeInformation': True, 'query': query, 'apiKey': apiKey})
  recipes = r.json()['results']
  #Makeshift hack to cut the summary sentences off after the sentence with the serving price
  for recipe in recipes: 
    sentences = recipe['summary'].split('.')
    for line in enumerate(sentences):
      if(line[1].find("per serving") != -1):
        sentences = sentences[0:line[0]+1]
        sentences[-1] = sentences[-1] + "."
        recipe['summary'] = ".".join(sentences)
        recipe['summary'] = re.sub('<[^>]*>', '', recipe['summary'])
        break
  return recipes

def getRecipeInformation(recipe_id):
  r = requests.get(f"https://api.spoonacular.com/recipes/{recipe_id}/information", 
  params={'id': recipe_id, 'apiKey': apiKey})
  recipe = r.json()
  sentences = recipe['summary'].split('.')
  for line in enumerate(sentences):
    if(line[1].find("per serving") != -1):
      sentences = sentences[0:line[0]+1]
      sentences[-1] = sentences[-1] + "."
      recipe['summary'] = ".".join(sentences)
      recipe['summary'] = re.sub('<[^>]*>', '', recipe['summary'])
      break
  return recipe


