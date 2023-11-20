import { defineEventHandler, useSession } from 'h3'

export default defineEventHandler(async (event) => {
  const session = await useSession(event, {
    password: '123456789012345678901234567890123456789012345678901234567890'
  })

  const visits: number = (session.data.visits || 0)+ 1
  await session.update({ visits })

  return {
    id: session.id,
    visits
  }
})
