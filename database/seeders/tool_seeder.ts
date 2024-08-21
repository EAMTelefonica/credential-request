import Tool from '#models/tool'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Tool.firstOrCreate({
      tool_name: 'Front Office',
      RequiredView: '',
      UpdatedView: '',
      EmailTemplate: '',
      email_to: '',
      email_bc: '',
      email_cc: '',
    })
  }
}
