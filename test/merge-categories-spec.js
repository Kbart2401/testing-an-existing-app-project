const { expect, assert } = require('chai');
const { mergeCategories } = require('../merge-categories');

describe("mergeCategories()", () => {
  context("Using <li> tags", () => {
    const template = `
      <div>
        <ul>
          <!-- Content here -->
        </ul>
      </div>
    `;

    it("should return no <li>s for no categories", () => {
      const noCategories = [];
      mergeCategories(template, noCategories, 'li')
      expect(template).to.include('<div>')
      expect(template).to.include('</div>')
      expect(template).to.include('<ul>')
      expect(template).to.include('</ul>')
      
      expect(template).to.not.include('<li>')
      expect(template).to.not.include('</li>')
      expect(template).to.not.include('<!--Content here -->')
    });

    it("should return a single <li> for one category", () => {
      const categories = ["Hey"]

      const result = mergeCategories(template, categories, "li")

      expect(result).to.include('<div>')
      expect(result).to.include('</div>')
      expect(result).to.include('<ul>')
      expect(result).to.include('</ul>')

      expect(result).to.include(`<li>Hey</li>`)

      expect(result).to.not.include('<!--Content here -->')

    });

    it("should return an <li> for each category", () => {
      expect.fail('please write this test');
    });
  });

  context("using <option> tags", () => {
    const template = `
      <div>
        <select>
          <!-- Content here -->
        </select>
      </div>
    `;

    it("should return no <option>s for no categories", () => {
      expect.fail('please write this test');
    });

    it("should return a single <option> for one category", () => {
      expect.fail('please write this test');
    });

    it("should return an <option> for each category", () => {
      expect.fail('please write this test');
    });
  });
});
