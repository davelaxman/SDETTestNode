'use strict';

const
    {describe, it, before, after} = require('mocha'),
    assert = require('chai').assert,
    fork = require('child_process').fork,
    validator = require('jsonschema').Validator,
    peopleSchema = require('./schema/people'),
    api = require('./helpers/api-helper');

let  apiUnderTest = null;

describe('People Endpoint API Tests', function(){
    this.timeout(10000);
    // before ((done) => {

    //     apiUnderTest = fork('../server',[],{
    //         stdio:'pipe'
    //     })
    //     apiUnderTest.on('error', error=>{
    //         console.log(error);
    //     })
    //     apiUnderTest.on('message', msg=>{
    //         if(msg.contains('Server running at')){
    //             console.log(msg);
    //             done();
    //         }
    //         else{
    //             console.log(msg);
    //         }
    //     })
        
    // });

    describe("General Tests", () => {

        it('Ensures the GetPeople Endpoint returns data when a range is supplied', async () => {
            const actual = await api.getRequest("/getPeople?fromId=0&toId=10");
           
            //should return 10 people from the API
            assert.deepEqual(actual.length,10);
       
        });

        it('Validates the resulting people json against a schema', async () => {
            const actual = await api.getRequest("/getPeople?fromId=0&toId=10");
           let val = new validator();
           let result = val.validate(actual, peopleSchema);
            assert.isTrue(result.valid,JSON.stringify(result.errors, null,4));
        });
    });
    
    after((done) => {

        done();
    });
});