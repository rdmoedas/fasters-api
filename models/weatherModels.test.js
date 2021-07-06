const models = require('./weatherModels');



test('Select data from database when id exist', async ()=>{
    const data = await models.getDb(3461786)
    expect(data).toBeDefined()
})