import { isAdmin } from '#abilities/main'
import Employee from '#models/employee'
import Tool from '#models/tool'
import EmailService from '#services/email_service'
import { inject } from '@adonisjs/core'
import { cuid } from '@adonisjs/core/helpers'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import drive from '@adonisjs/drive/services/main'

@inject()
export default class AltasController {
  constructor(protected emailService: EmailService) {}
  async alta({ bouncer, view, session, response }: HttpContext) {
    if (await bouncer.denies(isAdmin)) {
      session.flash('error-notification', {
        type: 'error',
        title: 'Usted no es administrador',
        // information: messages,
      })

      return response.redirect().back()
    }
    return view.render('pages/employees/employee_request.edge')
  }

  // Alta Guser
  async procesarAlta({ bouncer, session, request, response }: HttpContext) {
    if (await bouncer.denies(isAdmin)) {
      session.flash('error-notification', {
        type: 'error',
        title: 'Usted no es administrador',
        // information: messages,
      })

      return response.redirect().back()
    }
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
    // const formulario = request.file('formulario', {
    //   size: '2mb',
    // })
    // const cuidformulario = `${formulario?.clientName}`
    // await formulario?.move(app.makePath(tempPath), {
    //   name: cuidformulario,
    // })

    const fotocarnet = request.file('fotocarnet', {
      size: '2mb',
    })
    const cuidfotocarnet = `${fotocarnet?.clientName}`

    await fotocarnet?.move(app.makePath(tempPath), { name: cuidfotocarnet })

    // const fotodocu = request.file('fotodocu', {
    //   size: '2mb',
    // })

    // const cuidfotodocu = `${fotodocu?.clientName}`
    // await fotodocu?.move(app.makePath(tempPath), { name: cuidfotodocu })

    // await this.emailService.sendEmailFromAlta(
    //   `${tempPath}/${cuidformulario}`,
    //   `${tempPath}/${cuidfotocarnet}`,
    //   `${tempPath}/${cuidfotodocu}`,
    //   employee
    // )

    await this.emailService.sendEmailForGuser(
      `${tempPath}/${cuidfotocarnet}`,
      employee,
      values.EmailTechM
    )
    console.log(values)

    // const toolTarjeta = await Tool.findByOrFail('tool_name', 'Tarjeta telefonica')
    const toolGuser = await Tool.findByOrFail('tool_name', 'G-user')

    // await employee
    //   .related('requests')
    //   .firstOrCreate({ toolId: toolTarjeta.id, request_type: 'ALTA', request_status: 'SOLICITADA' })

    await employee
      .related('requests')
      .firstOrCreate({ toolId: toolGuser.id, request_type: 'ALTA', request_status: 'SOLICITADA' })
    await disk.deleteAll(stringuid)
    return response.redirect().back()
  }

  // Alta Tarjeta
  async procesarAltaTarjeta({ bouncer, session, request, response }: HttpContext) {
    if (await bouncer.denies(isAdmin)) {
      session.flash('error-notification', {
        type: 'error',
        title: 'Usted no es administrador',
        // information: messages,
      })

      return response.redirect().back()
    }

    const disk = drive.use()
    const stringuid = `/temp/${cuid()}`
    const tempPath = `storage/${stringuid}`
    const values = request.all()
    const employee = await Employee.firstOrCreate({
      firstname: values.firstname,
      lastname: values.lastname,
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

    // await this.emailService.sendEmailForGuser(
    //   `${tempPath}/${cuidfotocarnet}`,
    //   employee,
    //   values.EmailTechM
    // )
    console.log(values)

    const toolTarjeta = await Tool.findByOrFail('tool_name', 'Tarjeta telefonica')
    // const toolGuser = await Tool.findByOrFail('tool_name', 'G-user')

    await employee
      .related('requests')
      .firstOrCreate({ toolId: toolTarjeta.id, request_type: 'ALTA', request_status: 'SOLICITADA' })

    // await employee
    //   .related('requests')
    //    .firstOrCreate({ toolId: toolGuser.id, request_type: 'ALTA', request_status: 'SOLICITADA' })

    await disk.deleteAll(stringuid)
    return response.redirect().back()
  }
}
