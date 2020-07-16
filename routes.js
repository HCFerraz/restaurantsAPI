require('./database');
const uuid = require('uuid');
const Restaurant = require('./restaurants model');
const User = require('./users model');

const capitalizeWords = wordsArray => wordsArray.map(wordsString => wordsString
    .split(' ').map(letter => letter[0].toUpperCase() + letter
        .slice(1).toLowerCase()).join(' '));

const isAuthorized = async (req, res) => {
    const token = req.header('Token');
    const user = await User.findOne({ token: token });
    if (!user) {
        res.status(401).json({ message: 'Acesso negado: token inválido' });
        return false;
    };
    return true;
};

function routes(app) {
    app.post('/signup', async (req, res) => {
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
        const limit = parseInt(req.query.limit);
        const page = parseInt(req.query.page);
        const skip = (page - 1) * limit;

        co
        const restaurants = await Restaurant.find().limit(limit).skip(skip);
        const numberOfRestaurants = await Restaurant.countDocuments();

        const result = {
            data: restaurants,
        };
        const hasNextPage = Math.ceil(numberOfRestaurants / limit) > page;
        if (hasNextPage) {
            result.nextPage = `http://localhost:3000/restaurants?limit=${limit}&page=${page + 1}`;
        };
        res.status(200).json(result);
    });

    app.get('/restaurant/name/:name', async (req, res) => {
        const getRestaurantName = capitalizeWords([req.params.name]);
        const restaurantsByName = await Restaurant.find({ name: getRestaurantName }, { _id: 1, cuisine: 1, borough: 1, name: 1 });
        !restaurantsByName || restaurantsByName.length == 0 ? res.status(404).json() : res.status(200).json(restaurantsByName)
    });

    app.get('/restaurant/borough/:borough', async (req, res) => {
        const getBoroughName = capitalizeWords([req.params.borough]);
        const restaurantsByBorough = await Restaurant.find({ borough: getBoroughName }, { _id: 0, name: 1, cuisine: 1, borough: 1 });
        !restaurantsByBorough || restaurantsByBorough.length == 0 ? res.status(404).json() : res.status(200).json(restaurantsByBorough)
    });

    app.get('/restaurant/cuisine/:cuisine', async (req, res) => {
        const getCuisineName = capitalizeWords([req.params.cuisine]);
        const restaurantsByCuisine = await Restaurant.find({ cuisine: getCuisineName }, { _id: 0, name: 1, borough: 1, cuisine: 1 });
        !restaurantsByCuisine || restaurantsByCuisine.length == 0 ? res.status(404).json() : res.status(200).json(restaurantsByCuisine)
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
        const deletedRestaurant = Restaurant.deleteOne({ name: req.body.name })
        try {
            deletedRestaurant.length <= 0 ? res.status(404) : res.status(200).json('The Restaurant was removed successfully')
        } catch (error) {
            res.status(500).json({ status: 500, message: error.message})
        }
    });

    app.delete('/removeManyRestaurants', async (req, res) => {
        if (!await isAuthorized(req, res)) return;
        const deletedRestaurants = Restaurant.deleteMany({ name: req.body.name })
        try {
            deletedRestaurants.length <= 0 ? res.status(404) : res.status(200).json('The Restaurants were removed successfully')
        } catch (error) {
            res.status(500).json({ status: 500, message: error.message})
        }
    });
}

module.exports = routes