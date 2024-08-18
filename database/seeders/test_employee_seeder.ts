import Employee from '#models/employee'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Employee.firstOrCreate({
      firstname: 'testfirstname',
      lastname: 'testlastname',
      role: 'operador',
      identification_type: 'DNI',
      identification_number: 'A65465',
    })
  }
}
