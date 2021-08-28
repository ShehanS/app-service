const express = require('express');
const app = express();
const appUser = require('./routes/user');
const mongoose = require('mongoose');
const profileRoute = require('./routes/profileService');
const registerRouter = require('./routes/registerService');
const fileUploader = require('./routes/fileUploader');
const dotenv = require('dotenv');

dotenv.config();
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

console.log('DATABASE... URL[' + process.env.DB_CONNECT + ']')
mongoose.connect(process.env.DB_CONNECT)
    .then(() => console.log('DATABASE... CONNECTED'))
    .catch(err => console.error('DATABASE... COULD NOT CONNECTED', err))

app.use((req, res, next) =>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if(req.method==="OPTIONS"){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});

    }
    next();
});
app.use(express.json({limit: '50mb'}));
app.use(express.json());
app.use('/api/user', appUser);
app.use('/api', profileRoute);
app.use('/api/user', registerRouter);
app.use('/api', fileUploader);


app.listen(process.env.SERVER_PORT, () => console.log('SERVER RUNNING... PORT [' + process.env.SERVER_PORT + ']'));