var express = require('express');
var router = express.Router();

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

module.exports = router;
