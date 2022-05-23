const mongoose = require('mongoose')

const HerbSchema = new mongoose.Schema({
    id: {
        type: mongoose.SchemaTypes.ObjectId
    },
    name: {
        type: String,
        required: true
    },
    other: {
        type: String
    },
    description: {
        type: String
    },
    img: {
        type: String
    },
    cuisines: {
        type: String
    },
    origin: {
        type: String
    },
    substitutes: {
        type: String
    },
    categories: {
        grains:{ 
            type: [String]
        },

        meats:{ 
            type: [String]
        },
        seafood:{ 
            type: [String]
        },
        vegetables:{ 
            type: [String]
        },
        beverages:{ 
            type: [String]
        },
        soups:{ 
            type: [String]
        },
        desserts:{ 
            type: [String]
        },
        combos:{ 
            type: [String]
        },
        misc:{ 
            type: [String]
        }     
    },
    date: {
        type: Date,
        default: Date.now
    },
})

module.exports = User = mongoose.model('herb', HerbSchema)