'use strict'

const helper = require('../definitions_helper')
const definitions = require('../../../src/extensions/http_api/definitions')()

beforeEach(() => {
    require('chai').clear()
})

test('set request headers', () => {
    const context = helper.define(definitions)

    const def = context.getDefinitionByMatcher('set request headers')
    def.shouldHaveType('Given')
    def.shouldMatch('I set request headers')
    def.shouldMatch('set request headers')

    const clientMock = {
        httpApiClient: { setHeaders: jest.fn() },
        state: { populateObject: o => o }
    }
    const headers = {
        Accept: 'application/json',
        'User-Agent': 'veggies/1.0'
    }
    def.exec(clientMock, { rowsHash: () => headers })
    expect(clientMock.httpApiClient.setHeaders).toHaveBeenCalledWith(headers)
})

test('set a single request header', () => {
    const context = helper.define(definitions)

    const def = context.getDefinitionByMatcher('request header to')
    def.shouldHaveType('Given')
    def.shouldNotMatch('I set Accept request header to ')
    def.shouldMatch('I set Accept request header to test', ['Accept', 'test'])
    def.shouldMatch('set Accept request header to test', ['Accept', 'test'])

    const clientMock = {
        httpApiClient: { setHeader: jest.fn() },
        state: { populate: v => v }
    }
    def.exec(clientMock, 'Accept', 'test')
    expect(clientMock.httpApiClient.setHeader).toHaveBeenCalledWith('Accept', 'test')
})

test('clear request headers', () => {
    const context = helper.define(definitions)

    const def = context.getDefinitionByMatcher('clear request headers')
    def.shouldHaveType('Given')
    def.shouldMatch('I clear request headers')
    def.shouldMatch('clear request headers')

    const clientMock = { httpApiClient: { clearHeaders: jest.fn() } }
    def.exec(clientMock)
    expect(clientMock.httpApiClient.clearHeaders).toHaveBeenCalled()
})

test('set request json body', () => {
    const context = helper.define(definitions)

    const def = context.getDefinitionByMatcher('set request json body$')
    def.shouldHaveType('Given')
    def.shouldMatch('I set request json body')
    def.shouldMatch('set request json body')
})

test('set request json body from fixture file', () => {
    const context = helper.define(definitions)

    expect.assertions(6)

    const def = context.getDefinitionByMatcher('set request json body from')
    def.shouldHaveType('Given')
    def.shouldNotMatch('I set request json body from ')
    def.shouldMatch('I set request json body from fixture')
    def.shouldMatch('set request json body from fixture')

    const fixture = {
        is_active: 'true',
        id: '2'
    }
    const worldMock = {
        httpApiClient: { setJsonBody: jest.fn() },
        fixtures: { load: jest.fn(() => Promise.resolve(fixture)) }
    }

    return def.exec(worldMock, 'fixture').then(() => {
        expect(worldMock.fixtures.load).toHaveBeenCalledWith('fixture')
        expect(worldMock.httpApiClient.setJsonBody).toHaveBeenCalledWith(fixture)
    })
})

test('set request form body', () => {
    const context = helper.define(definitions)

    const def = context.getDefinitionByMatcher('set request form body$')
    def.shouldHaveType('Given')
    def.shouldMatch('I set request form body')
    def.shouldMatch('set request form body')
})

test('set request form body from fixture file', () => {
    const context = helper.define(definitions)

    expect.assertions(6)

    const def = context.getDefinitionByMatcher('set request form body from')
    def.shouldHaveType('Given')
    def.shouldNotMatch('I set request form body from ')
    def.shouldMatch('I set request form body from fixture')
    def.shouldMatch('set request form body from fixture')

    const fixture = {
        is_active: 'true',
        id: '2'
    }
    const worldMock = {
        httpApiClient: { setFormBody: jest.fn() },
        fixtures: { load: jest.fn(() => Promise.resolve(fixture)) }
    }

    return def.exec(worldMock, 'fixture').then(() => {
        expect(worldMock.fixtures.load).toHaveBeenCalledWith('fixture')
        expect(worldMock.httpApiClient.setFormBody).toHaveBeenCalledWith(fixture)
    })
})

test('clear request body', () => {
    const context = helper.define(definitions)

    const def = context.getDefinitionByMatcher('clear request body')
    def.shouldHaveType('Given')
    def.shouldMatch('I clear request body')
    def.shouldMatch('clear request body')

    const clientMock = { httpApiClient: { clearBody: jest.fn() } }
    def.exec(clientMock)
    expect(clientMock.httpApiClient.clearBody).toHaveBeenCalled()
})

test('set request query', () => {
    const context = helper.define(definitions)

    const def = context.getDefinitionByMatcher('set request query')
    def.shouldHaveType('Given')
    def.shouldMatch('I set request query')
    def.shouldMatch('set request query')

    const clientMock = {
        httpApiClient: { setQuery: jest.fn() },
        state: { populateObject: o => o }
    }
    const query = {
        is_active: 'true',
        id: '2'
    }
    def.exec(clientMock, { rowsHash: () => query })
    expect(clientMock.httpApiClient.setQuery).toHaveBeenCalledWith(query)
})

test('pick response json property', () => {
    const context = helper.define(definitions)

    const def = context.getDefinitionByMatcher('pick response json')
    def.shouldHaveType('Given')
    def.shouldNotMatch('I pick response json  as ')
    def.shouldMatch('I pick response json key as value', ['key', 'value'])
    def.shouldMatch('pick response json key as value', ['key', 'value'])
})

test('enable cookies', () => {
    const context = helper.define(definitions)

    const def = context.getDefinitionByMatcher('enable cookies')
    def.shouldHaveType('Given')
    def.shouldMatch('I enable cookies')
    def.shouldMatch('enable cookies')

    const clientMock = { httpApiClient: { enableCookies: jest.fn() } }
    def.exec(clientMock)
    expect(clientMock.httpApiClient.enableCookies).toHaveBeenCalled()
})

test('disable cookies', () => {
    const context = helper.define(definitions)

    const def = context.getDefinitionByMatcher('disable cookies')
    def.shouldHaveType('Given')
    def.shouldMatch('I disable cookies')
    def.shouldMatch('disable cookies')

    const clientMock = { httpApiClient: { disableCookies: jest.fn() } }
    def.exec(clientMock)
    expect(clientMock.httpApiClient.disableCookies).toHaveBeenCalled()
})

test('test cookie is present', () => {
    const context = helper.define(definitions)

    const def = context.getDefinitionByMatcher('response should (not )?have an? (.+) cookie')
    def.shouldHaveType('Then')
    def.shouldNotMatch('response should have a  cookie')
    def.shouldNotMatch('response should have an  cookie')
    def.shouldMatch('response should have a test cookie', [undefined, 'test'])
    def.shouldMatch('response should have an test cookie', [undefined, 'test'])

    const clientMock = { httpApiClient: { getCookie: jest.fn() } }
    def.exec(clientMock, undefined, 'test')
    expect(clientMock.httpApiClient.getCookie).toHaveBeenCalledWith('test')
    expect(require('chai').expect).toHaveBeenCalledWith(undefined, `No cookie found for key 'test'`)
})

test('test cookie is absent', () => {
    const context = helper.define(definitions)

    const def = context.getDefinitionByMatcher('response should (not )?have an? (.+) cookie')
    def.shouldHaveType('Then')
    def.shouldNotMatch('response should crap have a  cookie')
    def.shouldNotMatch('response should crap have an  cookie')
    def.shouldNotMatch('response should not have a  cookie')
    def.shouldNotMatch('response should not have an  cookie')
    def.shouldMatch('response should not have a test cookie', ['not ', 'test'])
    def.shouldMatch('response should not have an test cookie', ['not ', 'test'])

    const clientMock = { httpApiClient: { getCookie: jest.fn() } }
    def.exec(clientMock, 'not ', 'test')
    expect(clientMock.httpApiClient.getCookie).toHaveBeenCalledWith('test')
    expect(require('chai').expect).toHaveBeenCalledWith(undefined, `A cookie exists for key 'test'`)
})

test('test cookie is secure', () => {
    const context = helper.define(definitions)

    const def = context.getDefinitionByMatcher('response (.+) cookie should (not )?be secure')
    def.shouldHaveType('Then')
    def.shouldNotMatch('response  cookie should be secure')
    def.shouldMatch('response test cookie should be secure', ['test', undefined])

    const clientMock = { httpApiClient: { getCookie: jest.fn(() => ({ secure: true })) } }
    def.exec(clientMock, 'test', undefined)
    expect(clientMock.httpApiClient.getCookie).toHaveBeenCalledWith('test')
    expect(require('chai').expect).toHaveBeenCalledWith(true, `Cookie 'test' is not secure`)
})

test('test cookie is not secure', () => {
    const context = helper.define(definitions)

    const def = context.getDefinitionByMatcher('response (.+) cookie should (not )?be secure')
    def.shouldHaveType('Then')
    def.shouldNotMatch('response  cookie should not be secure')
    def.shouldMatch('response test cookie should not be secure', ['test', 'not '])

    const clientMock = { httpApiClient: { getCookie: jest.fn(() => ({ secure: false })) } }
    def.exec(clientMock, 'test', 'not ')
    expect(clientMock.httpApiClient.getCookie).toHaveBeenCalledWith('test')
    expect(require('chai').expect).toHaveBeenCalledWith(false, `Cookie 'test' is secure`)
})

test('reset http client', () => {
    const context = helper.define(definitions)

    const def = context.getDefinitionByMatcher('reset http client')
    def.shouldHaveType('When')
    def.shouldMatch('I reset http client')
    def.shouldMatch('reset http client')

    const clientMock = { httpApiClient: { reset: jest.fn() } }
    def.exec(clientMock)
    expect(clientMock.httpApiClient.reset).toHaveBeenCalled()
})

test('perform a request', () => {
    const context = helper.define(definitions)

    const def = context.getDefinitionByMatcher('GET|POST|PUT|DELETE')
    def.shouldHaveType('When')
    def.shouldNotMatch('I GET ')
    def.shouldMatch('I GET /', ['GET', '/'])
    def.shouldMatch('I POST /create', ['POST', '/create'])
    def.shouldMatch('I PUT /update', ['PUT', '/update'])
    def.shouldMatch('I DELETE /delete', ['DELETE', '/delete'])
    def.shouldMatch('GET /', ['GET', '/'])
    def.shouldMatch('POST /create', ['POST', '/create'])
    def.shouldMatch('PUT /update', ['PUT', '/update'])
    def.shouldMatch('DELETE /delete', ['DELETE', '/delete'])
})

test('dump response body', () => {
    const context = helper.define(definitions)

    const def = context.getDefinitionByMatcher('dump response body')
    def.shouldHaveType('When')
    def.shouldMatch('I dump response body')
    def.shouldMatch('dump response body')

    const clientMock = { httpApiClient: { getResponse: jest.fn(() => ({ body: '' })) } }
    def.exec(clientMock)
    expect(clientMock.httpApiClient.getResponse).toHaveBeenCalled()
})

test('check response HTTP status code', () => {
    const context = helper.define(definitions)

    const def = context.getDefinitionByMatcher('response status code should be')
    def.shouldHaveType('Then')
    def.shouldNotMatch('response status code should be ')
    def.shouldNotMatch('response status code should be string')
    def.shouldNotMatch('response status code should be 600')
    def.shouldMatch('response status code should be 200', ['200'])
    def.shouldMatch('response status code should be 404', ['404'])

    const clientMock = { httpApiClient: { getResponse: jest.fn(() => ({ statusCode: 200 })) } }
    def.exec(clientMock, '200')
    expect(clientMock.httpApiClient.getResponse).toHaveBeenCalled()
    expect(require('chai').expect).toHaveBeenCalledWith(200, 'Expected status code to be: 200, but found: 200')
})

test('check response HTTP status by message', () => {
    const context = helper.define(definitions)

    const def = context.getDefinitionByMatcher('response status should be')
    def.shouldHaveType('Then')
    def.shouldNotMatch('response status should be ')
    def.shouldMatch('response status should be ok', ['ok'])
    def.shouldMatch('response status should be forbidden', ['forbidden'])

    const clientMock = { httpApiClient: { getResponse: jest.fn(() => ({ statusCode: 200 })) } }
    def.exec(clientMock, 'ok')
    expect(clientMock.httpApiClient.getResponse).toHaveBeenCalled()
    expect(require('chai').expect).toHaveBeenCalledWith(200, `Expected status to be: 'ok', but found: 'ok'`)

    expect(() => {
        def.exec(clientMock, 'invalid')
    }).toThrow(new TypeError(`'invalid' is not a valid status message`))
})

test('check json response', () => {
    const context = helper.define(definitions)

    const def = context.getDefinitionByMatcher('should receive a json response')
    def.shouldHaveType('Then')
    def.shouldMatch('I should receive a json response matching', [undefined])
    def.shouldMatch('I should receive a json response fully matching', ['fully '])
    def.shouldMatch('should receive a json response matching', [undefined])
    def.shouldMatch('should receive a json response fully matching', ['fully '])
})

test('check json collection size for a given path', () => {
    const context = helper.define(definitions)

    const def = context.getDefinitionByMatcher('should receive a collection of')
    def.shouldHaveType('Then')
    def.shouldNotMatch('I should receive a collection of x items for path whatever')
    def.shouldMatch('I should receive a collection of 1 item for path property', ['1', 'property'])
    def.shouldMatch('I should receive a collection of 2 items for path property', ['2', 'property'])
    def.shouldMatch('should receive a collection of 1 item for path property', ['1', 'property'])
    def.shouldMatch('should receive a collection of 2 items', ['2', undefined])

    const clientMock = { httpApiClient: { getResponse: jest.fn(() => ({ body: { property: ['a', 'b', 'c'] } })) } }
    def.exec(clientMock, '3', 'property')
    expect(clientMock.httpApiClient.getResponse).toHaveBeenCalled()
    expect(require('chai').expect).toHaveBeenCalledWith(3)
    expect(require('chai').equal).toHaveBeenCalledWith(3)
})

test('response match snapshot', () => {
    const context = helper.define(definitions)

    expect.assertions(5)

    const def = context.getDefinitionByMatcher('should match snapshot')
    def.shouldHaveType('Then')
    def.shouldNotMatch('response should match snapshot ')
    def.shouldMatch('response should match snapshot snapshot', ['snapshot'])

    const snapshot = { testing: true }
    const worldMock = {
        httpApiClient: { getResponse: jest.fn(() => ({ statusCode: 200, body: snapshot })) },
        fixtures: { load: jest.fn(() => Promise.resolve(snapshot)) }
    }

    return def.exec(worldMock, 'snapshot').then(() => {
        expect(require('chai').expect).toHaveBeenCalledWith(snapshot)
    })
})
