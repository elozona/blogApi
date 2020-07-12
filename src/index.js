const express = require('express');
const dotenv = require('dotenv');
const routes = require('./routes');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

dotenv.config();
const app = express();

// Body Parser
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set up default mongoose connection
/*mongoose.connect('mongodb://localhost:27017/blogs', { useNewUrlParser: true, useUnifiedTopology: true, }); 

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection Error:'));
 db.once('open', () => {
  console.log("Successfully connected to MongoDB!");
});*/

const dbConnection = mongoose.createConnection(process.env.MONGO_URL, 
    { 
      useNewUrlParser: true,
      useFindAndModify: true,
      useCreateIndex: true,
      useUnifiedTopology: true 
    }); 
dbConnection.on('open', () => {
    console.log( "Connected to MongoDB successfully...!" )
});
dbConnection.on('error', () => {
    console.error("Couldn't connect to MongoDB.")
});
dbConnection.on('disconnected', () => {
    console.error("Connection is lost")
}); 
// .then(() => console.log( "Connected to MongoDB successfully...!" ) )
//     .catch((error) => console.error("Couldn't connect to MongoDB.") );

app.use('/api/', routes);

app.use('*', (req, res) => {
    res.status(404).json({
        message: "This path does not exist, please input the correct one!"
    })
});

// Asssign a dynamic port with an environment variable PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server now listening on port ${port}...`));
