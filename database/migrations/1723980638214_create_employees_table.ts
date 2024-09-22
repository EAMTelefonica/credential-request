import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'employees'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.text('firstname')
      table.text('lastname')
      table.enum('role', ['operador', 'cordinador'], {
        useNative: true,
        enumName: 'role_enum',
        existingType: false,
      })
      table.enum('identification_type', ['DNI', 'NIE', 'PASSPORT'], {
        useNative: true,
        enumName: 'identification_type_enum',
        existingType: false,
      })
      table.text('identification_number')
      table.text('card_id')
      table.text('igri')
      table.text('itsm')
      table.text('udo')
      table.boolean('teams')
      table.boolean('has_front_office')
      table.boolean('has_open_gateway')
      table.text('correo_front_office')
      table.text('matricula_hi')
      table.text('confluence_id')
      table.text('atlas_id')
      table.text('zeus_id')
      table.text('zabbix_id')
      table.text('calicus_id')
      table.text('youbora_id')
      table.text('pagerduty_id')
      table.text('dominio_external_prod_id')
      table.text('dominio_ott_prod_id')
      table.text('dominio_opg')
      table.text('dominio_video')
      table.text('mib')
      table.text('has_azure_4p_es')
      table.text('has_azure_hac_br')
      table.text('has_azure_4p_br')
      table.text('has_bastion_hac')
      table.text('has_sharepoint_gvp_azure')
      table.text('last_updatedted_by')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
    this.schema.raw('DROP TYPE IF EXISTS "identification_type_enum"')
    this.schema.raw('DROP TYPE IF EXISTS "role_enum"')
  }
}
