import { defineData } from '@aws-amplify/backend';
import { a } from '@aws-amplify/backend';

const schema = a.schema({
  AccountDetail: a
    .model({
      name: a.string().required(),
      email: a.string().required(),
      address: a.string().required(),
      city: a.string().required(),
      state: a.string().required(),
      zipCode: a.string().required(),
      userId: a.string().required(),
      createdAt: a.datetime(),
    })
    .authorization(allow => allow.public().to(['create', 'read'])),
});

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});