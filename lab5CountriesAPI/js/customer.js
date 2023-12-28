let jsonObj;

$(document).ready(function () {
  fetchDataByCountry();
  dataTableSetProperties();
});

function fetchDataByCountry() {
  let countryName = $('#countryInput').val();
  console.log(countryName);

  fetch(`https://restcountries.com/v3.1/name/${countryName}`)
    .then(response => response.json())
    .then(apiData => {
      jsonObj = apiData;
      callService(displayStatement);
    })
    .catch(error => {
      console.error('Error fetching API data:', error);
    });
}

$('#countryInput').keypress(function (event) {
  if (event.which === 13) {
    fetchDataByCountry();
  }
});

$('#searchButton').click(function () {
  fetchDataByCountry();
});

function callService(displayFunction) {
  displayFunction(jsonObj);
}

function dataTableSetProperties() {
  let table = $('#table1TableID').DataTable({
    select: true,
    bSort: true,
    paging: true,
    searching: true,

    columns: [
      { orderable: true },
      { orderable: false },
      null,
      null,
      null,
      {
        render: function (data, type, row) {
          if (row && row.length > 0) {
            return `<button class="btn btn-info see-details-btn" style="background-color: green; border-color: green; color:white;" data-tid="${row[0]}">Ver detalle</button>`;
          }
          return '';
        }
      },
    ],

    language: {
      search: "Búsqueda:  ",
      paginate: {
        show: "Mostrando",
        first: "Primer",
        previous: "Anterior",
        next: "Siguiente",
        last: "Ultimo",
      },
      info: "Mostrando página _PAGE_  de _PAGES_",
      infoEmpty: "",
      emptyTable: "No hay datos en este momento",
    },
    pageLength: 6,
    dom: '<"top"lf>rt<"bottom"ip>',
    //dom: '<"top"i>rt<"bottom"ip>',
    // dom: "Bfrtip",
    // buttons: ["copy", "excel", "pdf", "csv"],
  });

  
  //Button listener
  $('#table1TableID tbody').on('click', '.see-details-btn', function () {
    let tId = $(this).data('tid');
    console.log(tId);
    //Mando el nombre del país a la página de detalles
    window.location.href = `singleCountry.html?tId=${tId}`;
  });
}

function displayStatement(json) {
  let statementData = json;
  $('#table1TableID').DataTable().clear().draw();

  for (var i = 0; i < statementData.length; i++) {
    $('#table1TableID').DataTable().row.add([
      //Investigué el uso del Data Table y encontré que se puede usar el método row.add para agregar filas a la tabla
      //No servía con hacer el html string
      statementData[i].name.common ? statementData[i].name.common : 'No data',
      statementData[i].name.official ? statementData[i].name.official : 'No data',
      statementData[i].translations.spa.common ? statementData[i].translations.spa.common : 'No data',
      statementData[i].capital[0] ? statementData[i].capital[0] : 'No data',
      statementData[i].region ? statementData[i].region : 'No data',
    ]).draw();
  }
}
