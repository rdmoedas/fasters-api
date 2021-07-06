const model = require('../models/weatherModels');

function catchApiDataError(apiData) {
    if(apiData.cod === 404) {
        return response.status(500).json({ msg: "Erro, cidade não encontrada" })
    } else if(apiData.cod !== 200) {
        return response.status(500).json({ msg: "Erro" })
    }    
}

async function checkDate(dbData, id) {
    let dateNow = new Date();
    // console.log('data now: ', data.toString());
    // console.log('data banco:', dbDate.toString());
    let dbDataCreateAt = dbData.last_update;
    dbDataCreateAt = new Date(dbDataCreateAt)
    let comparison = dateNow - dbDataCreateAt;
    comparison /= 60000
    if(comparison <= 20) {
        return dbData
    } else if(comparison >= 20){
        const apiData = await model.apiCall(id);
        let insertIntoDbData = await model.insertIntoDb(
            apiData.id,
            apiData.name,
            apiData.main.temp,
            apiData.main.feels_like,
            apiData.main.temp_min,
            apiData.main.temp_max,
        )
        return apiData

    }
    // comparison = Math.floor(comparison / 60 / 60 / 24)
    return data;
}

module.exports = {
    get: async function(request, response) {
        let id = request.params.id;
        let dbData = await model.getDb(id);
        if(!dbData) {

            const apiData = await model.apiCall(id)
            catchApiDataError(apiData)
            let insertIntoDbData = await model.insertIntoDb(
                apiData.id,
                apiData.name,
                apiData.main.temp,
                apiData.main.feels_like,
                apiData.main.temp_min,
                apiData.main.temp_max,
            )
            response.send(`Temperatura em ${apiData.name} é de: ${apiData.main.temp}ºC [CAMINHO E]`);
            console.log('caminho E')
            return apiData

        } else if(dbData) {

            console.log('check time stamp')

            let dateNow = new Date();
            // console.log('data now: ', data.toString());
            // console.log('data banco:', dbDate.toString());
            let dbDataCreateAt = dbData.last_update;
            dbDataCreateAt = new Date(dbDataCreateAt)
            let comparison = dateNow - dbDataCreateAt;
            comparison /= 60000
            if(comparison <= 20) {
                console.log('caminho G')
                response.send(`Temperatura em ${dbData.city_name} é de: ${dbData.temp}ºC [CAMINHO G]`);
                return dbData
            } else if(comparison > 20){
                const apiData = await model.apiCall(id);
                let updateDbData = await model.updateDb(
                    apiData.id,
                    apiData.main.temp,
                    apiData.main.feels_like,
                    apiData.main.temp_min,
                    apiData.main.temp_max
                )
                console.log('caminho H')
                response.send(`Temperatura em ${apiData.name} é de: ${apiData.main.temp}ºC [CAMINHO H]`);
                return apiData
        
            }
            // comparison = Math.floor(comparison / 60 / 60 / 24)
            return data;


            // checkDate(dbData, id);
            // response.send(`Temperatura em ${dbData.city_name} é de: ${dbData.temp}ºC`);
            // return dbData
        }
        console.log('ok')
    },
    teste: async function teste() {
        // let id = 3451190;
        // let dbData = await model.apiTest(id);
        // console.log(dbData)
    }
}
