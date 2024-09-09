import Tool from '#models/tool'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Tool.firstOrCreate({
      tool_name: 'Tarjeta telefonica',
      required_view: '',
      updated_view: '',
      email_template: '',
      email_to: '',
      email_bc: '',
      email_cc: '',
    })

    await Tool.firstOrCreate({
      tool_name: 'G-user',
      required_view: '',
      updated_view: '',
      email_template: '',
      email_to: '',
      email_bc: '',
      email_cc: '',
    })
  }
}
