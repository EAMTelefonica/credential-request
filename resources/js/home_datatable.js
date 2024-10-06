$('#DataTable').DataTable({
  initComplete: function () {
    this.api()
      .columns()
      .every(function () {
        var column = this
        console.log('aggregando a ' + column)
        // Create select element and listener
        var select = $('<select><option value=""></option></select>')
          .appendTo($(column.footer()).empty())
          .on('change', function () {
            column.search($(this).val(), { exact: true }).draw()
          })

        // Add list of options
        column
          .data()
          .unique()
          .sort()
          .each(function (d, j) {
            select.append('<option value="' + d + '">' + d + '</option>')
          })
      })
  },
  ajax: '/data',
  columns: [
    { data: 'firstname' },
    { data: 'lastname' },
    { data: 'role' },
    { data: 'identification_number' },
    { data: 'card_id' },
    { data: 'igri' },
    { data: 'itsm' },
    { data: 'udo' },
    { data: 'teams' },
    { data: 'has_front_office' },
    { data: 'has_open_gateway' },
    { data: 'correo_front_office' },
    { data: 'matricula_hi' },
    { data: 'confluence_id' },
    { data: 'atlas_id' },
    { data: 'zeus_id' },
    { data: 'zabbix_id' },
    { data: 'calicus_id' },
    { data: 'youbora_id' },
    { data: 'pagerduty_id' },
    { data: 'dominio_external_prod_id' },
    { data: 'dominio_ott_prod_id' },
    { data: 'dominio_opg' },
    { data: 'dominio_video' },
    { data: 'mib' },
    { data: 'has_azure_4_p_es' },
    { data: 'has_azure_hac_br' },
    { data: 'has_azure_4_p_br' },
    { data: 'has_bastion_hac' },
    { data: 'has_sharepoint_gvp_azure' },
  ],
  dom: 'Bfrtip',
  buttons: ['excel', 'pdf', 'csv', 'colvis'],
  //   responsive: true,
})
console.log('holamundo')
