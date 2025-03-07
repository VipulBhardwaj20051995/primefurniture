import { defineData } from '@aws-amplify/backend';
import { a } from '@aws-amplify/backend';

// Create the schema
const schema = a.schema({
  AccountDetail: a.model({
      name: a.string().required(),
      email: a.string().required(),
      address: a.string().required(),
      city: a.string().required(),
      state: a.string().required(),
      zipCode: a.string().required(),
      userId: a.string().required(),
      createdAt: a.datetime(),
    })
    // Fix: Use the correct authorization syntax for Gen 2
    .authorization((allow) => [
      // Allow anyone to create accounts
      allow.unAuthenticated().to(['create']),
      // Allow authenticated users to read account details
      allow.authenticated().to(['read']),
      // Allow owners of their own data
      allow.owner().to(['read', 'update', 'delete'])
    ])
});

// Export the data resource
export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});