import Employee from '#models/employee'
import Tool from '#models/tool'

export default class ToolRequestService {
  async createRequestForIgri(employee: Employee) {
    const igri = await Tool.findByOrFail('tool_name', 'IGRI')
    await employee
      .related('requests')
      .firstOrCreate({ toolId: igri.id, request_type: 'ALTA', request_status: 'SOLICITADA' })
  }
  async createRequestForConfluence(employee: Employee) {
    const confluence = await Tool.findByOrFail('tool_name', 'Confluence')
    await employee
      .related('requests')
      .firstOrCreate({ toolId: confluence.id, request_type: 'ALTA', request_status: 'SOLICITADA' })
  }
  async createRequestForBuzonFoSupport(employee: Employee) {
    const buzonFo = await Tool.findByOrFail('tool_name', 'Buzon Fo Support')
    await employee
      .related('requests')
      .firstOrCreate({ toolId: buzonFo.id, request_type: 'ALTA', request_status: 'SOLICITADA' })
  }
  async createRequestForBuzonFoCustomerSupport(employee: Employee) {
    const buzonFo = await Tool.findByOrFail('tool_name', 'Buzon OpenGateway')
    await employee
      .related('requests')
      .firstOrCreate({ toolId: buzonFo.id, request_type: 'ALTA', request_status: 'SOLICITADA' })
  }
  async createRequestForUDO(employee: Employee) {
    const udo = await Tool.findByOrFail('tool_name', 'Udo')
    await employee
      .related('requests')
      .firstOrCreate({ toolId: udo.id, request_type: 'ALTA', request_status: 'SOLICITADA' })
  }
  async createRequestForTeams(employee: Employee) {
    const teams = await Tool.findByOrFail('tool_name', 'Teams')
    await employee
      .related('requests')
      .firstOrCreate({ toolId: teams.id, request_type: 'ALTA', request_status: 'SOLICITADA' })
  }
  async createRequestForITSM(employee: Employee) {
    const ITSM = await Tool.findByOrFail('tool_name', 'ITSM')
    await employee
      .related('requests')
      .firstOrCreate({ toolId: ITSM.id, request_type: 'ALTA', request_status: 'SOLICITADA' })
  }
  async createRequestForVivohac(employee: Employee) {
    const vivohac = await Tool.findByOrFail('tool_name', 'vivohac')
    await employee
      .related('requests')
      .firstOrCreate({ toolId: vivohac.id, request_type: 'ALTA', request_status: 'SOLICITADA' })
  }
  async createRequestForVivoForm(employee: Employee) {
    const vivo = await Tool.findByOrFail('tool_name', 'vivo')
    await employee
      .related('requests')
      .firstOrCreate({ toolId: vivo.id, request_type: 'ALTA', request_status: 'SOLICITADA' })
  }
}
