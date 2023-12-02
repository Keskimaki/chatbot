import { z } from 'zod'

import { chatOptionsSchema } from './validators/openai'

export type ChatOptions = z.infer<typeof chatOptionsSchema>
