import Employee from '#models/employee'
import app from '@adonisjs/core/services/app'
import mail from '@adonisjs/mail/services/main'
export default class EmailService {
  async sentEmailForFrontoffice(employee: Employee) {
    const info = {}
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
  async sendEmailForGuser(employee: Employee, emailtech: string) {
    await mail.send((message) => {
      message
        .to('evely.adrianzamorales.ext@telefonica.com')
        .cc('evely.adrianzamorales.ext@telefonica.com')
        .bcc('evely.adrianzamorales.ext@telefonica.com')
        .from('evely.adrianzamorales.ext@telefonica.com')
        .subject(`Alta usuario nuevo en guser ${employee.firstname} ${employee.lastname}`)
        .htmlView('emailtemplate/alta_guser.edge', { employee, emailtech })
    })
  }
}
