import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource.js';
import { data } from './data/resource.js';  // Even for .ts files, use .js in imports

defineBackend({
  auth,
  data,
});
