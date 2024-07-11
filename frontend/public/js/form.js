var btn = document.getElementById("dugme");
btn.addEventListener("click", porucivanje);

function porucivanje() {
  var name = document.getElementById("ime").value;
  var adr = document.getElementById("adresa").value;
  var tel = document.getElementById("tel").value;

  var size = document.querySelector('input[name="radio"]:checked').value;
  var pizza = document.querySelector('input[class="pizza"]:checked').value;

  // Prepare the data to send
  const formData = {
    name: name,
    adr: adr,
    tel: tel,
    size: size,
    pizza: pizza,
  };

  try {
    axios
      .post("http://localhost:3000/orders", formData)
      .then((response) => {
        console.log("Order placed successfully:", response.data);
        document.getElementById("reset").click();
        alert("Porudžbina je uspešno poslata na obradu.");
      })
      .catch((error) => {
        console.error("Error placing order:", error);
        alert("Došlo je do greške prilikom slanja porudžbine.");
      });
  } catch {
    console.log("post nije izvrsen");
  }
}
