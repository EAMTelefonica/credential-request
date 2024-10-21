// import type { HttpContext } from '@adonisjs/core/http'
import Employee from '#models/employee'
import EmailService from '#services/email_service'
import UdoUtils from '#services/udo_util_service'
import { inject } from '@adonisjs/core'
// import { cuid } from '@adonisjs/core/helpers'
import type { HttpContext } from '@adonisjs/core/http'
import logger from '@adonisjs/core/services/logger'

@inject()
export default class BajasController {
  constructor(
    protected emailService: EmailService,
    protected udoUtils: UdoUtils
  ) {}

  async procesarBaja({ request, response }: HttpContext) {
    const id = request.input('id')
    const employee = await Employee.query().where('id', id).firstOrFail()
    try {
      await this.emailService.sendAllEmailsBajas(employee)
      const udoVideoBaja = await this.udoUtils.createUdoForHeramientasVideoBaja(employee)

      const udoAzure4pBaja = await this.udoUtils.createUdoForAzure4PBaja(employee)

      const udoHacBaja = await this.udoUtils.createUdoForHACBaja(employee)

      const udoITSMBaja = await this.udoUtils.createUdoITSMBaja(employee)
      console.log(udoVideoBaja, udoAzure4pBaja, udoHacBaja, udoITSMBaja)
      await this.emailService.sendUdosBajaEml(
        employee,
        udoVideoBaja.eid,
        udoAzure4pBaja.eid,
        udoHacBaja.eid,
        udoITSMBaja.eid
      )
    } catch (error) {
      console.log(error)
      logger.error(error)
    }

    return response.redirect().back()
  }
}
