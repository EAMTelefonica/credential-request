import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class Tool extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare tool_name: string

  @column()
  declare RequiredView: string

  @column()
  declare UpdatedView: string

  @column()
  declare EmailTemplate: string

  @column()
  declare email_to: string

  @column()
  declare email_cc: string

  @column()
  declare email_bc: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
