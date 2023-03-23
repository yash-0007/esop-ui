async function placeOrder() {
  url = "http://localhost:8080/user/yash/order";

  content = getBody();

  response = await getPlaceOrderResponse(url, content);

  orderStatus = getOrderStatus(response);

  document.getElementById("response").innerHTML = orderStatus;
}

function getBody() {
  return JSON.stringify({
    quantity: document.getElementById("quantity").value,
    type: document.getElementById("order-type").value,
    price: document.getElementById("price").value,
    esopType: document.getElementById("esop-type").value,
  });
}

function getPlaceOrderResponse(url, content) {
  return fetch(url, {
    method: "POST",
    body: content,
    headers: {
      "Content-type": "application/json",
    },
  }).then((response) => response.json());
}

function getOrderStatus(response) {
  if (response && response.error) {
    return response.error;
  }
  return "Order Placed Successfully";
}

exports.getPlaceOrderResponse = getPlaceOrderResponse;
exports.getOrderStatus = getOrderStatus;
