const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

class ProductsServices{
  constructor(){
    this.products =[];
    this.generate();
  }

  generate(){
    const limit = 100;
    for(let items = 0 ; items < limit; items ++){
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(),10),
        image: faker.image.url(),
        isBlock: faker.datatype.boolean(),
      })
    }
  }
  async create(data){
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.products.push(newProduct);
    return newProduct;
  }

  find(){
    return new Promise((resolve,rejet)=>{
      setTimeout(()=>{
        resolve(this.products);
      }, 5000);
    })

  }

  async findOne(id){
    //const name = this.getTotal();
    const product = this.products.find(item => item.id ===id);
    if(!product){
      throw boom.notFound('product nor found');
    }
    if(product.isBlock){
      throw boom.conflict('product is block');
    }
    return product;
  }

  async update(id, changes){
    const index = this.products.findIndex(item => item.id ===id);
    if(index === -1){
      throw boom.notFound('product nor found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes
    };
    return this.products[index];

  }

  async delete(id){
    const index = this.products.findIndex(item => item.id ===id);
    if(index === -1){
      throw  boom.notFound('product nor found');
    }
    this.products.splice(index, 1);
    return {id};

  }

}

module.exports = ProductsServices;
