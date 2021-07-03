const Sequelize = require('sequelize');
const configDatabase = require('../config/database');
const db = new Sequelize(configDatabase);

const mockData = [
    {
        "coord": {
            "lon": -49,
            "lat": -22
        },
        "weather": [
            {
                "id": 800,
                "main": "Clear",
                "description": "céu limpo",
                "icon": "01n"
            }
        ],
        "base": "stations",
        "main": {
            "temp": 15.73,
            "feels_like": 14.79,
            "temp_min": 15.73,
            "temp_max": 15.73,
            "pressure": 1023,
            "humidity": 55,
            "sea_level": 1023,
            "grnd_level": 963
        },
        "visibility": 10000,
        "wind": {
            "speed": 2.42,
            "deg": 154,
            "gust": 2.31
        },
        "clouds": {
            "all": 0
        },
        "dt": 1625274314,
        "sys": {
            "country": "BR",
            "sunrise": 1625219730,
            "sunset": 1625258661
        },
        "timezone": -10800,
        "id": 3448433,
        "name": "São Paulo",
        "cod": 200
    }
]
//selectCityById

module.exports = {
    getDb: async function getDb(id) {
        const response = await db.query('SELECT * FROM city_weather WHERE city_api_id = :id;', {
            type: Sequelize.QueryTypes.SELECT,
            replacements: {
                id: id
            }
        });
        return response[0];
    },
    mockData: mockData
}