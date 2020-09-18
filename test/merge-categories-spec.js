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
      const categories = ["string1", "string2", "string3"];
      const result = mergeCategories(template, categories, "li");

      expect(result).to.include('<div>')
      expect(result).to.include('</div>')
      expect(result).to.include('<ul>')
      expect(result).to.include('</ul>')

      expect(result).to.include('<li>string1</li>')
      expect(result).to.include('<li>string2</li>')
      expect(result).to.include('<li>string3</li>')
      expect(result).to.not.include('<!--Content here -->')

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
      const categories = [];

      const result = mergeCategories(template, categories, "option")

      expect(result).to.include('<div>')
      expect(result).to.include('</div>')
      expect(result).to.include('<select>')
      expect(result).to.include('</select>')

      expect(result).does.not.include('<option>')
      expect(result).does.not.include('</option>')

      expect(result).does.not.include('<!-- Content here -->')

    });

    it("should return a single <option> for one category", () => {
      const categories = ["Work"];

      const result = mergeCategories(template, categories, "option");

      expect(result).to.include('<div>')
      expect(result).to.include('</div>')
      expect(result).to.include('<select>')
      expect(result).to.include('</select>')

      expect(result).does.include('<option>')
      expect(result).does.include('</option>')

      expect(result).does.not.include('<!-- Content here -->')
      
    });

    it("should return an <option> for each category", () => {
      const categories = ["Work", "Play", "Vacation"];

      const result = mergeCategories(template, categories, "option")
      
      expect(result).to.include('<div>')
      expect(result).to.include('</div>')
      expect(result).to.include('<select>')
      expect(result).to.include('</select>')

      expect(result).does.include('<option>')
      expect(result).does.include('</option>')

      expect(result).does.not.include('<!-- Content here -->')
      
    });
  });
});
