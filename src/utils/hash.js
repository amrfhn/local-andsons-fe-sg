import { createHash } from 'crypto'

export function generateHash(data, algorithm = 'sha256') {
  if (!data) {
    return undefined
  }

  return createHash(algorithm)
    .update(data)
    .digest('hex')
}
