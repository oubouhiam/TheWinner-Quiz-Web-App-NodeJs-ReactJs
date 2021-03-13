module.exports = function(app) {
  var categories = require('../Controllers/category_controller.js');

//______________________get all category_____________________ 
app.get('/Category', categories.Category);

// ______________________get category by id__________________
app.get('/Category/:id', categories.Category);

//__________________________add category____________________
app.post('/Category/add', categories.createcategorie);

//________________________updating category____________________
app.put('/category/update/:id', categories.updatecategorie);

//___________________________delete Category______________________
app.delete('/category/delete/:id', categories.deletecategorie);
}