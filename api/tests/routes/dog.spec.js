/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');

const agent = session(app);
const dog = {
  id: 15,
  name: 'Pug',
  height: '12',
  weight: '15',
  life_span: '15',
  image: 'www.henry.com',
};

describe('Videogame routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Dog.sync({ force: true })
    .then(() => Dog.create(dog)));
  describe('POST /dog does not work without uuid', () => {
    xit('should get error', () =>
      agent.get('/dog').expect(404)
    );
  });
});
