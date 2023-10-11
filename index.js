const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const { logErrors, errorHandler, errorBoomHandler } = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
const whitelist = ['http://localhost:3000','http://localhost:8080'];
console.log(whitelist);
const corsOptions ={
  origin: (origin, callback) => {
    if(whitelist.includes(origin)|| !origin){
      callback(null, true);
    }else{
      callback(new Error('No permitido'))
    }
  }

}
app.use(cors(corsOptions));
routerApi(app);

app.use(logErrors);
app.use(errorBoomHandler);
app.use(errorHandler);


app.get('/', (req, res)=>{
  res.send('Hola mi server Express');
});

app.get('/nueva-ruta', (req, res)=>{
  res.send('Hola sou una nueva ruta');
});


app.listen(port, ()=> {
  console.log(`Ejemplo app lsita de pueto ${port}`)
});
