import User from '#models/user'
import { sessionUpdateUserValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
export default class SessionController {
  async store({ request, auth, response }: HttpContext) {
    /**
     * Step 1: Get credentials from the request body
     */
    const { email, password } = request.only(['email', 'password'])

    /**
     * Step 2: Verify credentials
     */
    const user = await User.verifyCredentials(email, password)

    /**
     * Step 3: Login user
     */
    await auth.use('web').login(user)

    /**
     * Step 4: Send them to a protected route
     */
    response.redirect('home')
  }

  /*form to edit authenticated users*/
  async edit({ view }: HttpContext) {
    return view.render('pages/users/user/edit_user')
  }

  async update({ request, view, response, session, auth }: HttpContext) {
    try {
      await request.validateUsing(sessionUpdateUserValidator)
    } catch (error) {
      const messages = error.messages.map((e: any) => e.message)
      session.flash('error-notification', {
        type: 'error',
        title: 'update of user failed due to the following',
        information: messages,
      })
      return response.redirect().toRoute('profile')
    }
    const user = auth.getUserOrFail()
    const fullName = request.input('fullName')
    const email = request.input('email')
    const password = request.input('password')
    // const passwordconfirmation = request.input('passwordconf')

    // const user = await User.query().where('id', loggedUser.id)
    user.fullName = fullName
    user.email = email
    user.password = password
    await user.save()
    return view.render('pages/users/user/user_edit')
  }
}
