const express = require('express');
const dataRoute = require('./dataRoute'); 
const dbConnect = require('./dbConnect');
const cors = require('cors');
const app = express();
const port = 4000;

dbConnect()

app.use(cors({
    origin: '*',
  }));
  
app.use('/api/v1',dataRoute);
  
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
