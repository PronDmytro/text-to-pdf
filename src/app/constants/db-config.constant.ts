import { DBConfig } from 'ngx-indexed-db';

export const DB_CONFIG: DBConfig = {
  name: 'MyDb',
  version: 1,
  isDefault: true,
  objectStoresMeta: [{
    store: 'converted-files',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'createdAt', keypath: 'createdAt', options: { unique: false } },
      { name: 'file', keypath: 'file', options: { unique: false } },
    ],
  }],
};
