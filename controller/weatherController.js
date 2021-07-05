const model = require('../models/weatherModels');

function checkDate(dbDate) {
    let data = new Date();
    console.log('data now: ', data.toString());
    console.log('data banco:', dbDate.toString());
    dbDate = new Date(dbDate)
    let comparison = data - dbDate;
    comparison /= 60000
    console.log('comparison: ', comparison);
    if(comparison >= 20) {
        const apiGet = model.mockData1;
        return console.log('Maior que 20min')
    }
    comparison = Math.floor(comparison / 60 / 60 / 24)
    return data;
}

module.exports = {
    get: async function(request, response) {
        let id = request.params.id;
        let dbData = await model.getDb(id);
        console.log('dbData', dbData);
        if(dbData) {
            console.log('check time stamp')

            checkDate(dbData.create_at);

            // console.log('dbData', dbData)
            //por uma função para isso?
            //if (t>20min call api, else return dbData)
            //dbData[0].dt = new Date(dbData[0].dt * 1000)
            response.send(`Temperatura em ${dbData.city_name} é de: ${dbData.temp}ºC`);

        } else {
            const apiData = await model.apiCall(id)
            if(apiData.cod === 404) {
                return response.status(500).json({ msg: "Erro, cidade não encontrada" })
            } else if(apiData.cod !== 200) {
                return response.status(500).json({ msg: "Erro" })
            }
            let insertIntoDbData = await model.insertIntoDb(
                apiData.id,
                apiData.name,
                apiData.main.temp,
                apiData.main.feels_like,
                apiData.main.temp_min,
                apiData.main.temp_max,
            )
            response.send(`Temperatura em ${apiData.name} é de: ${apiData.main.temp}ºC`);
            return apiData
        }
        console.log('ok')
    },
    teste: async function teste() {
        // let id = 3451190;
        // let dbData = await model.apiTest(id);
        // console.log(dbData)
    }
}
