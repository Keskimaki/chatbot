import winston from 'winston'

import { inProduction } from '../../config.js'

const { combine, timestamp, printf, splat } = winston.format

const transports = []

transports.push(new winston.transports.File({ filename: 'debug.log' }))

if (!inProduction) {
  const devFormat = printf(({ level, message, timestamp, ...rest }) => {
    try {
      rest = JSON.stringify(rest) as any
    } catch {
      null
    }

    return `${timestamp} ${level}: ${message} ${rest}`
  })

  transports.push(
    new winston.transports.Console({
      level: 'debug',
      format: combine(splat(), timestamp(), devFormat),
    })
  )
} else {
  const levels: { [key: string]: number } = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6,
  }

  const prodFormat = winston.format.printf(({ level, ...rest }) =>
    JSON.stringify({
      level: levels[level],
      ...rest,
    })
  )
  transports.push(new winston.transports.Console({ format: prodFormat }))
}

const logger = winston.createLogger({ transports })

export default logger