const fetch = require('node-fetch');
const Sequelize = require('sequelize');
const configDatabase = require('../config/database');
const db = new Sequelize(configDatabase);
const apiUrl = require('../config/openWeatherApi');

module.exports = {

    insertIntoDb: async function insertIntoDb( cityId, cityName, temp, feelsLike) {
        await db.query(
            'INSERT INTO city_weather (city_api_id, city_name, temp, feels_like) VALUES (:cityId, :cityName, :temp, :feelsLike);',
            {
                replacements: {
                    cityId: cityId,
                    cityName: cityName,
                    temp: temp,
                    feelsLike: feelsLike
                }
            }
        );
        return
    },

    getDb: async function getDb(id) {
        const response = await db.query(
            'SELECT * FROM city_weather WHERE city_api_id = :id;',
            {
                type: Sequelize.QueryTypes.SELECT,
                replacements: {
                    id: id
                }
            }
        );
        return response[0];
    },

    updateDb: async function updateDb( cityId, temp, feelsLike ) {
        await db.query(
            'UPDATE city_weather SET temp = :temp, feels_like = :feelsLike WHERE city_api_id = :cityId;', 
            {
                replacements: {
                    cityId: cityId,
                    temp: temp,
                    feelsLike: feelsLike
                }
            }
        );
        return
    },

    deleteFromDb: async function deleteFromDb( cityId ) {
        await db.query(
            'DELETE FROM `city_weather` WHERE city_api_id = :cityId;', 
            {
                replacements: {
                    cityId: cityId
                }
            }
        )
    },

    apiCall: async function apiCall(cityId) {
        let url = `${apiUrl.url}?id=${cityId}&appid=${apiUrl.appid}&${apiUrl.language}&${apiUrl.unit}`;
        const response = await fetch(url)
        const data = await response.json();
        return data
    }
}