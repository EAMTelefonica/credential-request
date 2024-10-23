import Employee from '#models/employee'
import { inject } from '@adonisjs/core'
import app from '@adonisjs/core/services/app'
import mail from '@adonisjs/mail/services/main'
import ToolRequestService from './tool_request_service.js'

@inject()
export default class EmailService {
  constructor(protected toolRequest: ToolRequestService) {}
  async sentEmailForFrontoffice(employee: Employee) {
    await mail.send((message) => {
      message
        .to('evely.adrianzamorales.ext@telefonica.com')
        .cc('evely.adrianzamorales.ext@telefonica.com')
        .bcc('evely.adrianzamorales.ext@telefonica.com')
        .from('evely.adrianzamorales.ext@telefonica.com')
        .subject('test prueba')
        .text('prueba para frontoffice' + employee)
      // .htmlView('template', info)
    })
  }
  async sendEmailFromAlta(
    formulario: string,
    fotocarnet: string,
    fotodocu: string,
    employee: Employee
  ) {
    console.log(app.makePath(formulario))
    console.log(app.makePath(fotocarnet))
    console.log(app.makePath(fotodocu))
    await mail.send((message) => {
      message
        .attach(app.makePath(formulario))
        .attach(app.makePath(fotocarnet))
        .attach(app.makePath(fotodocu))
        .to('evely.adrianzamorales.ext@telefonica.com')
        .cc('evely.adrianzamorales.ext@telefonica.com')
        .bcc('evely.adrianzamorales.ext@telefonica.com')
        .from('evely.adrianzamorales.ext@telefonica.com')
        .subject(`Solicitud de acceso para ${employee.firstname} ${employee.lastname}`)
        .htmlView('emailtemplate/alta_tarjeta.edge', { employee })
    })
  }
  async sendEmailForGuser(fotocarnet: string, employee: Employee, emailtech: string) {
    console.log(app.makePath(fotocarnet))
    await mail.send((message) => {
      message
        .attach(app.makePath(fotocarnet))
        .to('evely.adrianzamorales.ext@telefonica.com')
        .cc('evely.adrianzamorales.ext@telefonica.com')
        .bcc('evely.adrianzamorales.ext@telefonica.com')
        .from('evely.adrianzamorales.ext@telefonica.com')
        .subject(`Alta usuario nuevo en guser ${employee.firstname} ${employee.lastname}`)
        .htmlView('emailtemplate/alta_guser.edge', { employee, emailtech })
    })
  }

  async sendEmailAllTools(
    employee: Employee,
    fechaNacimiento: string,
    edocivil: string,
    sexo: string,
    aut_itsmPath: string,
    autItsmtooPath: string
  ) {
    console.log('at senemailall', [fechaNacimiento, edocivil, sexo])
    await this.sendAltaIgri(employee)
    await this.sendAltaConfluence(employee)
    await this.sendBuzonesFo(employee)
    await this.sendAltaUdo(employee)
    await this.sendAltaTeams(employee)
    await this.sendAltaITSM(employee, aut_itsmPath, autItsmtooPath)
    await this.sendAltavivohac(employee)
    await this.sendAltavivoform(employee, fechaNacimiento, edocivil, sexo)
  }

  async sendAltaIgri(employee: Employee) {
    await mail.send((message) => {
      message
        .to('evely.adrianzamorales.ext@telefonica.com')
        .cc('evely.adrianzamorales.ext@telefonica.com')
        .bcc('evely.adrianzamorales.ext@telefonica.com')
        .from('evely.adrianzamorales.ext@telefonica.com')
        .subject(`Alta usuario igri `)
        .htmlView('emailtemplate/alta_igri.edge', { employee })
    })
    await this.toolRequest.createRequestForIgri(employee)
  }
  async sendAltaConfluence(employee: Employee) {
    await mail.send((message) => {
      message
        .to('evely.adrianzamorales.ext@telefonica.com')
        .cc('evely.adrianzamorales.ext@telefonica.com')
        .bcc('evely.adrianzamorales.ext@telefonica.com')
        .from('evely.adrianzamorales.ext@telefonica.com')
        .subject(`Alta usuario confluence `)
        .htmlView('emailtemplate/alta_confluence.edge', { employee })
    })
    await this.toolRequest.createRequestForConfluence(employee)
  }
  async sendBuzonesFo(employee: Employee) {
    await mail.send((message) => {
      message
        .to('evely.adrianzamorales.ext@telefonica.com')
        .cc('evely.adrianzamorales.ext@telefonica.com')
        .bcc('evely.adrianzamorales.ext@telefonica.com')
        .from('evely.adrianzamorales.ext@telefonica.com')
        .subject(`grupos AD - o365 y buzón front.office.gvp-support y frontoffice_customersupport`)
        .htmlView('emailtemplate/alta_buzonesFo.edge', { employee })
    })
    await this.toolRequest.createRequestForBuzonFoSupport(employee)
    await this.toolRequest.createRequestForBuzonFoCustomerSupport(employee)
  }

  async sendAltaUdo(employee: Employee) {
    await mail.send((message) => {
      message
        .to('evely.adrianzamorales.ext@telefonica.com')
        .cc('evely.adrianzamorales.ext@telefonica.com')
        .bcc('evely.adrianzamorales.ext@telefonica.com')
        .from('evely.adrianzamorales.ext@telefonica.com')
        .subject(`Solicitud creacion de Usuario UDO `)
        .htmlView('emailtemplate/alta_udo.edge', { employee })
    })
    await this.toolRequest.createRequestForUDO(employee)
  }
  async sendAltaTeams(employee: Employee) {
    await mail.send((message) => {
      message
        .to('evely.adrianzamorales.ext@telefonica.com')
        .cc('evely.adrianzamorales.ext@telefonica.com')
        .bcc('evely.adrianzamorales.ext@telefonica.com')
        .from('evely.adrianzamorales.ext@telefonica.com')
        .subject(`Solicitud acceso a Teams `)
        .htmlView('emailtemplate/alta_teams.edge', { employee })
    })
    await this.toolRequest.createRequestForTeams(employee)
  }
  async sendAltaITSM(employee: Employee, aut_itsmPath: string, autItsmtooPath: string) {
    await mail.send((message) => {
      message
        .attach(app.makePath(aut_itsmPath))
        .attach(app.makePath(autItsmtooPath))
        .to('evely.adrianzamorales.ext@telefonica.com')
        .cc('evely.adrianzamorales.ext@telefonica.com')
        .bcc('evely.adrianzamorales.ext@telefonica.com')
        .from('evely.adrianzamorales.ext@telefonica.com')
        .subject(`Alta en buzones ITSM`)
        .htmlView('emailtemplate/alta_solicitud_itsm.edge', { employee })
    })
    await this.toolRequest.createRequestForITSM(employee)
  }
  async sendAltavivohac(employee: Employee) {
    await mail.send((message) => {
      message
        .to('evely.adrianzamorales.ext@telefonica.com')
        .cc('evely.adrianzamorales.ext@telefonica.com')
        .bcc('evely.adrianzamorales.ext@telefonica.com')
        .from('evely.adrianzamorales.ext@telefonica.com')
        .subject(`Acceso azure vivo HAC nuevo usuario BR`)
        .htmlView('emailtemplate/alta_vivo_hac.edge', { employee })
    })
    await this.toolRequest.createRequestForVivohac(employee)
  }
  async sendAltavivoform(
    employee: Employee,
    fechaNacimiento: string,
    edocivil: string,
    sexo: string
  ) {
    console.log('at SendAltavivo', [fechaNacimiento, edocivil, sexo])
    await mail.send((message) => {
      message
        .to('evely.adrianzamorales.ext@telefonica.com')
        .cc('evely.adrianzamorales.ext@telefonica.com')
        .bcc('evely.adrianzamorales.ext@telefonica.com')
        .from('evely.adrianzamorales.ext@telefonica.com')
        .subject(`Acceso azure vivo nuevo usuario BR`)
        .htmlView('emailtemplate/alta_vivoform.edge', { employee, fechaNacimiento, edocivil, sexo })
    })
    await this.toolRequest.createRequestForVivoForm(employee)
  }
  async sendUdos(
    employee: Employee,
    udoVideo: string,
    udoHAC: string,
    udoAzure4p: string,
    udoITSM: string
  ) {
    console.log('at SendUDos')
    await mail.send((message) => {
      message
        .to('evely.adrianzamorales.ext@telefonica.com')
        .cc('evely.adrianzamorales.ext@telefonica.com')
        .bcc('evely.adrianzamorales.ext@telefonica.com')
        .from('evely.adrianzamorales.ext@telefonica.com')
        .subject(`Aperturas de Udos para alta de usuario Front-Office`)
        .htmlView('emailtemplate/send_udos.edge', {
          employee,
          udoVideo,
          udoHAC,
          udoAzure4p,
          udoITSM,
        })
    })
  }
  async sendAllEmailsBajas(employee: Employee) {
    await this.sendEmailForBajaGuser(employee)
    await this.sendBajaUdo(employee)
    await this.sendvivoBajaform(employee)
  }
  // Baja de herramientas
  async sendEmailForBajaGuser(employee: Employee) {
    await mail.send((message) => {
      message

        .to('evely.adrianzamorales.ext@telefonica.com')
        .cc('evely.adrianzamorales.ext@telefonica.com')
        .bcc('evely.adrianzamorales.ext@telefonica.com')
        .from('evely.adrianzamorales.ext@telefonica.com')
        .subject(`Baja usuario en guser ${employee.firstname} ${employee.lastname}`)
        .htmlView('emailtemplate/baja_guser.edge', { employee })
    })
    await this.toolRequest.createRequestForBajaGuser(employee)
  }
  async sendBajaUdo(employee: Employee) {
    await mail.send((message) => {
      message
        .to('evely.adrianzamorales.ext@telefonica.com')
        .cc('evely.adrianzamorales.ext@telefonica.com')
        .bcc('evely.adrianzamorales.ext@telefonica.com')
        .from('evely.adrianzamorales.ext@telefonica.com')
        .subject(`Solicitud Deshabilitar Usuario UDO `)
        .htmlView('emailtemplate/baja_udo.edge', { employee })
    })
    await this.toolRequest.createRequestForBajaUDO(employee)
  }
  async sendvivoBajaform(employee: Employee) {
    await mail.send((message) => {
      message
        .to('evely.adrianzamorales.ext@telefonica.com')
        .cc('evely.adrianzamorales.ext@telefonica.com')
        .bcc('evely.adrianzamorales.ext@telefonica.com')
        .from('evely.adrianzamorales.ext@telefonica.com')
        .subject(`Baja azure vivo usuario BR`)
        .htmlView('emailtemplate/baja_vivoform.edge', { employee })
    })
    await this.toolRequest.createRequestForBajaVivoForm(employee)
  }
  async sendUdosBajaEml(
    employee: Employee,
    udoVideoBaja: string,
    udoAzure4pBaja: string,
    udoHacBaja: string,
    udoITSMBaja: string
  ) {
    console.log('at SendUDos')
    await mail.send((message) => {
      message
        .to('evely.adrianzamorales.ext@telefonica.com')
        .cc('evely.adrianzamorales.ext@telefonica.com')
        .bcc('evely.adrianzamorales.ext@telefonica.com')
        .from('evely.adrianzamorales.ext@telefonica.com')
        .subject(`Aperturas de Udos para bajas de usuario Front-Office`)
        .htmlView('emailtemplate/send_udosbaja.edge', {
          employee,
          udoVideoBaja,
          udoAzure4pBaja,
          udoHacBaja,
          udoITSMBaja,
        })
    })
  }
}
