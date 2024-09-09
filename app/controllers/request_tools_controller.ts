import Employee from '#models/employee'
import type { HttpContext } from '@adonisjs/core/http'

export default class RequestToolsController {
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
  async store({ request }: HttpContext) {}

  /**
   * Show individual record
   */
  async show({ view, params }: HttpContext) {}

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
