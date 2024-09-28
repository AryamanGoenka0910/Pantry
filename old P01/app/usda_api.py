import keyManager
import requests
api_key = keyManager.usdaKey
def searchFood(query):
  r = requests.get("https://api.nal.usda.gov/fdc/v1/foods/search", 
  params={'api_key': api_key, 'query': query, 'pageSize': 1})
  foods = r.json()['foods']
  #Makeshift hack to cut the summary sentences off after the sentence with the serving price
  if foods:
    
    return foods[0]['foodNutrients']
  
  return None


