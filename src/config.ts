import { config } from 'dotenv'
import * as yup from 'yup'

config()

const environmentSchema = yup
  .object({
    NODE_ENV: yup
      .string()
      .oneOf(['development', 'production'])
      .default('development'),

    TELEGRAM_TOKEN: yup.string().required(),
    TELEGRAM_CHAT_ID: yup.number().integer().required(),

    API_BASE_URL: yup.string().required(),

    COMPETITIONS: yup
      .array(yup.string().required())
      .required()
      .transform((value: string) => value.split(',')),
    PERSONAL_CODE: yup.string().required(),
  })
  .required()

const environment = environmentSchema.validateSync(process.env, {
  stripUnknown: true,
})

export = environment
