import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    //creando usuario evely
    await User.firstOrCreate({
      fullName: 'Evely',
      password: '123456',
      email: 'evely.adrianzamorales.ext@telefonica.com',
    })
  }
}
