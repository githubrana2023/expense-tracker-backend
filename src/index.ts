import { Hono } from 'hono'
import { cors } from 'hono/cors'

import envConfig from './config/envConfig'
import router from './routes'
import authRouter from './modules/auth/route'
import { isTokenStartWithBearer } from './libs/utils'
import { ZodError } from 'zod'
import { verify } from 'hono/jwt'

const app = new Hono()

//middlewares
app.use(cors({
  origin: "*"
}))



// Protected routes
app.use('/api/*', async (c, next) => {
  const token = c.req.header('Authorization')
  if (!token) return c.json({ message: 'Unauthorized!' }, 401)

  if (!isTokenStartWithBearer(token)) return c.json({ message: 'Forbidden!' }, 402)
    
    const [,accessToken] = token.split(" ")

    const now =new Date().getTime()/1000

    const floor = Math.floor(now)

    console.log(now,floor)
  const payload = await verify(accessToken, envConfig.ACCESS_TOKEN_SECRET,'HS256')


  await next()
})


// Global error handling
app.onError(async (error, c) => {

  if (error instanceof ZodError) {

    return c.json({
      message: error.issues.map(iss => iss.message),
      custom: 422,
      error
    }, 400)
  }
  console.log({ error });

  return c.json({ error: error.message, from: 'global error' })
})




// Routes
app.route('/auth', authRouter)
app.route('/api', router)

app.get('/', (c) => {
  return c.text('Ping Pong🔥💥')
})

export default {
  port: envConfig.PORT,
  fetch: app.fetch,
} 
