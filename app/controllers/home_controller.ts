import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class HomeController {
  async home({ view }: HttpContext) {
    const employeesNumber = await db.from('employees').count('* as total')
    const Total = employeesNumber[0].total
    console.log(employeesNumber)
    return view.render('pages/home', { Total })
  }
}
