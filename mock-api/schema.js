const schema = {
  type: 'object',
  properties: {
    signin: {
      type: 'object',
      properties: {
        result: {
          type: 'string',
          chance: 'guid',
        },
      },
      required: ['result'],
    },
    signout: {
      type: 'object',
      properties: {
        result: true,
      },
      required: ['result'],
    },
    forgotPassword: {
      type: 'object',
      properties: {
        result: true,
      },
      required: ['result'],
    },
    validateResetPasswordToken: {
      type: 'object',
      properties: {
        result: true,
      },
      required: ['result'],
    },
    resetPassword: {
      type: 'object',
      properties: {
        result: true,
      },
      required: ['result'],
    },
    events: {
      type: 'array',
      minItems: 1,
      maxItems: 500,
      items: {
        type: 'object',
        properties: {
          id: {
            $ref: '#/definitions/positiveInt',
          },
          name: {
            type: 'string',
            chance: 'company',
          },
          startDate: {
            type: 'number',
            chance: 'hammertime',
          },
          endDate: {
            type: 'number',
            chance: 'hammertime',
          },
          createdDate: {
            type: 'number',
            chance: 'hammertime',
          },
          createdBy: {
            type: 'string',
            chance: 'name',
          },
        },
        required: [
          'id',
          'name',
          'startDate',
          'endDate',
          'createdDate',
          'createdBy',
        ],
      },
    },
  },
  required: [
    'events',
    'signin',
    'signout',
    'forgotPassword',
    'validateResetPasswordToken',
    'resetPassword',
  ],
  definitions: {
    positiveInt: {
      type: 'integer',
      minimum: 0,
      exclusiveMinimum: true,
      unique: true,
    },
  },
}

module.exports = schema
