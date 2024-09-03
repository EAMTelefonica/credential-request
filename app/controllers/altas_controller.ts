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
    const values = request.all()
    const formulario = request.file('formulario', {
      size: '2mb',
    })
    const fotocarnet = request.file('fotocarnet')
    const fotodocu = request.file('fotodocu')
    const ubicacion = String(formulario?.tmpPath)

    await formulario?.move(app.makePath('storage/uploads'), {
      name: `${cuid()}.${formulario.extname}`,
    })
    // await this.emailService.sendEmailFromAlta(ubicacion, '', '')
    // console.log(values)
    console.log(formulario)
  }
  async vaciar({}: HttpContext) {
    console.log('intentando borrar')
    const disk = drive.use()
    console.log(disk)
    await disk.delete('/uploads/vqy668pjw6j7ofaefiaom7k9.txt')
    console.log('borrado?')
  }
}
