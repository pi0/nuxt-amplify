import { defineEventHandler } from 'h3'

export default defineEventHandler((event) => {
  return {
    headers: event.headers.entries(),
  }
})
