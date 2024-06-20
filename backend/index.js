const express = require("express")

const animalsRoutes = require('./routes/animals')
const classificationsRoutes = require('./routes/classifications')
const categoriesRoutes = require('./routes/categories')


const app = express();

app.use(express.urlencoded({extended: true}))
app.use(express.json());


app.use('/backend/classifications', classificationsRoutes);
app.use('/backend/categories', categoriesRoutes);
app.use('/backend/animals', animalsRoutes);

const port = 3000;

app.listen(port,(req, res) =>console.log(`listening at port ${port}`));