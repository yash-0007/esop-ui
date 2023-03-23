import { JSDOM } from "jsdom";
import fs from "fs";

const dom = new JSDOM(
  "<!DOCTYPE html><html><head></head><body></body></html>",
  {
    url: "http://localhost",
  }
);

const { window } = dom;

const html = fs.readFileSync("./src/index.html", "utf-8");
window.document.documentElement.innerHTML = html;

describe("Index", () => {
  test("title element contains correct text", () => {
    expect(window.document.title).toBe("ESOP Trading");
  });
});
