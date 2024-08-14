import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    fullName: vine.any(),
    email: vine
      .string()
      .trim()
      .unique(async (db, value, _field) => {
        const result = await db.from('users').select('id').where('email', value)
        return result.length ? false : true
      }),
    password: vine.string().trim(),
  })
)

export const updateUserValidator = vine.compile(
  vine.object({
    fullName: vine.any(),
    email: vine.string().trim(),
    password: vine.string().trim(),
  })
)

export const sessionUpdateUserValidator = vine.compile(
  vine.object({
    fullName: vine.any(),
    email: vine.string().trim(),
    password: vine.string().trim(),
    passwordconf: vine.string().sameAs('password'),
  })
)
