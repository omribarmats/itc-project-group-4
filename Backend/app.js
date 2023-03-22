const express = require('express');
const cors = require("cors");
require('dotenv').config();
// const { Configuration, OpenAIApi } = require('openai');
const SearchController = require('./controllers/SearchController');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());


app.post('/filtered-search', SearchController.FilteredSearch);


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})