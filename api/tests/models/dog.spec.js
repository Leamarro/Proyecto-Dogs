const { Dog, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Dog model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Dog.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Dog.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Dog.create({ name: 'Pug' });
      });
    });
    describe('image', () => {
      it('should throw an error if image is not a string', (done) => {
        Dog.create({image: 10})
          .then(() => done(new Error('It requires a valid type of image')))
          .catch(() => done());
      });
      it('should work when its a valid type of image', () => {
        Dog.create({ image: 'porfaaprobame.com' });
      });
    });
    describe('life_span', () => {
      it('should throw an error if life_span is null', (done) => {
        Dog.create({})
          .then(() => done(new Error('It requires a valid life span')))
          .catch(() => done());
      });
      it('should work when its a valid life_span', () => {
        Dog.create({ life_span: '12' });
      });
    });
  });
});
