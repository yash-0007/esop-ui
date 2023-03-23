import { JSDOM } from "jsdom";
const { getByRole } = require("@testing-library/dom");
import fs from "fs";

const dom = new JSDOM("<!DOCTYPE html><html><head></head><body></body></html>");
const { window } = dom;

const { document } = window;
global.document = document;

const html = fs.readFileSync("./src/index.html", "utf-8");
document.documentElement.innerHTML = html;

describe("Index", () => {
  test("title element contains correct text", () => {
    expect(document.title).toBe("ESOP Trading");
  });

  test("placeOrder element contains correct link", () => {
    const placeOrder = getByRole(document, "link", { name: "Place Order" });
    expect(placeOrder.getAttribute("href")).toBe("./html/PlaceOrder.html");
  });

  test("orderHistory element contains correct link", () => {
    const placeOrder = getByRole(document, "link", { name: "Order History" });
    expect(placeOrder.getAttribute("href")).toBe("./html/OrderHistory.html");
  });
});
