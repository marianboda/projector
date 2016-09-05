import koa from 'koa'
import serve from 'koa-static'
import path from 'path'

const app = koa()

app.use(serve(path.resolve(__dirname, '..', 'dist')))
app.use(serve(path.resolve(__dirname, 'static')))


// app.use(function *(){
//   this.body = 'Hello :)'
// })

app.listen(3000)
