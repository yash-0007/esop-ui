async function getOrderHistory() {
  response = await getOrderHistoryResponse();

  error = getError(response);
  if (error) {
    document.getElementById("response").innerHTML = error;
    return;
  }

  noTransaction = checkForNoTransactions(response);
  if (noTransaction) {
    document.getElementsByClassName("insert-record").innerHtml = transaction;
    return;
  }

  displayTable(response);
}

function getOrderHistoryResponse() {
  return fetch("http://localhost:8080/user/yash/order", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  }).then((response) => response.json());
}

function getError(response) {
  if (response.error) {
    return response.error;
  }
}

function checkForNoTransactions(response) {
  if (response.length == 0) return "No Transactions found";
}

function displayTable(response) {
  let table = document.getElementById("tableData");

  for (var transaction = 0; transaction < response.length; transaction++) {
    let row = table.insertRow(-1);
    let c1 = row.insertCell(0);
    let c2 = row.insertCell(1);
    let c3 = row.insertCell(2);
    let c4 = row.insertCell(3);
    let c5 = row.insertCell(4);

    c1.innerText = response[transaction].orderId;
    c2.innerText = response[transaction].type;
    c3.innerText = response[transaction].quantity;
    c4.innerText = response[transaction].price;
    c5.innerText = response[transaction].esopType;
  }
}

exports.getError = getError;
exports.checkForNoTransactions = checkForNoTransactions;
exports.getOrderHistoryResponse = getOrderHistoryResponse;
