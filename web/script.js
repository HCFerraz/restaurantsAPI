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
// ------------------------------ POSTS
const signUser = async (auth) => {
    try {
        console.log(auth)
        const newAuth = await axios.post('http://localhost:3000/signUp', {email: auth})
        return newAuth.data
    } catch (error) {
        console.log(error)
    }
}
// ------------------------------ PUTS

// ------------------------------ DELETES
