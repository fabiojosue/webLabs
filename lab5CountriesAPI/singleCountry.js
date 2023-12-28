$(document).ready(function () {
    // Hago la busqueda por nombre del país
    const urlParams = new URLSearchParams(window.location.search);
    const tId = urlParams.get('tId');
    console.log(tId);

    fetchCountryDetails(tId);
  });
  
  function fetchCountryDetails(tId) {
    fetch(`https://restcountries.com/v3.1/name/${tId}`)
      .then(response => response.json())
      .then(countryDetails => {
        displayCountryDetails(countryDetails);
      })
      .catch(error => {
        console.error('Error fetching country details:', error);
      });
  }

function displayCountryDetails(countryDetails) {
    htmlbody = document.getElementById("details");
    let html = "";

    html += `<div class="container" style="
        border: 3px solid green;
        border-radius: 10px;
        padding: 80px;
    ">`;
    // Row
    html += `<h1 class="d-flex justify-content-center" style="margin-bottom: 50px;">${countryDetails[0].name.official}</h1>`;
    html += `<div class="row">`;
    
    // Column 1:
    html += `<div class="col-4">`;
    html += `<img style="width100%" src="${countryDetails[0].flags.png}" class="img-fluid" alt="Flag">`;
    html += `</div>`;
  
    // Column 2:
    html += `<div class="col-4">`;
    //html += `<h5>${countryDetails[0].name.common}</h5>`;
    html += `<p><strong>Nombre:</strong> ${countryDetails[0].name.common}</p>`;
    html += `<p><strong>Nombre Oficial:</strong> ${countryDetails[0].name.official}</p>`;
    html += `<p><strong>Región:</strong> ${countryDetails[0].region}</p>`;
    html += `<p><strong>Subregion:</strong> ${countryDetails[0].subregion}</p>`
    html += `<p><strong>Continente:</strong> ${countryDetails[0].continents}</p>`;
    html += `</div>`;
  
    // Column 3:
    html += `<div class="col-4">`;
    html += `<p><strong>Population:</strong> ${countryDetails[0].population}</p>`;
    html += `<p><strong>Países limítrofes:</strong></p>`;
    if (countryDetails[0].borders) {
        for (let i = 0; i < countryDetails[0].borders.length; i++) {
            html += `<li>${countryDetails[0].borders[i]}</li>`;
          }
          html += `</div>`;
    }
    
    // Close
    html += `</div>`;
    html += `<div class="d-flex justify-content-center">`;
    html += `<button class="btn btn-info" id="goBack" style="margin-top: 20px; background-color: green; border-color: green; color:white;">Volver</button>`;
    html += `</div>`;
    html += `</div>`;
  
    htmlbody.innerHTML = html;
    console.log(countryDetails);
}

$(document).on('click', '#goBack', function () {
    console.log("hello");
    window.location.href = `index.html`;
});
  
  