import Employee from '#models/employee'
import EmailService from '#services/email_service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class RequestsController {
  constructor(protected emailService: EmailService) {}
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {}

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ params, request }: HttpContext) {
    const employee = await Employee.findOrFail(params.employee_id)
    const typeOfRequest = request.input('requesttype')
    console.log(employee)
    console.log(typeOfRequest)
    if (typeOfRequest === 'frontoffice') {
      await this.emailService.sentEmailForFrontoffice(employee)
    }
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
  // async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
