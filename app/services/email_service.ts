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
  async sendEmailFromAlta(formulario:string, fotocarnet:string, fotodocu:string){
    
    console.log(app.makePath(formulario))
    // await mail.send((message) => {
    //   message
    //   .attach(app.makePath(formulario))
    //     .to('evely.adrianzamorales.ext@telefonica.com')
    //     .cc('evely.adrianzamorales.ext@telefonica.com')
    //     .bcc('evely.adrianzamorales.ext@telefonica.com')
    //     .from('evely.adrianzamorales.ext@telefonica.com')
    //     .subject('test prueba')
    //     .text('prueba para frontoffice con archivos' )
    // })
  }
}
