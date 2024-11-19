const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');


require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

// Routes
const habitRoutes = require('./routes/habits');
app.use('/habits', habitRoutes);

app.get('/', (req, res) => res.render('index', { habits: [] })); // Replace `[]` with actual habits if available.


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
