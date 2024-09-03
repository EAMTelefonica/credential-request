import Employee from '#models/employee'
import EmailService from '#services/email_service'
import { inject } from '@adonisjs/core'
import { cuid } from '@adonisjs/core/helpers'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import drive from '@adonisjs/drive/services/main'

@inject()
export default class AltasController {
  constructor(protected emailService: EmailService) {}
  async alta({ view }: HttpContext) {
    return view.render('pages/employees/employee_request.edge')
  }
  async procesarAlta({ request, response }: HttpContext) {
    const disk = drive.use()
    const stringuid = `/temp/${cuid()}`
    const tempPath = `storage/${stringuid}`
    const values = request.all()
    const employee = await Employee.firstOrCreate({
      firstname: values.firstname,
      lastname: values.lastname,
      identification_type: values.identification_type,
      identification_number: values.identification_number,
      role: values.role,
    })
    const formulario = request.file('formulario', {
      size: '2mb',
    })
    const cuidformulario = `${formulario?.clientName}`
    await formulario?.move(app.makePath(tempPath), {
      name: cuidformulario,
    })

    const fotocarnet = request.file('fotocarnet', {
      size: '2mb',
    })
    const cuidfotocarnet = `${fotocarnet?.clientName}`

    await fotocarnet?.move(app.makePath(tempPath), { name: cuidfotocarnet })

    const fotodocu = request.file('fotodocu', {
      size: '2mb',
    })

    const cuidfotodocu = `${fotodocu?.clientName}`
    await fotodocu?.move(app.makePath(tempPath), { name: cuidfotodocu })

    await this.emailService.sendEmailFromAlta(
      `${tempPath}/${cuidformulario}`,
      `${tempPath}/${cuidfotocarnet}`,
      `${tempPath}/${cuidfotodocu}`,
      employee
    )
    await disk.deleteAll(stringuid)
    await this.emailService.sendEmailForGuser(employee, values.EmailTechM)
    console.log(values)
    return response.redirect().back()
  }
  async vaciar({}: HttpContext) {}
}
