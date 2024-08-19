const express = require('express');
const cors = require('cors');
const databaseConnection = require('./config/dbConnection');
// const User = require('./model/User.model')
const userroute= require('./routes/user.routes')
const app = express();
const port = 3000;
const cookieParser = require('cookie-parser');

app.use(express.json())
// Use CORS middleware

databaseConnection();


require('dotenv').config();
app.use(cookieParser())
app.use(cors(
    {
        credentials:true,
        origin:'http://localhost:5173'
    }
));

// Define routes
app.get('/test', (req, res) => {
    res.json({ message: 'Whatsupp' });
});

app.use('/api/users',userroute)
// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
