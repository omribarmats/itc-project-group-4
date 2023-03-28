const express = require('express');
const cors = require("cors");
require('dotenv').config();

const SearchController = require('./controllers/SearchController');

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());


app.post('/filtered-search', SearchController.FilteredSearch);
app.post('/free-search', SearchController.FreeSearch);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})