import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tools'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.text('tool_name')
      table.text('required_view')
      table.text('updated_view')
      table.text('email_template')
      table.text('email_to')
      table.text('email_cc')
      table.text('email_bc')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
