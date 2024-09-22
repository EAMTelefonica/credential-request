import Employee from '#models/employee'
import Tool from '#models/tool'

export default class EmployeeUtils {
  async UpdateEmployeeDataForTool(employee: Employee, tool: Tool, value: string) {
    switch (tool.tool_name) {
      case 'Tarjeta telefonica':
        employee.card_id = value
        break
      case 'G-user':
        employee.matricula_hi = value
        break
      case 'IGRI':
        employee.igri = value
        break
      case 'Confluence':
        employee.confluence_id = value
        break
      case 'Buzon Fo Support':
        employee.has_front_office = true
        break
      case 'Buzon OpenGateway':
        employee.has_open_gateway = true
        break
      case 'Udo':
        employee.udo = value
        break
      case 'Teams':
        employee.teams = true
        break
      case 'ITSM':
        employee.itsm = value
        break
      case 'vivohac':
        employee.has_azure_hac_br = true
        break
      case 'vivo':
        employee.has_azure_4p_br = true
        break
      default:
        break
    }
    await employee.save()
  }
}
