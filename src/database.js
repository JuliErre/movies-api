const mongoose = require('mongoose');
const connectionString = `mongodb+srv://julierre:xL2gNcauPUzFIqB1@cluster0.qlfos6l.mongodb.net/bd?retryWrites=true&w=majority`

mongoose.connect(connectionString)
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));








