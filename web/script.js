function restSearch() {
    const receiveRestaurant = document.getElementById('restaurant').value
    returnRestaurant(receiveRestaurant)
}
function restAllSearch() {
    returnAll()
}
const callForRest = async (restaurant) => {
    try {
        const newRestaurant = await axios.get(`http://localhost:3000/restaurant/cuisine/${restaurant}`)
        return newRestaurant.data
    } catch (error) {
        console.log(error)
    }
}
const returnRestaurant = (restaurant) => {
    callForRest(restaurant).then(response => console.log(response)).catch(error => console.log(error))
}
const returnAll = () => {
    axios.get(`http://localhost:3000/restaurants`).then((response => console.log(response))).catch(error => console.log(error))
}