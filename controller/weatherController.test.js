const { mockRequest, mockResponse } = require('../until/interceptor');
const controller = require('./weatherController');

describe('Check method get in controller', ()=>{
    test('Request with invalid id', async ()=>{
        let request = mockRequest();
        request.params.id = 1;
        let response = mockResponse();

        await controller.get(request, response);

        expect(response.status).toHaveBeenCalledWith(500);
        expect(response.json).toHaveBeenCalledWith({ msg: "Erro, cidade não encontrada" });

        // expect(response.status).toBe({ msg: "Erro, cidade não encontrada" })
    });
})