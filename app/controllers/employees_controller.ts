import Employee from '#models/employee'
import type { HttpContext } from '@adonisjs/core/http'

export default class EmployeesController {
  /**
   * Display a list of resource
   */
  async index({ view }: HttpContext) {
    const employees = await Employee.all()
    return view.render('pages/employees/employees_list', { employees })
  }

  /**
   * Display form to create a new record
   */
  async create({ view }: HttpContext) {
    return view.render('pages/employees/employee_create_form')
  }

  /**
   * Handle form submission for the create action
   */
  async store({ response, request }: HttpContext) {
    const values = request.except(['_csrf'])
    console.log(values)
    const employee = await Employee.firstOrCreate(values)
    console.log(employee.serialize())
    return response.redirect().toRoute('employees.index')
  }

  /**
   * Show individual record
   */
  async show({ view, params }: HttpContext) {
    const emp = await Employee.findOrFail(params.id)
    const requests = await emp.related('requests').query().preload('employee').preload('tool')

    return view.render('pages/employees/employee_detail', { emp, requests })
  }

  /**
   * Edit individual record
   */
  async edit({ params, view }: HttpContext) {
    const employee = await Employee.find(params.id)

    return view.render('pages/employees/employee_edit_form', { employee })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ response, params, request }: HttpContext) {
    const employee = await Employee.findOrFail(params.id)
    const values = request.except(['_csrf'])
    employee.firstname = values.firstname
    employee.lastname = values.lastname
    employee.role = values.role
    employee.identification_type = values.identification_type
    employee.identification_number = values.identification_number
    await employee.save()
    response.redirect().toRoute('employees.index')
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const employee = await Employee.findOrFail(params.id)
    await employee.delete()
    response.redirect().toRoute('employees.index')
  }
}
