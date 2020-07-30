// ------------------------------ CLICKS
function restAllSearch() {
    returnAll()
}
function restNameSearch() {
    const receiveRestaurant = document.getElementById('restaurant').value
    returnRestaurantByName(receiveRestaurant)
}
function restBoroughSearch() {
    const receiveRestaurant = document.getElementById('restaurant').value
    returnRestaurantByBorough(receiveRestaurant)
}
function restCuisineSearch() {
    const receiveRestaurant = document.getElementById('restaurant').value
    returnRestaurantByCuisine(receiveRestaurant)
}
function auth() {
    const receiveEmail = document.getElementById('restaurant').value
    signUser(receiveEmail)
}

// ------------------------------ GETS
const callForRestName = async (restaurant) => {
    try {
        const newRestaurant = await axios.get(`http://localhost:3000/restaurant/name/${restaurant}`)
        return newRestaurant.data
    } catch (error) {
        console.log(error)
    }
}
const callForRestBorough = async (restaurant) => {
    try {
        const newRestaurant = await axios.get(`http://localhost:3000/restaurant/borough/${restaurant}`)
        return newRestaurant.data
    } catch (error) {
        console.log(error)
    }
}
const callForRestCuisine = async (restaurant) => {
    try {
        const newRestaurant = await axios.get(`http://localhost:3000/restaurant/cuisine/${restaurant}`)
        return newRestaurant.data
    } catch (error) {
        console.log(error)
    }
}
const returnRestaurantByName = (restaurant) => {
    callForRestName(restaurant).then(response => console.log(response)).catch(error => console.log(error))
}
const returnRestaurantByBorough = (restaurant) => {
    callForRestBorough(restaurant).then(response => console.log(response)).catch(error => console.log(error))
}
const returnRestaurantByCuisine = (restaurant) => {
    callForRestCuisine(restaurant).then(response => console.log(response)).catch(error => console.log(error))
}
const returnAll = () => {
    axios.get(`http://localhost:3000/restaurants`).then((response => console.log(response))).catch(error => console.log(error))
}

// ------------------------------ SIGNUP
const signUser = (auth) => {
    axios.post('http://localhost:3000/signUp', { email: auth }).then(response => alert(`${response.data.message}: ${response.data.token}`)).catch(error => alert(`Insert a valid email!\n${error}`))
}

// ------------------------------ POSTS
const postNewRestaurant = (restaurantName, restaurantCuisine, restaurantBorough, TOKEN) => {
    axios.post('http://localhost:3000/restaurants/add', { name: restaurantName, cuisine: restaurantCuisine, borough: restaurantBorough }, { headers: { 'Token': TOKEN } })
        .then((response) => console.log(response.data))
        .catch(error => console.log(error))
}

// ------------------------------ PUTS
const updateRestaurant = (restaurantID, restaurantCuisine, TOKEN) => {
    axios.put(`http://localhost:3000/updateRestaurant/id/${restaurantID}`, { cuisine: restaurantCuisine }, { headers: { 'Token': TOKEN } })
        .then(response => console.log(response.data))
        .catch(error => console.log(error))
}

// ------------------------------ DELETES
const deleteOneRest = (restaurantName, TOKEN) => {
    axios.delete(`http://localhost:3000/removeOneRestaurant`, { headers: { 'Token': TOKEN }, data: { name: restaurantName } })
        .then(response => console.log(response.data))
        .catch(error => console.log(error))
}
const deleteManyRests = (restaurantName, TOKEN) => {
    axios.delete(`http://localhost:3000/removeManyRestaurants`, { headers: { 'Token': TOKEN }, data: { name: restaurantName } })
        .then(response => console.log(response.data))
        .catch(error => console.log(error))
}
