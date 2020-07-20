const axios = require('../node_modules/axios').default;

const TOKEN1 = 'edaf0187-0e7b-456e-a177-cd05a95bf42a';
const newRestaurant = 'Japa Sushi Express'
const id = '5f14c02c76c8cf4ea4a3ed02'
// data: {name: 'New Restaurant'}

// axios.post('http://localhost:3000/signUp', {email: 'lasanha@email.com'}).then(response => console.log(response))

axios.get(`http://localhost:3000/restaurant/name/${newRestaurant}`)
    .then(response => console.log(response.data))
    .catch(error => console.log(error))

axios.post('http://localhost:3000/restaurants/add', { name: newRestaurant, cuisine: 'None', borough: 'World'}, { headers: { 'Token': TOKEN1 } })
    .then((response) => console.log(response.data))
    .catch(error => console.log(error))

axios.put(`http://localhost:3000/updateRestaurant/id/${id}`, { cuisine: 'Japanese' }, { headers: { 'Token': TOKEN1 } })
    .then(response => console.log(response.data))
    .catch(error => console.log(error))

axios.delete(`http://localhost:3000/removeOneRestaurant`, { headers: { 'Token': TOKEN1 }, data: { name: newRestaurant }})
    .then(response => console.log(response.data))
    .catch(error => console.log(error))

axios.delete(`http://localhost:3000/removeManyRestaurants`, { headers: { 'Token': TOKEN1 }, data: { name: newRestaurant }})
    .then(response => console.log(response.data))
    .catch(error => console.log(error))