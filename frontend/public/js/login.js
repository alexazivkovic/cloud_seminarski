var dugme = document.getElementById("logindugme");
dugme.addEventListener("click", logovanje);

function logovanje() {
  var uname = document.getElementById("uname").value;
  var psswd = document.getElementById("psswd").value;

  if (uname == "admin" && psswd == "admin") {
    document.getElementById("uname").style.visibility = "hidden";
    document.getElementById("psswd").style.visibility = "hidden";
    document.getElementById("logindugme").style.visibility = "hidden";

    try {
      axios.get("http://localhost:3000/orders").then((response) => {
        document.getElementById("pod").style.visibility = "visible";
        if (!Array.isArray(response.data)) {
          throw new Error("Data is not an array");
        }
        const tableBody = document.getElementById("orders-table-body");
        response.data.forEach((order) => {
          const row = document.createElement("tr");
          row.innerHTML = `
                        <td>${order.id}</td>
                        <td>${order.name}</td>
                        <td>${order.adr}</td>
                        <td>${order.tel}</td>
                        <td>${order.pizza}</td>
                        <td>${order.size}</td>
                    `;
          tableBody.appendChild(row);
        });
      });
    } catch {
      alert("doslo je do greske prilikom ispisa svih porudzbina");
    }
  }
}
