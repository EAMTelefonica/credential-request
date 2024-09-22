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

    await Tool.firstOrCreate({
      tool_name: 'IGRI',
      required_view: '',
      updated_view: '',
      email_template: '',
      email_to: '',
      email_bc: '',
      email_cc: '',
    })

    await Tool.firstOrCreate({
      tool_name: 'Confluence',
      required_view: '',
      updated_view: '',
      email_template: '',
      email_to: '',
      email_bc: '',
      email_cc: '',
    })
    await Tool.firstOrCreate({
      tool_name: 'Buzon Fo Support',
      required_view: '',
      updated_view: '',
      email_template: '',
      email_to: '',
      email_bc: '',
      email_cc: '',
    })
    await Tool.firstOrCreate({
      tool_name: 'Buzon OpenGateway',
      required_view: '',
      updated_view: '',
      email_template: '',
      email_to: '',
      email_bc: '',
      email_cc: '',
    })
    await Tool.firstOrCreate({
      tool_name: 'Udo',
      required_view: '',
      updated_view: '',
      email_template: '',
      email_to: '',
      email_bc: '',
      email_cc: '',
    })
    await Tool.firstOrCreate({
      tool_name: 'Teams',
      required_view: '',
      updated_view: '',
      email_template: '',
      email_to: '',
      email_bc: '',
      email_cc: '',
    })
    await Tool.firstOrCreate({
      tool_name: 'ITSM',
      required_view: '',
      updated_view: '',
      email_template: '',
      email_to: '',
      email_bc: '',
      email_cc: '',
    })
    await Tool.firstOrCreate({
      tool_name: 'vivohac',
      required_view: '',
      updated_view: '',
      email_template: '',
      email_to: '',
      email_bc: '',
      email_cc: '',
    })
    await Tool.firstOrCreate({
      tool_name: 'vivo',
      required_view: '',
      updated_view: '',
      email_template: '',
      email_to: '',
      email_bc: '',
      email_cc: '',
    })
  }
}
