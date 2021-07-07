const models = require('./weatherModels');

describe('Check method getdb in model', ()=>{

    test('Select data from database when id exist', async ()=>{
        const data = await models.getDb(3461786)
        expect(data).toBeDefined()
    });
    
    test('Select data from database when id dont exist', async ()=>{
        const data = await models.getDb(555)
        expect(data).toBeUndefined()
    })
})

describe('Check api call in model', ()=>{

    test('Expected status 200 from id = 3461786 (Guarulhos)', async ()=>{
        const apiData = await models.apiCall(3461786);
        expect(apiData.cod).toBe(200)
    });

    test('Expected status 404 from id = 555 (invalid code)', async ()=>{
        const apiData = await models.apiCall(555);
        expect(apiData.cod).toBe("404")
    })
})

describe('Check insert data into database', ()=>{

    test('Clean the db and test the insert function', async ()=>{
        const checkData = await models.getDb(3461789)
        if(checkData){
            await models.deleteFromDb(3461789);
            await models.insertIntoDb(3461789, 'Guarujá', 30.00, 30.00)
            expect(checkData).toBeDefined()
        } else if(!checkData){
            await models.insertIntoDb(3461789, 'Guarujá', 30.00, 30.00)
            expect(checkData).resolves.toBeDefined()
        }
    })

})

describe('Check update data into database', ()=>{

    test('If the cityId exist, try to update and check the inserted temperature', async ()=>{

        const checkDataInDB = await models.getDb(3448433)
        async (checkDataInDB)=>{
            if(checkDataInDB){
                let rndTemp = Math.round(Math.random()*100)
                const update = await models.updateDb(3448433, rndTemp, 55.02)
                expect(update).toBe(rndTemp.toString())
            }
        }

    })
    
})