const fetch = require('node-fetch');
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

const mockData1 = {
    "coord": {
        "lon": -43.2075,
        "lat": -22.9028
    },
    "weather": [
        {
            "id": 803,
            "main": "Clouds",
            "description": "nublado",
            "icon": "04d"
        }
    ],
    "base": "stations",
    "main": {
        "temp": 21.91,
        "feels_like": 22.17,
        "temp_min": 21.62,
        "temp_max": 22.95,
        "pressure": 1046,
        "humidity": 77
    },
    "visibility": 10000,
    "wind": {
        "speed": 1.88,
        "deg": 145,
        "gust": 2.11
    },
    "clouds": {
        "all": 61
    },
    "dt": 1625497267,
    "sys": {
        "type": 2,
        "id": 2036992,
        "country": "BR",
        "sunrise": 1625477648,
        "sunset": 1625516424
    },
    "timezone": -10800,
    "id": 3451190,
    "name": "Rio de Janeiro",
    "cod": 200
}
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
    insertIntoDb: async function insertIntoDb( city_id, city_name, temp, fells_like, temp_min, temp_max) {
        await db.query('INSERT INTO city_weather (city_api_id, city_name, temp, fells_like, temp_min, temp_max) VALUES (:city_id, :city_name, :temp, :fells_like, :temp_min, :temp_max)', {
            replacements: {
                city_id: city_id, // Arrumar a nomenclatura para camelCase
                city_name: city_name, // Arrumar a nomenclatura para camelCase
                temp: temp, // Arrumar a nomenclatura para camelCase
                fells_like: fells_like, // Arrumar a nomenclatura para camelCase
                temp_min: temp_min, // Arrumar a nomenclatura para camelCase
                temp_max: temp_max, // Arrumar a nomenclatura para camelCase
            }
        });
        return console.log('dados enviados para o banco')
    },
    updateDb: async function updateDb( city_id, temp, fells_like, temp_min, temp_max ) {
        await db.query('UPDATE city_weather SET temp = :temp, fells_like = :fells_like, temp_min = :temp_min, temp_max = :temp_max WHERE city_api_id = :city_id;', {
            replacements: {
                city_id: city_id, // Arrumar a nomenclatura para camelCase
                temp: temp, // Arrumar a nomenclatura para camelCase
                fells_like: fells_like, // Arrumar a nomenclatura para camelCase
                temp_min: temp_min, // Arrumar a nomenclatura para camelCase
                temp_max: temp_max, // Arrumar a nomenclatura para camelCase
            }
        });
        return console.log('dados do banco atualizados')
    },
    apiCall: async function apiCall(cityId) {
        let apiUrl = `http://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=cd9c7dc2c4bc35d56981a3e9fc134f07&lang=pt_br&units=metric`;
        const response = await fetch(apiUrl)
        const data = await response.json();
        console.log('fetch response: ', data);
        return data
    },
    mockData1: mockData1,
    mockData: mockData,
}