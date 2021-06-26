const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');

const User = require('./models/User');

const app = express();

mongoose
	.connect('mongodb://localhost/database', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
	.then(() => {
		console.log('connected to mongodb cloud! :)');
	})
	.catch((err) => {
		console.log(err);
	});
app.use(express.urlencoded({ extened: true }));
app.use(express.static('ejsfiles'));
app.set('view engine', 'ejs');
app.use(
	cookieSession({
		keys: ['randomStringhjsoi217o54icd5'],
	})
);
app.get('/', (req, res) => {
	res.render('index');
})
	.get('/login', (req, res) => {
		res.render('sign-in');
	})
	.get('/register', (req, res) => {
		res.render('sign-up');
	});

app.post('/login', async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		res.send('Please enter all the fields');
		return;
	}
	res.send('Welcome to our Page');
}).post('/register', async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		res.send('Please enter all the fields');
		return;
	}

	const hashedPassword = await bcrypt.hash(password, 12);
	const latestUser = new User({ email, password: hashedPassword });

	latestUser
		.save()
		.then(() => {
			res.send('registered account!');
			return;
		})
		.catch((err) => console.log(err));
});

app.listen(3000, () => {
	console.log(`Server started listening on port: ${3000}`);
});
