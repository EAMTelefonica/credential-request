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
const RequestsController = () => import('#controllers/requests_controller')
const AltasController = () => import('#controllers/altas_controller')

router.on('/').render('pages/login/login.edge')
router.on('/template').render('all_template')
router.on('/home').render('pages/home').use(middleware.auth()).as('home')

router.on('/edit').render('pages/employees/employee_detail_form.edge').as('detail_form.edit')
router
  .on('/request_tools')
  .render('pages/employees/employee_request_tools.edge')
  .as('employee.request.tools')

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

// resources para los empleados
router
  .resource('employees', EmployeesController)
  .use(['index', 'create', 'store', 'update', 'show', 'edit', 'destroy'], middleware.auth())
// resources para las solicitudes
router
  .resource('employees.request', RequestsController)
  .use(['index', 'create', 'store', 'update', 'show', 'edit', 'destroy'], middleware.auth())

// rutas alta
router.get('alta', [AltasController, 'alta']).as('alta')
router.post('processAlta', [AltasController, 'procesarAlta']).as('procesar_alta')
router.get('borrar', [AltasController, 'vaciar'])
