const axios = require('axios').default;

const TOKEN1 = 'edaf0187-0e7b-456e-a177-cd05a95bf42a';
// data: {name: 'New Restaurant'}
// axios.post('http://localhost:3000/signUp', {email: 'lasanha@email.com'}).then(response => console.log(response))

axios.post('http://localhost:3000/restaurants/add', { name: 'New Restaurant' }, { headers: { 'Token': TOKEN1 } })
    .then((response) => console.log(response.data))
    .catch(error => console.log(error))