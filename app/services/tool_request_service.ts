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
    const tool = await Tool.findByOrFail('tool_name', 'Udo')
    await employee
      .related('requests')
      .firstOrCreate({ toolId: tool.id, request_type: 'ALTA', request_status: 'SOLICITADA' })
  }
  async createRequestForTeams(employee: Employee) {
    const tool = await Tool.findByOrFail('tool_name', 'Teams')
    await employee
      .related('requests')
      .firstOrCreate({ toolId: tool.id, request_type: 'ALTA', request_status: 'SOLICITADA' })
  }
  async createRequestForITSM(employee: Employee) {
    const tool = await Tool.findByOrFail('tool_name', 'ITSM')
    await employee
      .related('requests')
      .firstOrCreate({ toolId: tool.id, request_type: 'ALTA', request_status: 'SOLICITADA' })
  }
  async createRequestForVivohac(employee: Employee) {
    const tool = await Tool.findByOrFail('tool_name', 'vivohac')
    await employee
      .related('requests')
      .firstOrCreate({ toolId: tool.id, request_type: 'ALTA', request_status: 'SOLICITADA' })
  }
  async createRequestForVivoForm(employee: Employee) {
    const tool = await Tool.findByOrFail('tool_name', 'vivo')
    await employee
      .related('requests')
      .firstOrCreate({ toolId: tool.id, request_type: 'ALTA', request_status: 'SOLICITADA' })
  }
  async createRequestFortool(employee: Employee, baseurl: string, eid: string) {
    const tool = await Tool.findByOrFail('tool_name', 'Calicux')
    await employee.related('requests').firstOrCreate({
      toolId: tool.id,
      request_type: 'ALTA',
      request_status: 'SOLICITADA',
      udo_host: baseurl,
      udo_number: eid ? eid : 'empty',
    })
  }
  async createRequestForAtlas(employee: Employee, baseurl: string, eid: string) {
    const tool = await Tool.findByOrFail('tool_name', 'Atlas')
    await employee.related('requests').firstOrCreate({
      toolId: tool.id,
      request_type: 'ALTA',
      request_status: 'SOLICITADA',
      udo_host: baseurl,
      udo_number: eid ? eid : 'empty',
    })
  }
  async createRequestForZeus(employee: Employee, baseurl: string, eid: string) {
    const tool = await Tool.findByOrFail('tool_name', 'Zeus')
    await employee.related('requests').firstOrCreate({
      toolId: tool.id,
      request_type: 'ALTA',
      request_status: 'SOLICITADA',
      udo_host: baseurl,
      udo_number: eid ? eid : 'empty',
    })
  }
  async createRequestForZabbix(employee: Employee, baseurl: string, eid: string) {
    const tool = await Tool.findByOrFail('tool_name', 'Zabbix')
    await employee.related('requests').firstOrCreate({
      toolId: tool.id,
      request_type: 'ALTA',
      request_status: 'SOLICITADA',
      udo_host: baseurl,
      udo_number: eid ? eid : 'empty',
    })
  }
  async createRequestForYoubora(employee: Employee, baseurl: string, eid: string) {
    const tool = await Tool.findByOrFail('tool_name', 'Youbora')
    await employee.related('requests').firstOrCreate({
      toolId: tool.id,
      request_type: 'ALTA',
      request_status: 'SOLICITADA',
      udo_host: baseurl,
      udo_number: eid ? eid : 'empty',
    })
  }
  async createRequestForPagerDuty(employee: Employee, baseurl: string, eid: string) {
    const tool = await Tool.findByOrFail('tool_name', 'PagerDuty')
    await employee.related('requests').firstOrCreate({
      toolId: tool.id,
      request_type: 'ALTA',
      request_status: 'SOLICITADA',
      udo_host: baseurl,
      udo_number: eid ? eid : 'empty',
    })
  }
  async createRequestForDExternalPro(employee: Employee, baseurl: string, eid: string) {
    const tool = await Tool.findByOrFail('tool_name', 'Dominio externalPro')
    await employee.related('requests').firstOrCreate({
      toolId: tool.id,
      request_type: 'ALTA',
      request_status: 'SOLICITADA',
      udo_host: baseurl,
      udo_number: eid ? eid : 'empty',
    })
  }
  async createRequestForDOTTPro(employee: Employee, baseurl: string, eid: string) {
    const tool = await Tool.findByOrFail('tool_name', 'Dominio OTTPro')
    await employee.related('requests').firstOrCreate({
      toolId: tool.id,
      request_type: 'ALTA',
      request_status: 'SOLICITADA',
      udo_host: baseurl,
      udo_number: eid ? eid : 'empty',
    })
  }
  async createRequestForDOpenGateway(employee: Employee, baseurl: string, eid: string) {
    const tool = await Tool.findByOrFail('tool_name', 'Dominio OpenGateway')
    await employee.related('requests').firstOrCreate({
      toolId: tool.id,
      request_type: 'ALTA',
      request_status: 'SOLICITADA',
      udo_host: baseurl,
      udo_number: eid ? eid : 'empty',
    })
  }
  async createRequestForDVideoPlataforma(employee: Employee, baseurl: string, eid: string) {
    const tool = await Tool.findByOrFail('tool_name', 'Dominio VideoPlataforma')
    await employee.related('requests').firstOrCreate({
      toolId: tool.id,
      request_type: 'ALTA',
      request_status: 'SOLICITADA',
      udo_host: baseurl,
      udo_number: eid ? eid : 'empty',
    })
  }
  async createRequestForMIB(employee: Employee, baseurl: string, eid: string) {
    const tool = await Tool.findByOrFail('tool_name', 'MIB')
    await employee.related('requests').firstOrCreate({
      toolId: tool.id,
      request_type: 'ALTA',
      request_status: 'SOLICITADA',
      udo_host: baseurl,
      udo_number: eid ? eid : 'empty',
    })
  }
  async createRequestForSharePointGVPAzure(employee: Employee, baseurl: string, eid: string) {
    const tool = await Tool.findByOrFail('tool_name', 'SharePoint GVP Azure')
    await employee.related('requests').firstOrCreate({
      toolId: tool.id,
      request_type: 'ALTA',
      request_status: 'SOLICITADA',
      udo_host: baseurl,
      udo_number: eid ? eid : 'empty',
    })
  }
  async createRequestForTechnicalDescription(employee: Employee, baseurl: string, eid: string) {
    const tool = await Tool.findByOrFail('tool_name', 'Technical Description')
    await employee.related('requests').firstOrCreate({
      toolId: tool.id,
      request_type: 'ALTA',
      request_status: 'SOLICITADA',
      udo_host: baseurl,
      udo_number: eid ? eid : 'empty',
    })
  }
  async createRequestForBastionES(employee: Employee, baseurl: string, eid: string) {
    const tool = await Tool.findByOrFail('tool_name', 'Bastion HAC ES')
    await employee.related('requests').firstOrCreate({
      toolId: tool.id,
      request_type: 'ALTA',
      request_status: 'SOLICITADA',
      udo_host: baseurl,
      udo_number: eid ? eid : 'empty',
    })
  }
  async createRequestForAzureHacES(employee: Employee, baseurl: string, eid: string) {
    const tool = await Tool.findByOrFail('tool_name', 'Azure HAC ES')
    await employee.related('requests').firstOrCreate({
      toolId: tool.id,
      request_type: 'ALTA',
      request_status: 'SOLICITADA',
      udo_host: baseurl,
      udo_number: eid ? eid : 'empty',
    })
  }
  async createRequestUdoHerramientasVideo(employee: Employee, baseurl: string, eid: string) {
    await this.createRequestForAtlas(employee, baseurl, eid)
    await this.createRequestForZeus(employee, baseurl, eid)
    await this.createRequestForZabbix(employee, baseurl, eid)
    await this.createRequestFortool(employee, baseurl, eid)
    await this.createRequestForYoubora(employee, baseurl, eid)
    await this.createRequestForPagerDuty(employee, baseurl, eid)
    await this.createRequestForDExternalPro(employee, baseurl, eid)
    await this.createRequestForDOTTPro(employee, baseurl, eid)
    await this.createRequestForDOpenGateway(employee, baseurl, eid)
    await this.createRequestForDVideoPlataforma(employee, baseurl, eid)
    await this.createRequestForMIB(employee, baseurl, eid)
    await this.createRequestForSharePointGVPAzure(employee, baseurl, eid)
    await this.createRequestForTechnicalDescription(employee, baseurl, eid)
  }
  async createRequestUdoAzureHacBastionES(employee: Employee, baseurl: string, eid: string) {
    await this.createRequestForBastionES(employee, baseurl, eid)
    await this.createRequestForAzureHacES(employee, baseurl, eid)
  }
  async createRequestForAzure4PES(employee: Employee, baseurl: string, eid: string) {
    const tool = await Tool.findByOrFail('tool_name', 'Azure 4P ES')
    await employee.related('requests').firstOrCreate({
      toolId: tool.id,
      request_type: 'ALTA',
      request_status: 'SOLICITADA',
      udo_host: baseurl,
      udo_number: eid ? eid : 'empty',
    })
  }
  // async createRequestForItsm(employee: Employee, baseurl: string, eid: string) {
  //   const tool = await Tool.findByOrFail('tool_name', 'ITSM UDo')
  //   await employee.related('requests').firstOrCreate({
  //     toolId: tool.id,
  //     request_type: 'ALTA',
  //     request_status: 'SOLICITADA',
  //     udo_host: baseurl,
  //     udo_number: eid ? eid : 'empty',
  //   })
  // }
  async createRequestForBajaVivoForm(employee: Employee) {
    const tool = await Tool.findByOrFail('tool_name', 'vivo')
    await employee
      .related('requests')
      .firstOrCreate({ toolId: tool.id, request_type: 'BAJA', request_status: 'SOLICITADA' })
  }
  async createRequestForBajaUDO(employee: Employee) {
    const tool = await Tool.findByOrFail('tool_name', 'Udo')
    await employee
      .related('requests')
      .firstOrCreate({ toolId: tool.id, request_type: 'BAJA', request_status: 'SOLICITADA' })
  }
  async createRequestForBajaGuser(employee: Employee) {
    const toolGuser = await Tool.findByOrFail('tool_name', 'G-user')
    await employee
      .related('requests')
      .firstOrCreate({ toolId: toolGuser.id, request_type: 'BAJA', request_status: 'SOLICITADA' })
  }
}
