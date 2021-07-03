const { mockData } = require('../models/weather');
const model = require('../models/weather');

module.exports = {
    get: async function(request, response) {
        let id = 3451190;
        let dbData = await model.getDb(id);
        if(dbData) {
            console.log('check time stamp')
            console.log('dbData', dbData)
            //por uma função para isso?
            //if (t>20min call api, else return dbData)
            //dbData[0].dt = new Date(dbData[0].dt * 1000)
            response.send(`Temperatura em ${dbData.city_name} é de: ${dbData.temp}ºC`);

        } else {
            console.log('call api')
        }



    }
}