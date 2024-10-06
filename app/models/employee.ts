import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import ToolRequest from './tool_request.js'

export default class Employee extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare firstname: string

  @column()
  declare lastname: string

  @column()
  declare role: string

  @column()
  declare identification_type: string

  @column()
  declare identification_number: string

  @column()
  declare card_id: string

  @column()
  declare has_front_office: boolean
  @column()
  declare has_open_gateway: boolean
  @column()
  declare correo_front_office: string
  @column()
  declare matricula_hi: string

  @column()
  declare igri: string

  @column()
  declare udo: string

  @column()
  declare itsm: string

  @column()
  declare teams: boolean

  @column()
  declare confluence_id: string
  @column()
  declare atlas_id: string
  @column()
  declare zeus_id: string
  @column()
  declare zabbix_id: string
  @column()
  declare calicus_id: string
  @column()
  declare youbora_id: string
  @column()
  declare pagerduty_id: string

  @column()
  declare pagerduty_platform: string

  @column()
  declare dominio_external_prod_id: string
  @column()
  declare dominio_ott_prod_id: string
  @column()
  declare dominio_opg: string
  @column()
  declare dominio_video: string
  @column()
  declare mib: string
  @column()
  declare has_azure_4p_es: boolean
  @column()
  declare has_azure_hac_es: boolean
  @column()
  declare has_azure_hac_br: boolean
  @column()
  declare has_azure_4p_br: boolean
  @column()
  declare has_bastion_hac: boolean
  @column()
  declare has_sharepoint_gvp_azure: boolean

  @column()
  declare last_updatedted_by: string

  @hasMany(() => ToolRequest)
  declare requests: HasMany<typeof ToolRequest>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
