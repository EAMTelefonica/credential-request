// import type { HttpContext } from '@adonisjs/core/http'
import Employee from '#models/employee'
import EmailService from '#services/email_service'
import { inject } from '@adonisjs/core'
// import { cuid } from '@adonisjs/core/helpers'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class BajasController {
  constructor(protected emailService: EmailService) {}

  async procesarBaja({ request, response }: HttpContext) {
    const id = request.input('id')
    const employee = await Employee.query().where('id', id).firstOrFail()

    await this.emailService.sendAllEmailsBajas(employee)

    return response.redirect().back()
  }
}
