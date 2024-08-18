/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
const SessionController = () => import('#controllers/session_controller')
const EmployeesController = () => import('#controllers/employees_controller')

router.on('/').render('welcome')
router.on('/home').render('page/home')

//routes for login and logout
router.on('/login').render('pages/login/login.edge').as('login')
router.post('login', [SessionController, 'store']).as('loginuser')
router
  .get('/logout', async ({ auth, response }) => {
    await auth.use('web').logout()
    return response.redirect('/login')
  })
  .use(middleware.auth())
  .as('logout')

// resources for the employee
router.resource('employees', EmployeesController)
