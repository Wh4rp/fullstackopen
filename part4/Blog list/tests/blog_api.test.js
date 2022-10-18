const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

describe('get requests', () => {
    test('blogs are returned as JSON', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('a specific blog is within the returned blogs', async () => {
        const response = await api.get('/api/blogs')
        const contents = response.body.map(r => r.title)

        expect(contents).toContain(
            'Type wars'
        )
    })

    test('correct length of blogs returned', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body)
            .toHaveLength(helper.initialBlogs.length)
    })
})

describe('post requests', () => {
    const newBlog = {
        title: 'test title',
        author: 'me',
        url: 'https://google.com',
        likes: 10
    }

    test('post a new blog', async () => {
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

        const response = await api.get('/api/blogs')
        const contents = response.body.map(r => r.title)
        expect(contents)
            .toContain(newBlog.title)
    })
})

afterAll(() => {
    mongoose.connection.close()
})