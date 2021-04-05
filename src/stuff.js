let timeDura = document.querySelector(".times");
timeDura.innerHTML = `
          <p>${data.response[0].risetime} for ${(
  data.response[0].duration / 60
).toFixed(2)} minutes</p>
          <p>${data.response[1].risetime} for ${(
  data.response[1].duration / 60
).toFixed(2)} minutes</p>
          <p>${data.response[2].risetime} for ${(
  data.response[2].duration / 60
).toFixed(2)} minutes</p>
          <p>${data.response[3].risetime} for ${(
  data.response[3].duration / 60
).toFixed(2)} minutes</p>
          <p>${data.response[4].risetime} for ${(
  data.response[4].duration / 60
).toFixed(2)} minutes</p>
        `;
