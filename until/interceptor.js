module.exports = {
    mockRequest: () => {
      const request = {}
      request.body = jest.fn().mockReturnValue(request)
      request.params = jest.fn().mockReturnValue(request)
      return request
    },
  
    mockResponse: () => {
      const response = {}
      response.send = jest.fn().mockReturnValue(response)
      response.status = jest.fn().mockReturnValue(response)
      response.json = jest.fn().mockReturnValue(response)
      return response
    },
    // mockNext: () => jest.fn()
}