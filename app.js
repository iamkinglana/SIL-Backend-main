require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('./config/passport');
const userRoutes = require('./routes/users');
const albumRoutes = require('./routes/albums');
const photoRoutes = require('./routes/photos');
const authRoutes = require('./routes/auth');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.options('*', cors());

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.use(bodyParser.json());

app.use('/api/users', passport.authenticate('jwt', { session: false }), userRoutes);
app.use('/api/albums', passport.authenticate('jwt', { session: false }), albumRoutes);
app.use('/api/photos', passport.authenticate('jwt', { session: false }), photoRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send(`<h1>Welcome to the One Frame API</h1>
              <p>This API is protected and requires authentication.</p>`);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
