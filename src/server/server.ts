import { Express } from 'express'

export type AppConfig = {
    app: Express
}

export function startServer({ app }:AppConfig): Express  {

  app.get('/', (_, res) => {
    res.status(200).send({ status: 'ok' })
  })

  return app
}
