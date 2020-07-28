require('../database');
const uuid = require('../node_modules/uuid');
const Restaurant = require('../models/restaurants model');
const User = require('../models/users model');

const capitalizeWords = wordsArray => wordsArray.map(wordsString => wordsString
    .split(' ').map(letter => letter[0].toUpperCase() + letter
        .slice(1).toLowerCase()).join(' '));

const isAuthorized = async (req, res) => {
    const token = req.header('Token');
    const user = await User.findOne({ token: token });
    if (!user) {
        res.status(401).json({ message: 'Access denied: Invalid Token' });
        return false;
    };
    return true;
};
const pagination = async (req, query, countDocuments) => {
    const limit = parseInt(req.query.limit);
    const page = parseInt(req.query.page);
    const skip = (page - 1) * limit;

    const restaurants = await query.limit(limit).skip(skip);
    const numberOfRestaurants = await countDocuments;

    const result = {
        data: restaurants,
    };
    const hasNextPage = Math.ceil(numberOfRestaurants / limit) > page;
    if (hasNextPage) {
        result.nextPage = `http://localhost:3000/restaurants?limit=${limit}&page=${page + 1}`;
    };
    return result;
}

function routes(app) {
    app.post('/signUp', async (req, res) => {
        const email = req.body.email;
        const user = await User.findOne({ email: email });
        if (user) {
            res.status(200).json({ message: 'This user already exists', token: user.token });
            return;
        }
        const token = uuid.v4();
        const newUser = new User({
            email: email,
            token: token,
        });
        try {
            newUser.save()
            res.status(201).json({ message: 'Here is your access token', token: token });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    });

    app.get('/restaurants', async (req, res) => {
        const response = await pagination(req, Restaurant.find(), Restaurant.countDocuments())
        res.status(200).json(response);
    });

    app.get('/restaurant/name/:name', async (req, res) => {
        const getRestaurantName = capitalizeWords([req.params.name]);
        const restaurantsByName = Restaurant.find({ name: getRestaurantName }, { _id: 1, cuisine: 1, borough: 1, name: 1 });
        const response = await pagination(req, restaurantsByName, Restaurant.countDocuments())
        const notExistRestaurant = !response || response.data.length == 0;
        notExistRestaurant ? res.status(404).send('The restaurant has not been found') : res.status(200).json(response.data)
    });

    app.get('/restaurant/borough/:borough', async (req, res) => {
        const getBoroughName = capitalizeWords([req.params.borough]);
        const restaurantsByBorough = Restaurant.find({ borough: getBoroughName }, { _id: 0, name: 1, cuisine: 1, borough: 1 });
        const response = await pagination(req, restaurantsByBorough, Restaurant.countDocuments())
        const notExistRestaurant = !response || response.data.length == 0;
        notExistRestaurant ? res.status(404).send('The restaurant has not been found') : res.status(200).json(response.data)
    });

    app.get('/restaurant/cuisine/:cuisine', async (req, res) => {
        const getCuisineName = capitalizeWords([req.params.cuisine]);
        const restaurantsByCuisine = Restaurant.find({ cuisine: getCuisineName }, { _id: 0, name: 1, borough: 1, cuisine: 1 });
        const response = await pagination(req, restaurantsByCuisine, Restaurant.countDocuments());
        const notExistRestaurant = !response || response.data.length == 0;
        notExistRestaurant ? res.status(404).send('The restaurant has not been found') : res.status(200).json(response.data)
    });

    app.post('/restaurants/add', async (req, res) => {
        if (!await isAuthorized(req, res)) return;
        const newRestaurant = new Restaurant(req.body);
        try {
            newRestaurant.save()
            res.status(200).json(newRestaurant)    
        } catch (error) {
            res.status(500).json({ status: 500, message: error.message })
        }
    });

    app.put('/updateRestaurant/id/:id', async (req, res) => {
        if (!await isAuthorized(req, res)) return;
        const getRestaurantID = req.params.id;
        const getRestaurantInfo = req.body;
        delete getRestaurantInfo._id;
        const restaurants = await Restaurant.findById(getRestaurantID);
        if (!restaurants) {
            res.status(404).json({ message: 'The restaurant has not been found' });
            return;
        }
        Object.keys(getRestaurantInfo).forEach(key => restaurants[key] = getRestaurantInfo[key]);
        try {
            restaurants.save()
            res.status(200).json(restaurants)    
        } catch (error) {
            res.status(500).json({ status: 500, message: error.message })
        }
    });

    app.put('/updateRestaurant/name/:name', async (req, res) => {
        if (!await isAuthorized(req, res)) return;
        const getRestaurantName = req.params.name;
        const getRestaurantInfo = req.body;
        delete getRestaurantInfo._id;
        const restaurants = await Restaurant.findOne({ name: getRestaurantName })
        if (!restaurants) {
            res.status(404).json({ message: 'The restaurant has not been found' });
            return;
        }
        Object.keys(getRestaurantInfo).forEach(key => restaurants[key] = getRestaurantInfo[key]);
        try {
            restaurants.save()
            res.status(200).json(restaurants)    
        } catch (error) {
            res.status(500).json({ status: 500, message: error.message })
        }
    });

    app.delete('/removeOneRestaurant', async (req, res) => {
        if (!await isAuthorized(req, res)) return;
        const deletedRestaurant = await Restaurant.deleteOne({ name: req.body.name })
        try {
            deletedRestaurant.deletedCount > 0 ? res.status(200).send('The Restaurant was removed successfully') : res.status(404).json()
        } catch (error) {
            res.status(500).json({ status: 500, message: error.message})
        }
    });

    app.delete('/removeManyRestaurants', async (req, res) => {
        if (!await isAuthorized(req, res)) return;
        const deletedRestaurants = await Restaurant.deleteMany({ name: req.body.name })
        try {
            deletedRestaurants.deletedCount > 0 ? res.status(200).send('The Restaurants were removed successfully') : res.status(404).json()
        } catch (error) {
            res.status(500).json({ status: 500, message: error.message})
        }
    });
}

module.exports = routes

/* <html>
	<body>
		<form action="/restaurant/add" method="post">
			<input name='email'>
			<input name='senha'>
			<button></button>
		</form>
	</body>
</html> */

// document.addEventListener(click, document.querySelector('#buttonid'), executa)

// function executa(event) {
// 	event.preventDefault();


// }

//const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: true }));
// Then the form values will be on req.body:

// app.post('/game', function (req, res) {
//     res.render('the_template', { name: req.body.name });
// });

//https://www.tutorialspoint.com/expressjs/expressjs_form_data.htm
//https://stackoverflow.com/a/38763341/690049

