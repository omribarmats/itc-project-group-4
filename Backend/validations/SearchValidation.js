const Ajv = require('ajv');
const ajv = new Ajv();

module.exports.FilteredSearchValidation = ajv.compile({
    type: 'object',
    properties: {
        quantity: { type: 'number' },
        location: {
            // type: ['string', 'object'],
            anyOf: [
                { type: "string" },
                { type: "object" }
            ],
        },
        places: { type: 'array' },
    },
    required: ['location'],
    additionalProperties: false,
})