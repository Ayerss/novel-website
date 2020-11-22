const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

global.prefixPath = path.resolve(__dirname, 'app');

app.set('views', path.join(global.prefixPath, 'view'));
app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/static', express.static(path.join(global.prefixPath, 'public')))

require('./app/routes')(app);

app.listen(8080);
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  console.log('http://localhost:8080');
}
