import Employee from '#models/employee'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

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
    const requestsAlta = await emp
      .related('requests')
      .query()
      .where('request_type', 'ALTA')
      .preload('employee')
      .preload('tool')

    const requestBaja = await emp
      .related('requests')
      .query()
      .where('request_type', 'BAJA')
      .preload('employee')
      .preload('tool')

    const nuevaQuery =
      await db.rawQuery(`select (select request_status from tool_requests where employee_id=${emp.id} and request_type='ALTA' and tool_id=2 ) as status_guser,
(select count(id) from tool_requests where employee_id=${emp.id} and request_type='ALTA' )  as conteo_alta,
(select count(id) from tool_requests where employee_id=${emp.id} and request_type='BAJA') as conteo_baja`)

    console.log(nuevaQuery.rows)
    let canRequestBaja = false
    //puede solicitar baja si, el guser esta aprobado, no tiene bajas solicitadas, las altas solicitadas son mayor que 2 (guser, y frontoffice)
    if (
      nuevaQuery.rows[0].status_guser === 'SI' &&
      nuevaQuery.rows[0].conteo_baja === '0' &&
      Number.parseInt(nuevaQuery.rows[0].conteo_alta) > 2
    ) {
      canRequestBaja = true
    }

    let canRequestAll = 'disabled'
    if (
      nuevaQuery.rows[0].status_guser === 'SI' &&
      Number.parseInt(nuevaQuery.rows[0].conteo_alta) <= 2
    ) {
      canRequestAll = 'enabled'
    }
    console.log(canRequestAll, canRequestBaja)
    return view.render('pages/employees/employee_detail', {
      emp,
      requestsAlta,
      requestBaja,
      canRequestAll,
      canRequestBaja,
    })
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
