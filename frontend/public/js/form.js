// import axios from "axios";

function porucivanje() {
  var ime = document.getElementById("ime").value;
  var adresa = document.getElementById("adresa").value;
  var tel = document.getElementById("tel").value;

  var size = document.querySelector('input[name="radio"]:checked').value;
  var pizza = document.querySelector('input[class="pizza"]:checked').value;

  // Prepare the data to send
  const formData = {
    ime: ime,
    adresa: adresa,
    tel: tel,
    size: size,
    pizza: pizza,
  };

  // Make a POST request using Axios
  axios
    .post("http://localhost:3000/orders", formData)
    .then((response) => {
      // Handle success, if needed
      console.log("Order placed successfully:", response.data);
      // Optionally, you can reset the form or show a success message to the user
      alert("Porudžbina je uspešno poslata na obradu.");
    })
    .catch((error) => {
      // Handle error
      console.error("Error placing order:", error);
      // Optionally, show an error message to the user
      alert("Došlo je do greške prilikom slanja porudžbine.");
    });
}
