import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class DataController {
  async AllData({}: HttpContext) {
    const data = await db.rawQuery(`SELECT 
    E.FIRSTNAME,
	E.LASTNAME,
	E.ROLE,
	E.IDENTIFICATION_NUMBER,
	E.CARD_ID,
	E.IGRI,
	E.ITSM,
	E.UDO,
	E.TEAMS,
	E.HAS_FRONT_OFFICE,
	E.HAS_OPEN_GATEWAY,
	E.CORREO_FRONT_OFFICE,
	E.MATRICULA_HI,
	E.CONFLUENCE_ID,
	E.ATLAS_ID,
	E.ZEUS_ID,
	E.ZABBIX_ID,
	E.CALICUS_ID,
	E.YOUBORA_ID,
	E.PAGERDUTY_ID,
	E.DOMINIO_EXTERNAL_PROD_ID,
	E.DOMINIO_OTT_PROD_ID,
	E.DOMINIO_OPG,
	E.DOMINIO_VIDEO,
	E.MIB,
	E.HAS_AZURE_4_P_ES,
	E.HAS_AZURE_HAC_BR,
	E.HAS_AZURE_4_P_BR,
	E.HAS_BASTION_HAC,
	E.HAS_SHAREPOINT_GVP_AZURE FROM EMPLOYEES E`)

    return { data: data.rows }
  }
}
