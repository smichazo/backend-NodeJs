const { faker } = require('@faker-js/faker');

class CategoriesServices{
  constructor(){
    this.categories = [];
    this.generate();
  }

  generate(){
    const limit = 100;
    for(let items = 0 ; items < limit; items ++){
      this.categories.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
      })
    }

  }

  create(){

  }

  find(){
    return this.categories;

  }

  findOne(id){
    return this.categories.find(item => item.id ===id);
  }
}

module.exports = CategoriesServices;
