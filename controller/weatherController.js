const model = require('../models/weatherModels');

module.exports = {
    get: async function(request, response) {
        let id = request.params.id;
        let dbData = await model.getDb(id);
        if(!dbData) {
            const apiData = await model.apiCall(id);

            if(apiData.cod === "404") {

                return response.status(500).json({ msg: "Erro, cidade não encontrada" })
            } else if(apiData.cod !== 200) {

                return response.status(500).json({ msg: "Erro" })
            }    
            await model.insertIntoDb(
                apiData.id,
                apiData.name,
                apiData.main.temp,
                apiData.main.feels_like,
            )
            dbData = {
                city_api_id: apiData.id,
                city_name: apiData.name,
                temp: apiData.main.temp,
                feels_like: apiData.main.feels_like,
            }
            dbData = JSON.stringify(dbData)
            return response.status(200).send(dbData);
        } else if(dbData) {

            let dbDataLastUpdate = dbData.last_update;
            dbDataLastUpdate = new Date(dbDataLastUpdate)
            let dateNow = new Date();
            let comparison = dateNow - dbDataLastUpdate;
            comparison /= 60000;

            if(comparison <= 20) {
                dbData = JSON.stringify(dbData, null, '\n')
                return response.status(200).send(dbData);
            } else if(comparison > 20){
                const apiData = await model.apiCall(id);
                
                if(apiData.cod === "404") {
                    return response.status(500).json({ msg: "Erro, cidade não encontrada" })
                } else if(apiData.cod !== 200) {
                    return response.status(500).json({ msg: "Erro" })
                }  
                await model.updateDb(
                    apiData.id,
                    apiData.main.temp,
                    apiData.main.feels_like,
                )
                dbData = {
                    city_api_id: apiData.id,
                    city_name: apiData.name,
                    temp: apiData.main.temp,
                    feels_like: apiData.main.feels_like,
                }
                dbData = JSON.stringify(dbData)
                return response.status(200).send(dbData);
            }
            // return dbData
        }
    }
}
