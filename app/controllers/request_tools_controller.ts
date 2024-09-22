import Employee from '#models/employee'
import EmailService from '#services/email_service'
import { inject } from '@adonisjs/core'
import { cuid } from '@adonisjs/core/helpers'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import drive from '@adonisjs/drive/services/main'

@inject()
export default class RequestToolsController {
  constructor(protected emailService: EmailService) {}
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
  async store({ request, params }: HttpContext) {
    const disk = drive.use()
    const stringuid = `/temp/${cuid()}`
    const tempPath = `storage/${stringuid}`
    const employee = await Employee.findByOrFail('id', params.employee_id)
    const matriculaHi = request.input('matricula_hi')
    const email = request.input('email')
    const fechaNacimiento = request.input('fecha_nacimiento')
    const sexo = request.input('sexo')
    const edocivil = request.input('edocivil')
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
    console.log('at controller', [fechaNacimiento, sexo, edocivil])
    await this.emailService.sendEmailAllTools(
      employee,
      fechaNacimiento,
      sexo,
      edocivil,
      `${tempPath}/${cuidautItsm}`
    )
    await disk.deleteAll(stringuid)
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
