const express = require('express');
const { faker } = require('@faker-js/faker');

const CategoriesServices = require('./../services/categoris.services');

const service = new CategoriesServices();
const routerCategories = express.Router();


routerCategories.get('/', (req,res)=>{
  const categories = service.find();
  res.json(categories);

});

routerCategories.get('/:id', (req, res)=>{
  const { id } = req.params;
  const categories = service.findOne(id);
  res.json(categories);
});

routerCategories.get('/:categoryId/products/:productId',(req,res)=>{
  const { categoryId, productId } = req.params;
  res.json({
    categoryId,
    productId
  })
});

module.exports = routerCategories;
