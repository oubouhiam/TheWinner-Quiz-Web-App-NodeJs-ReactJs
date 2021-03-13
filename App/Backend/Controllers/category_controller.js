//__________________CALL MODEL____________________
const Category = require('../models/category.model.js');

//______________________get all category_____________________ 
exports.Category = (req, res) => {
    Category.find()
    .then(categoryInfos => {
          res.status(200).json(categoryInfos);
        }).catch(error => {
          console.log(error);
          res.status(500).json({
              message: "Error!",
              error: error
          });
        });
};
// ______________________get category by id__________________
exports.getCategory = (req, res) => {
    Category.findById(req.params.id)
        .then(Category => {
          res.status(200).json(Category);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Category not found with id " + req.params.id,
                    error: err
                });                
            }
            return res.status(500).send({
                message: "Error retrieving Category with id " + req.params.id,
                error: err
            });
        });
};

//__________________________add category____________________
exports.createcategorie = (req, res) => {
    const category = new Category({
        nameCategory: req.body.nameCategory
                        });
    //Save
    category.save().then(data => {
                    res.status(200).json(data);
                }).catch(err => {
                    res.status(500).json({
                      message: "Fail!",
                      error: err.message
                    });
                });
};

//________________________updating category____________________
exports.updatecategorie = (req, res) => {
    // Find categorie By ID and update it
    Category.updateOne(
                     {_id: req.params.id},
                      {
                        nameCategory: req.body.nameCategory
                      }
                    )
    .then(() => res.status(201).json("Category updated successfully"))
    .catch((err) => res.status(400).json("Error :" + err));
};

//___________________________delete Category______________________
exports.deletecategorie = (req, res) => {
    const {id} = req.params;
    Category.findOneAndDelete({_id: id})
        .then(categorie => {
            if(!categorie) {
              res.status(404).json({
                message: "Does Not exist a categorie with id = " + categorieId,
                error: "404",
              });
            }
            res.status(200).json({});
        }).catch(err => {
            return res.status(500).send({
              message: "Error -> Can NOT delete a categorie with id = " + categorieId,
              error: err.message
            });
        });
};