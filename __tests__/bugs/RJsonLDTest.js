
const fs = require("fs");
var logger = require('../../src/logger/logger');
const { default: RJsonParser } = require('../../src/parser/RJsonParser');
const { default: RJsonParserError } = require('../../src/parser/RJsonParserError');

var instance = null;

beforeEach(() => {
});


test('comma.json', () => {
    try {
        fs.readFile("./__tests__/bugs/comma.json", {encoding: 'utf8'},function (err, data) {
            if (err) {
                logger.error(err);
            }
            logger.debug(data);
            instance = new RJsonParser(data);
            var obj = instance.parse();
            logger.debug('----------------');
            var appendable = {
                destination: ""
            }
            obj.formatJsonToString(appendable, -1);
            logger.debug(appendable.destination);
        });

    } catch (e) {
        logger.debug(e.stack);
        throw e;
    }
});

test('example.json', () => {
    try {
        fs.readFile("./__tests__/bugs/example.json", {encoding: 'utf8'},function (err, data) {
            if (err) {
                logger.error(err);
            }
            logger.debug(data);
            instance = new RJsonParser(data);
            var obj = instance.parse();
            logger.debug('----------------');
            var appendable = {
                destination: ""
            }
            obj.formatJsonToString(appendable, -1);
            logger.debug(appendable.destination);
        });

    } catch (e) {
        logger.debug(e.stack);
        throw e;
    }
});

test('jsonld.json', () => {
    try {
        fs.readFile("./__tests__/bugs/jsonld.json", {encoding: 'utf8'},function (err, data) {
            if (err) {
                logger.error(err);
            }
            logger.debug(data);
            instance = new RJsonParser(data);
            var obj = instance.parse();
            logger.debug('----------------');
            var appendable = {
                destination: ""
            }
            obj.formatJsonToString(appendable, -1);
            logger.debug(appendable.destination);
        });

    } catch (e) {
        logger.debug(e.stack);
        throw e;
    }
});

test('unicode.json', () => {
    try {
        fs.readFile("./__tests__/bugs/arc.json", {encoding: 'utf8'},function (err, data) {
            if (err) {
                logger.error(err);
            }
            logger.debug(data);
            instance = new RJsonParser(data);
            var obj = instance.parse();
            logger.debug('----------------');
            var appendable = {
                destination: ""
            }
            obj.formatJsonToString(appendable, -1);
            logger.debug(appendable.destination);
        });

    } catch (e) {
        logger.debug(e.stack);
        throw e;
    }
});