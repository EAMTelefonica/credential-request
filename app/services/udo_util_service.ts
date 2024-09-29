import Employee from '#models/employee'
import env from '#start/env'
import { inject } from '@adonisjs/core'
import { base64 } from '@adonisjs/core/helpers'
import got from 'got'
import ToolRequestService from './tool_request_service.js'

@inject()
export default class UdoUtils {
  constructor(protected toolRequest: ToolRequestService) {}
  protected baseurl = env.get('UDO_URL')
  protected udoUser = env.get('UDO_USER')
  protected UdoPassword = env.get('UDO_PASS')
  protected auth = base64.encode(this.udoUser + ':' + this.UdoPassword)
  async test() {
    const url = 'https://httpbin.org/anything'

    const options = {
      json: {
        documentName: 'Quick Start',
      },
    }

    const data = await got.post(url, options)
    console.log(data.body)
  }

  async createUdoForHeramientasVideo(employee: Employee) {
    const url = `http://${this.baseurl}/api/tt/contacts/?retrieve_param=eid`
    const options = {
      //   path: '/api/tt/contacts/?retrieve_param=eid',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': `Basic ${this.auth}`,
      },
      json: {
        type: 'Order',
        customer_name: 'Front office',
        originator_group: ['gvp_noc_front_office'],
        video_service: ['Monitorizacion'],
        responsible_group: 'VIDEO_L2_Servicio',
        subject: 'nuevos usuarios de FO',
        affected_obs: ['None'],
        functionality: ['Monitorizacion'],
        detection_mode: 'N/A',
        video_plataforma: ['CDN', 'GVP'],
        video_grupo_categoria: 'Global',
        video_proactive_tool: ['Atlas', 'Calicux', 'Zabbix'],
        description: {
          code: 'free_text_template',
          contexts: [
            [
              `Se solicitan accesos para un nuevo compañero de Front_Office España a las siguientes herramientas: \n- L2_Servicio:Autorizar y generar Usuario Dominio BOB, Acceso a los Technnical Description de la CDN, Portal de Azure GVP (Transferir a lab1) \n- Lab1:MIB3 (Transferir a FO) \n- FO_España:AD (VPN de operaciones OTTPROD, EXTERNALPROD, VIDEOPLATFORM, OPG) - (Transferir a Tools) \n- Tools:Zeus/Calicux/Zabbix 5.0/ Atlas/ PagerDuty / Youbora (Transferir a FO)\n\nNuevo compañero: ${employee.firstname} ${employee.lastname}\nEmail: ${employee.correo_front_office} \n\nSi fuera necesario un usuario de ejemplo usar los de Pedro Rafael Perez Soto`,
            ],
          ],
        },
        annotations: [],
        attachments: [],
        customerservice: 'CS_OTT_VOD',
        public: false,
      },
    }
    let responseData
    try {
      responseData = await got.post(url, options).json()
    } catch (error) {
      console.log(error)
    }
    console.log('acontinuacion la respuesta del udo')
    console.log(responseData)
    await this.toolRequest.createRequestUdoHerramientasVideo(
      employee,
      this.baseurl,
      responseData?.eid
    )

    return responseData
  }
}
