const express = require('express');
const dotenv = require('dotenv');
const routes = require('./routes/postsroutes');
const mongoose = require('mongoose');
const App = require('./routes/index');
const app = express();

dotenv.config();

// Set up default mongoose connection
mongoose.connect(process.env.MONGO_URL, 
    { 
      useNewUrlParser: true,
      useFindAndModify: true,
      useCreateIndex: true,
      useUnifiedTopology: true 
    }); 

mongoose.connection.on('error', () => {
    console.error("Couldn't connect to MongoDB.")
});
mongoose.connection.on('disconnected', () => {
    console.error("Connection is lost")
}); 
// .then(() => console.log( "Connected to MongoDB successfully...!" ) )
//     .catch((error) => console.error("Couldn't connect to MongoDB.") );

app.use('/api/blog', routes);

app.use('*', (req, res) => {
    res.status(404).json({
        message: "This path does not exist, please input the correct one!"
    })
});

// Asssign a dynamic port with an environment variable PORT to run when database runs
mongoose.connection.on('open', () => {
    console.log( "Connected to MongoDB successfully...!" );
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Server now listening on port ${port}...`));

});
