import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const env = createEnv({
  server: {
    NODE_ENV: z.string(),
    MUX_TOKEN_ID: z.string(),
    MUX_TOKEN_SECRET: z.string(),
  },

  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    MUX_TOKEN_ID: process.env.MUX_TOKEN_ID,
    MUX_TOKEN_SECRET: process.env.MUX_TOKEN_SECRET
  }
})