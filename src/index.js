const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes')
const app = express();

mongoose.connect('mongodb+srv://xispituao:NatanIfpi24@cluster0-m3k3g.mongodb.net/week10?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(routes);



app.listen(3333);
