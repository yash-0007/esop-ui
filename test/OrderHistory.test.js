import {
  getOrderHistoryResponse,
  getError,
  checkForNoTransactions,
} from "../src/js/OrderHistory";

describe("Order History", () => {
  test("it should call the fetch get api", async () => {
    const mockResponse = {};
    const mockJsonPromise = Promise.resolve(mockResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
    });

    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

    const response = await getOrderHistoryResponse();

    expect(response).toBe(mockResponse);
    expect(global.fetch).toHaveBeenCalledTimes(1);

    global.fetch.mockRestore();
  });

  test("it should throw an error", async () => {
    const mockResponse = {
      error: "user doesn't exist",
    };
    const mockJsonPromise = Promise.resolve(mockResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
    });

    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

    const response = await getError(mockResponse);

    expect(response).toBe("user doesn't exist");

    global.fetch.mockRestore();
  });

  test("it should return no transactions found", async () => {
    const mockResponse = [];
    const mockJsonPromise = Promise.resolve(mockResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
    });

    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

    const response = await checkForNoTransactions(mockResponse);

    expect(response).toBe("No Transactions found");

    global.fetch.mockRestore();
  });
});
