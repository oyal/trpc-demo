import express from 'express'
import * as trpcExpress from '@trpc/server/adapters/express'
import cors from 'cors'
import { publicProcedure, router } from './trpc'
import { z } from 'zod'

export interface User {
  id: number
  name: string
}

let users: User[] = [
  { id: 1, name: 'zs' },
  { id: 2, name: 'ls' },
  { id: 3, name: 'ww' },
  { id: 4, name: 'zl' },
]

const appRouter = router({
  getUsers: publicProcedure.query(() => {
    return users
  }),
  getUser: publicProcedure.input(z.number()).query(async (arg) => {
    console.log(users, 'users')
    return users.find((u) => u.id === arg.input)
  }),
  addUser: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation((arg) => {
      const user = {
        id: users.length + 1,
        name: arg.input.name,
      }
      users.push(user)
      return user
    }),
  updateUser: publicProcedure
    .input(z.object({ id: z.number(), name: z.string() }))
    .mutation((arg) => {
      const user = users.find((u) => u.id === arg.input.id)
      if (!user) {
        throw new Error('user not found')
      }
      user.name = arg.input.name
      return user
    }),
  deleteUser: publicProcedure.input(z.number()).mutation((arg) => {
    const index = users.findIndex((u) => u.id === arg.input)
    if (index === -1) {
      throw new Error('user not found')
    }
    const user = users[index]
    users.splice(index, 1)
    return user
  }),
})

export type AppRouter = typeof appRouter

const app = express()
const port = 8080

app.use(cors())
app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
  }),
)

app.listen(port, () => {
  console.log(`api-server listening at http://localhost:${port}`)
})
