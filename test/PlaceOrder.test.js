import { getOrderStatus, getPlaceOrderResponse } from "../src/js/PlaceOrder";

describe("Place Order", () => {
  test("it should call the fetch post api", async () => {
    const mockResponse = {};
    const mockJsonPromise = Promise.resolve(mockResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
    });

    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

    const content = JSON.stringify({
      quantity: 10,
      type: "SELL",
      price: 10,
      esopType: "PERFORMANCE",
    });

    const url = "http://localhost:8080/user/yash/order";
    const response = await getPlaceOrderResponse(url, content);

    expect(response).toBe(mockResponse);
    expect(global.fetch).toHaveBeenCalledTimes(1);

    global.fetch.mockRestore();
  });

  test("it should throw an error", async () => {
    const mockResponse = {
      error: ["insufficient wallet funds"],
    };
    const mockJsonPromise = Promise.resolve(mockResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
    });

    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

    const response = await getOrderStatus(mockResponse);

    expect(response).toContain("insufficient wallet funds");

    global.fetch.mockRestore();
  });

  test("it should place order sucessfully", async () => {
    const mockResponse = {
      orderId: "1",
      username: "yash",
      type: "BUY",
      quantity: 1,
      price: 50000,
      esopType: "NON_PERFORMANCE",
      status: "PLACED",
      remainingQuantity: 1,
      createdAt: 1679392502012,
    };
    const mockJsonPromise = Promise.resolve(mockResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
    });

    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

    const response = await getOrderStatus(mockResponse);

    expect(response).toBe("Order Placed Successfully");

    global.fetch.mockRestore();
  });
});
