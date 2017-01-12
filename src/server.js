import koa from 'koa'
import serve from 'koa-static'
import path from 'path'
import session from 'koa-session'
import mount from 'koa-mount'
import Grant from 'grant-koa'
import fetch from 'isomorphic-fetch'

import {googleKey, googleSecret} from '../.keys'

const authConfig = {
  server: {
    protocol: 'http',
    host: 'localhost:3000',
    callback: '/callback',
    transport: 'session',
    state: true,
  },
  google: {
    key: googleKey,
    secret: googleSecret,
    scope: ['profile', 'email'],
    redirect_uri: 'http://localhost:3000/connect/google/callback',
  }
}

const grant = new Grant(authConfig)
const app = koa()

app.keys = ['grant']
app.use(session(app))
app.use(mount(grant))

app.use(serve(path.resolve(__dirname, '..', 'public')))
app.use(serve(path.resolve(__dirname, 'static')))

// app.use('/session-info', function *(){
//   console.log('session info :)')
// })

// app.use(function *(next){
// })


app.use(function *(next){
  // this.body = 'Hello :)'
  if (this.url == '/session-info') {
    if (this.session && this.session.grant) {
      console.log(this.session.grant.response.access_token)
      yield fetch('https://www.googleapis.com/oauth2/v3/tokeninfo?access_token='+
        this.session.grant.response.access_token).then(i => i.json()).then(i => {
          this.body = JSON.stringify(i)
        })
    }
  } else {
    console.log(this.url)
    if (this.session && this.session.grant) {
      console.log(this.session.grant.response.access_token)
    }
    else {
      console.log('nonono nono')
    }
    this.body = JSON.stringify(this.query, null, 2)
  }
  // way to check token info: https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=_____
})

app.listen(3000)
