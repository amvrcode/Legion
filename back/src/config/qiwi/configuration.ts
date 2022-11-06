import { registerAs } from '@nestjs/config'

export default registerAs('qiwi', () => ({
  host: process.env.QIWI_API_URL,
  key: process.env.QIWI_API_KEY,
  adminPhone: process.env.QIWI_ADMIN_PHONE,
}))
