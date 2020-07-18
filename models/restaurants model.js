const mongoose = require('../node_modules/mongoose');
const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    borough: {
        type: String,
        required:true
    },
    cuisine: {
        type: String,
        required: true
    }
})
// const restaurantSchema = new mongoose.Schema({
//         address : {
//                 building : {type: String},
//                 coord : [
//                     {type: Number}
//                 ],
//                 street : {type: String},
//                 zipcode : "11356"
//         },
//         borough : "Queens",
//         cuisine : "Delicatessen",
//         grades : [
//                 {
//                         date : ISODate("2014-08-16T00:00:00Z"),
//                         grade : "A",
//                         score : 12
//                 },
//         ],
//         name : "Sal'S Deli",
//         restaurant_id : "40361618"
// })

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;