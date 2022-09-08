const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const ProductData = await Tag.findAll({
      include: [{ model: Product}],
    });
    res.status(200).json(ProductData);
  }
  catch (err){
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const ProductData= await Tag.findByPk(req.params.id,{
      include: [{ model: Product}],
    });
    if (!ProductData){
      res.status(400).json ({ message: 'NO TAG with that ID'});
      return;
    }
    res.status(200).json(ProductData);
  }
  catch (err)
{
  res.status(500).json(err);
}});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newProductTag = await Tag.create(req.body);
    res.status(200).json (newProductTag);
  }catch (err){
    res.status(400).json(err);
  }

});

router.put('/:id', async (req, res) => {
  try{
    const UpdateTag = await Tag.update(req.body,{
      where: { id: req.params.id}
    })
    res.json(UpdateTag)
  }
  catch (err){
    res.status(400).json(err);
  }
  // update a tag's name by its `id` value
});

router.delete('/:id', async (req, res) => {
  try{
    const ProductData = await Tag.destroy({
      where: {id: req.params.id}
    });
    if (!ProductData){
      res.status(400).json({message: 'No TAG with that ID'});
      return;
    }
    res.status(200).json (ProductData);
  }catch (err){
    res.status(500).json(err);
  }
  // delete on tag by its `id` value
});

module.exports = router;
