import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Employee from './employee.js'
import Tool from './tool.js'

export default class ToolRequest extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare employeeId: number

  @column()
  declare toolId: number

  @column()
  declare request_type: string

  @column()
  declare request_status: string

  @column()
  @belongsTo(() => Employee)
  declare employee: BelongsTo<typeof Employee>

  @column()
  @belongsTo(() => Tool)
  declare tool: BelongsTo<typeof Tool>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
