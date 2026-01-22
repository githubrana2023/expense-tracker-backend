import { Hono } from 'hono'
import { cors } from 'hono/cors'

import envConfig from './config/envConfig'
import router from './routes'
import authRouter from './modules/auth/route'
import { isTokenStartWithBearer } from './libs/utils'
import { ZodError } from 'zod'
import { jwt, verify } from 'hono/jwt'
import { JWTPayload, JwtTokenExpired, JwtTokenInvalid } from 'hono/utils/jwt/types'

type S = {
  email: string,
  phone: string
}

const app = new Hono<{ Variables: S }>()

//middlewares
app.use(cors({
  origin: "*"
}))



// Protected routes
app.use('/api/*', async (c, next) => {
  const token = c.req.header('Authorization')
  if (!token) return c.json({ message: 'Unauthorized!' }, 401)

  if (!isTokenStartWithBearer(token)) return c.json({ message: 'Forbidden!' }, 402)

  const [, accessToken] = token.split(" ")

  const payload = await verify(accessToken, envConfig.ACCESS_TOKEN_SECRET, 'HS256')

  let iat
  let exp
  if (payload.iat) {
    iat = new Date(payload.iat * 1000)
  }
  if (payload.exp) {
    exp = new Date(payload.exp * 1000)
  }

  console.log({
    iat,
    exp,
    payload
  })


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

  if (error instanceof JwtTokenExpired || error instanceof JwtTokenInvalid) {
    return c.json({ error, from: 'global error exired token' }, 401)
  }

  console.log({ error });

  return c.json({ error, from: 'global error' })
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
