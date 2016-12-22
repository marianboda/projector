import koa from 'koa'
import serve from 'koa-static'
import path from 'path'
import session from 'koa-session'
import mount from 'koa-mount'
import Grant from 'grant-koa'

const authConfig = {
  server: {
    protocol: 'http',
    host: 'localhost:3000',
    callback: '/callback',
    transport: 'session',
    state: true,
  },
  google: {
    key: 'xxxxxx',
    secret: 'xxxxxx',
    scope: ['profile', 'email'],
    redirect_uri: 'http://localhost:3000/connect/google/callback',
  }
}

const grant = new Grant(authConfig)
const app = koa()

app.keys = ['grant']
app.use(session(app))
app.use(mount(grant))

app.use(serve(path.resolve(__dirname, '..', 'dist')))
app.use(serve(path.resolve(__dirname, 'static')))

app.use(function *(){
  // this.body = 'Hello :)'
  console.log(this.session.grant.response.access_token)
  this.body = JSON.stringify(this.query, null, 2)
  // way to check token info: https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=_____
})

app.listen(3000)
