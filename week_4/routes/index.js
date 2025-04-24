var express = require('express');
var fetch = require('node-fetch')
const { response } = require('../app');
var router = express.Router();
const bodypareser = require('body-parser');

/* GET home page. */
router.get('/', function(req, res, next) {
  async function getRecipe(url= '') {
    const response = await fetch(url)
    return response.json()
  }

  getRecipe('http://localhost:3000/recipe/pizza')
    .then(json => {
      res.render('index', {title: 'Recipe API',
      name: json.name,
      instructions: json.instructions,
      ingredients: json.ingredients})
  })
})

function addIngredient(){
  console.log('add ingredient')

}






router.post('/recipe/', function(req, res, next) {
  
  
  
})

module.exports = router;
