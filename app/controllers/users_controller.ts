import { isAdmin } from '#abilities/main'
import User from '#models/user'
import { createUserValidator, updateUserValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  /**
   * Display a list of resource
   */
  async index({ bouncer, session, response, view }: HttpContext) {
    if (await bouncer.denies(isAdmin)) {
      session.flash('error-notification', {
        type: 'error',
        title: 'Usted no es administrador',
        // information: messages,
      })

      response.redirect().back()
    }
    const users = await User.all()
    return view.render('pages/users/users_list', { users })
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ bouncer, request, response, session }: HttpContext) {
    // const groupsfromRequest = request.input('groups')
    // let groups
    if (await bouncer.denies(isAdmin)) {
      session.flash('error-notification', {
        type: 'error',
        title: 'Usted no es administrador to create users',
        // information: messages,
      })
      return response.redirect().back()
    }
    try {
      await request.validateUsing(createUserValidator)
    } catch (error) {
      const messages = error.messages.map((e: any) => e.message)
      session.flash('error-notification', {
        type: 'error',
        title: 'creation of user failed due to the following',
        information: messages,
      })
      return response.redirect().toRoute('users.index')
    }

    const fullName = request.input('fullName')
    const email = request.input('email')
    const password = request.input('password')
    const role = request.input('role')
    await User.firstOrCreate({ fullName: fullName, email: email, password: password, role: role })

    session.flash('success-notification', {
      type: 'success',
      title: 'user created Succesfully',
      // information: messages,
    })
    return response.redirect().toRoute('users.index')
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ bouncer, response, params, request, session }: HttpContext) {
    if (await bouncer.denies(isAdmin)) {
      session.flash('error-notification', {
        type: 'error',
        title: 'Usted no es administrador to modify users',
        // information: messages,
      })
      return response.redirect().back()
    }
    try {
      await request.validateUsing(updateUserValidator)
    } catch (error) {
      const messages = error.messages.map((e: any) => e.message)
      session.flash('error-notification', {
        type: 'error',
        title: 'update of user failed due to the following',
        information: messages,
      })
      return response.redirect().toRoute('users.index')
    }

    const fullName = request.input('fullName')
    const email = request.input('email')
    const password = request.input('password')
    const role = request.input('role')
    const user = await User.query().where('id', params.id).firstOrFail()
    user.fullName = fullName
    user.email = email
    user.password = password
    user.role = role
    await user.save()
    session.flash('success-notification', {
      type: 'success',
      title: 'user Updated Succesfully',
      // information: messages,
    })

    return response.redirect().toRoute('users.index')
  }

  /**
   * Delete record
   */
  async destroy({ bouncer, response, params, session }: HttpContext) {
    if (await bouncer.denies(isAdmin)) {
      session.flash('error-notification', {
        type: 'error',
        title: 'Usted no es administrador to delete users',
        // information: messages,
      })
      return response.redirect().back()
    }
    const user = await User.findOrFail(params.id)
    await user.delete()
    session.flash('success-notification', {
      type: 'success',
      title: 'user Deleted Succesfully',
      // information: messages,
    })
    return response.redirect().toRoute('users.index')
  }
}
