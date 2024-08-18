import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'requests'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('employee_id').unsigned().references('employees.id').onDelete('CASCADE')
      table.integer('tool_id').unsigned().references('tools.id').onDelete('CASCADE')
      table.enum('request_type', ['ALTA', 'BAJA', 'MODIFICACION'], {
        useNative: true,
        enumName: 'request_type_enum',
        existingType: false,
      })
      table.enum('request_status', ['SOLICITADA', 'NO', 'SI'], {
        useNative: true,
        enumName: 'request_status_enum',
        existingType: false,
      })

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}