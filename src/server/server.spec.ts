import express from 'express'
import request from 'supertest'
import { startServer } from './server'

describe('Server', () => {
  const app = startServer({ app: express() })

  describe('/api', () => {


    describe('/api/status GET', () => {
      it('returns status ok', async () => {
        const testRequest = await request(app)
          .get('/')
          .expect(200)
          .expect('Content-Type', /json/)

        expect(testRequest.body).toEqual({ status: 'ok' })
      })
    })
  })
})
