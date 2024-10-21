import Employee from '#models/employee'
import Tool from '#models/tool'
import EmailService from '#services/email_service'
import EmployeeUtils from '#services/employee_util_service'
import UdoUtils from '#services/udo_util_service'
import { inject } from '@adonisjs/core'
import { cuid } from '@adonisjs/core/helpers'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import drive from '@adonisjs/drive/services/main'

@inject()
export default class RequestToolsController {
  constructor(
    protected emailService: EmailService,
    protected employeeUtils: EmployeeUtils,
    protected udoUtils: UdoUtils
  ) {}

  /**
   * Display a list of resource
   */
  async index({ params, view }: HttpContext) {
    const employee = await Employee.findByOrFail('id', params.employee_id)

    return view.render('pages/employees/employee_request_tools.edge', { employee })
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ response, request, params }: HttpContext) {
    const disk = drive.use()
    const stringuid = `/temp/${cuid()}`
    const tempPath = `storage/${stringuid}`
    const employee = await Employee.findByOrFail('id', params.employee_id)
    const matriculaHi = request.input('matricula_hi')
    const email = request.input('email')
    const fechaNacimiento = request.input('fecha_nacimiento')
    const sexo = request.input('sexo')
    const edocivil = request.input('edocivil')
    const pagerduty = request.input('pagerduty')
    const autItsm = request.file('aut_itsm', {
      size: '2mb',
    })
    console.log(autItsm)
    const cuidautItsm = `${autItsm?.clientName}`
    await autItsm?.move(app.makePath(tempPath), {
      name: cuidautItsm,
    })

    employee.correo_front_office = email
    employee.matricula_hi = matriculaHi
    employee.save()
    //envio de correos request
    console.log('at controller', [fechaNacimiento, sexo, edocivil])
    await this.emailService.sendEmailAllTools(
      employee,
      fechaNacimiento,
      sexo,
      edocivil,
      `${tempPath}/${cuidautItsm}`
    )
    await disk.deleteAll(stringuid)
    //fin envio de correos request
    try {
      const udoVideo = await this.udoUtils.createUdoForHeramientasVideo(employee, pagerduty)

      const udoHAC = await this.udoUtils.createUdoForHAC(employee)

      const udoAzure4p = await this.udoUtils.createUdoForAzure4P(employee)

      const udoITSM = await this.udoUtils.createUdoITSM(employee)
      console.log(udoVideo, udoHAC, udoAzure4p, udoITSM)

      // envio de correo con udos
      await this.emailService.sendUdos(
        employee,
        udoVideo.eid,
        udoHAC.eid,
        udoAzure4p.eid,
        udoITSM.eid
      )
      // fin envio de correos con udos
    } catch (error) {
      console.log(['error', error])
    }
    // fin de creacion de udo

    return response.redirect().toRoute('employees.show', [employee.id])
  }

  /**
   * Show individual record
   */
  async show({}: HttpContext) {}

  /**
   * Edit individual record
   */
  async edit({ params, view }: HttpContext) {
    const employee = await Employee.findByOrFail('id', params.employee_id)
    const udoVideoBaja = '1'
    const udoAzure4pBaja = '2'
    const udoHacBaja = '3'
    const udoITSMBaja = '4'
    console.log(employee)
    console.log('esto es una prueba')
    return view.render('emailtemplate/send_udosbaja', {
      employee,
      udoVideoBaja,
      udoAzure4pBaja,
      udoHacBaja,
      udoITSMBaja,
    })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ request, params, response }: HttpContext) {
    // const values = request.all()
    const employee = await Employee.findByOrFail('id', params.employee_id)
    const toolRequest = await employee
      .related('requests')
      .query()
      .where('id', params.id)
      .firstOrFail()
    const tool = await Tool.findByOrFail('id', toolRequest.toolId)
    toolRequest.request_status = request.input('status')
    toolRequest.acceso = request.input('acceso')
    toolRequest.comentario = request.input('comentario')
    await toolRequest.save()
    this.employeeUtils.UpdateEmployeeDataForTool(
      employee,
      tool,
      request.input('acceso'),
      request.input('correofo')
    )
    return response.redirect().back()
  }

  /**
   * Delete record
   */
  async destroy({}: HttpContext) {}
}
