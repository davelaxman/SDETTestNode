'use strict';

const
    assert = require('chai').assert,
    api = require('./helpers/api-helper');

describe('People Endpoint API Tests', function(){
    this.timeout(20000);
    before ((done) => {
        
        done();
    });

    describe("General Tests", () => {
        it('healthcheck', async () => {
            const actual = await api.getRequest("/api-info");
            const json = {
                status: actual.status,
                applicationName: actual.applicationName,
                version: actual.version
            };
            const expected = {
                "service": "sdettestnode",
                "version": "1.0.0"
              }
            
            assert.deepEqual(actual, expected);
        });
    });
    
    after((done) => {
       
        done();
    });
});