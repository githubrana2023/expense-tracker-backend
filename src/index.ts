import { Hono } from 'hono'
import { cors } from 'hono/cors'

import envConfig from './config/envConfig'
import router from './routes'
import authRouter from './modules/auth/route'
import { authMiddleware } from '@/middlewares/auth-middleware'
import { AppType } from './types/app-type'
import { globalErrorHandler } from './middlewares/global-error'



const app = new Hono<AppType>()

//middlewares
app.use(cors({
  origin: "*"
}))



// Protected routes
app.use('/api/*', authMiddleware())


// Global error handling
app.onError(globalErrorHandler)




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
