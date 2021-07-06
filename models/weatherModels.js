const fetch = require('node-fetch');
const Sequelize = require('sequelize');
const configDatabase = require('../config/database');
const db = new Sequelize(configDatabase);
const apiUrl = require('../config/openWeatherApi');

module.exports = {
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
    insertIntoDb: async function insertIntoDb( cityId, cityName, temp, fellsLike) {
        await db.query(
            'INSERT INTO city_weather (city_api_id, city_name, temp, fells_like) VALUES (:cityId, :cityName, :temp, :fellsLike);',
            {
                replacements: {
                    cityId: cityId,
                    cityName: cityName,
                    temp: temp,
                    fellsLike: fellsLike
                }
            }
        );
        return
    },
    updateDb: async function updateDb( cityId, temp, fellsLike ) {
        await db.query(
            'UPDATE city_weather SET temp = :temp, fells_like = :fellsLike WHERE city_api_id = :cityId;', 
            {
                replacements: {
                    cityId: cityId,
                    temp: temp,
                    fellsLike: fellsLike
                }
            }
        );
        return
    },
    apiCall: async function apiCall(cityId) {
        let url = `${apiUrl.url}?id=${cityId}&appid=${apiUrl.appid}&${apiUrl.language}&${apiUrl.unit}`;
        const response = await fetch(url)
        const data = await response.json();
        return data
    }
}