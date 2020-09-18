const { expect } = require('chai');
const { saveItems } = require('../save-items');
describe("The saveItems function", () => {
  it('adds the new item to the list', () => {
    const items = ["keys","wallet","phone"]
    const newItem = "lint"

    const result = saveItems(items, newItem)

    expect(result).to.eql(["keys","wallet","phone","lint"]);
  });

  it('makes sure the result and the original are different', () => {
    const items = ["keys", "wallet", "phone"]
    const newItem = "lint"

    const result = saveItems(items, newItem)

    expect(result).does.not.eql(["keys", "wallet", "phone"])
  });
});
