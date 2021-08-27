const express = require('express');
const mongoose = require('mongoose');
const handlebars = require('express-handlebars')
const PORT = process.env.PORT || 3000;
const todoRouters = require('./routers/todos')
const path = require('path')

const app = express();
const hbs = handlebars.create({
    defaultLayout: 'main',
    extname:'hbs'
})

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views','views');

app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))


app.use(todoRouters);

async function start(){
    try{
      await  mongoose.connect(
          'mongodb+srv://dmitri:1q2w3e4r@cluster0.ddw6w.mongodb.net/todos',
          {
          useNewUrlParser: true,
          // useFindAndModify:false
      });

        app.listen(PORT, () => {
            console.log(`server has been started...${PORT}`);
        });
    }catch (e){
        console.log(e)
    }
}

start();