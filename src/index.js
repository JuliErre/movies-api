require('./database')
const express = require('express');
const useRoute = require('./routes/movies');
const cors = require('cors');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}


const app = express();
app.set('port', process.env.PORT || 3004);

app.use(cors());


app.use(express.json());
app.use('/api',useRoute);


app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.listen(app.get('port'), () => {
  console.log(`App is running on http://localhost:${app.get('port')}`);
});




