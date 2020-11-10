const assert = require('assert')
const proxyquire = require('proxyquire')
const movies = require('../utils/mocks/movies.js')

const { moviesMock, MoviesServiceMock } = require('../utils/mocks/movies.js')
const testServer = require('../utils/testServer')

describe('routes - movies', function() {
    const route = proxyquire('../routes/movies', {
        '../services/movies': MoviesServiceMock
    })

    const request = testServer(route)
    describe('GET /movies', function() {
        it('should respond with status 200', function(done) {
            request.get('/api/movies').expect(200, done)
        })
        it('should respond with the list of movies', function(done) {
                request.get('/api/movies').end((err, res) => {
                    assert.deepEqual(res.body, {
                        data: moviesMock,
                        message: 'movies listed'
                    })
                    done()
                })
            })
            // it('should respond requested movie', function(done) {
            //     // request.get('/api/movies/5ee306da9083a63e7b376de8').end((err, res) => {
            //     //     assert.deepEqual(res.body, {
            //     //         data: moviesMock[0],
            //     //         message: 'movies retrieved'
            //     //     })
            //     //     done()
            //     // })
            //     const movieId = moviesMock[0].id
            //     request
            //         .get(`/api/movies/${movieId}`)
            //         .set('Accept', 'application/json')
            //         .expect('Content-Type', /json/)
            //         .expect(200, done);
            // })
    })
    describe('POST /movies', function() {
        it('should respond with status 201', function(done) {
            request.post('/api/movies').expect(201, done)
        })
        it('should respond with the movie created', function(done) {
            request.post('/api/movies').end((err, res) => {
                assert.deepEqual(res.body, {
                    data: moviesMock[0],
                    message: 'movie created'
                })
                done()
            })
        })
    })
})