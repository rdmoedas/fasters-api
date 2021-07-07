const { mockRequest, mockResponse } = require('../until/interceptor');
const controller = require('./weatherController');
const models = require('../models/weatherModels');

describe('Check method get in controller', ()=>{
    test('Request with invalid id', async ()=>{
        let request = mockRequest();
        request.params.id = 1; // Id invalida
        let response = mockResponse();

        await controller.get(request, response);

        expect(response.status).toHaveBeenCalledWith(500);
        expect(response.json).toHaveBeenCalledWith({ msg: "Erro, cidade não encontrada" });

    });
    test('Remove city with id (3463450) and request the same id', async ()=>{
        let id = 3463450    // id from Felixlândia

        let dbData = await models.getDb(id)

        if(dbData) {
            await models.deleteFromDb(id)
        }

        let request = mockRequest();
        request.params.id = id
        let response = mockResponse();

        await controller.get(request, response);

        expect(response.status).toHaveBeenCalledWith(200)
 

    });
    test('Request a city already in db', async ()=>{

        let request = mockRequest();
        request.params.id = 3463504; // Id Distrito Federal
        let response = mockResponse();

        await controller.get(request, response);

        expect(response.status).toHaveBeenCalledWith(200);

    })
})

