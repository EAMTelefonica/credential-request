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
const AltasController = () => import('#controllers/altas_controller')
const RequestToolsController = () => import('#controllers/request_tools_controller')
const DataController = () => import('#controllers/data_controller')
const HomeController = () => import('#controllers/home_controller')
const BajasController = () => import('#controllers/bajas_controller')
const UsersController = () => import('#controllers/users_controller')

router.on('/').render('pages/login/login.edge')

router.on('/template').render('emailtemplate/firma')
router.get('home', [HomeController, 'home']).as('home').use(middleware.auth())

router.on('/edit').render('pages/employees/employee_detail_form.edge').as('detail_form.edit')

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

//Rutas request tools
router
  .resource('employees.request_tools', RequestToolsController)
  .use(['index', 'create', 'store', 'update', 'show', 'edit', 'destroy'], middleware.auth())
  .only(['index', 'show', 'store', 'update', 'edit'])

// rutas alta
router.get('alta', [AltasController, 'alta']).as('alta').use(middleware.auth())
router
  .post('processAlta', [AltasController, 'procesarAlta'])
  .as('procesar_alta')
  .use(middleware.auth())

// rutas Baja
router
  .post('processbaja/:id', [BajasController, 'procesarBaja'])
  .as('procesar_baja')
  .use(middleware.auth())

// rutas data
router.get('data', [DataController, 'AllData']).as('alldata').use(middleware.auth())

//routes for the user to modify its data
router.get('profile', [SessionController, 'edit']).use(middleware.auth()).as('profile')

router
  .post('profile_update', [SessionController, 'update'])
  .use(middleware.auth())
  .as('profileupdate')

// routes for the user Adminstration
router
  .resource('users', UsersController)
  .use(['index', 'create', 'store', 'update', 'show', 'edit', 'destroy'], middleware.auth())
