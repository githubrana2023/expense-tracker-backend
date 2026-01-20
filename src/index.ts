import { Hono } from 'hono'
import { cors } from 'hono/cors'

import envConfig from './config/envConfig'
import router from './routes'

const app = new Hono()

//middlewares
app.use(cors({
  origin: "*"
}))



app.route('/api', router)

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default {
  port: envConfig.PORT,
  fetch: app.fetch,
} 
