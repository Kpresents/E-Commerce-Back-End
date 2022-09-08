const router = require('express').Router();
const res = require('express/lib/response');
const { Category, Product } = require('../../models');
const { update } = require('../../models/Product');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll(
  {
    include:{
      model: Product,
      attributes: ['product_name']
    }
  }
)
.then(categoryData => res.json(categoryData))
.catch(err => {
  console.log (err);
  res.status(500).json(err);
});
});

router.get('/:id', async (req, res) => {
  try{
    const categoryId = await Category.findByPk(req.params.id,{
      include: [{model:Product}],
    });
    if (!categoryId) {
      res.status(404).json ({message: 'No Category ID found'});
      return;
    }
    res.status (200).json(categoryId);
  } catch (err){
    res.status(200).json(err) ;
   }

  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/',async (req, res) => {
  // create a new category
  try{
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err){
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try{
    const UpdateCategory = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    res.json(UpdateCategory)
  }
  catch (err){
    res.status(400).json(err);
  }
  // update a category by its `id` value
});

router.delete('/:id', async (req, res) => {
  try {
    const categoryId = await Category.destroy({
      where: {id: req.params.id}
    });
    if (!categoryId){
      res.status(400).json ({message: 'No Category with this ID'});
      return;
    }
    res.status (200).json(categoryId);
  }catch (err){
    res.status(500).json(err);
  }
  // delete a category by its `id` value
});

module.exports = router;
