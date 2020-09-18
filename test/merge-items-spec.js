const { expect } = require('chai');
const { mergeItems } = require('../merge-items');
describe("The mergeItems function", () => {
  const template = `
    <table>
      <tbody>
        <!-- Content here -->
      </tbody>
    </table>
  `;
  it("should return no <tr>s and no <td>s for no items", () => {
    const items = [];
    const result = mergeItems(template, items);
    expect(result).does.include('<table>');
    expect(result).does.include('</table>');
    expect(result).does.include('<tbody>');
    expect(result).does.include('</tbody>');

    expect(result).does.not.include('<tr>');
    expect(result).does.not.include('</tr>');
    expect(result).does.not.include('<td>');
    expect(result).does.not.include('</td>');

    expect(result).does.not.include('<!--Content here-->')

  });

  it("should return a single <tr>, four <td>s, and a <form> for one uncompleted item", () => {
    const item = [{title: 'Work it', category: 'Work'}]
    const result = mergeItems(template, item);
    expect(result).does.include('<table>');
    expect(result).does.include('</table>');
    expect(result).does.include('<tbody>');
    expect(result).does.include('</tbody>');

    expect(result).does.include('<tr>');
    expect(result).does.include('</tr>');
    expect(result).does.include('<td>Work it</td>');
    expect(result).does.include('<td>Work</td>');
    expect(result).does.include('<form method="POST" action="/items/1">');
    
    expect(result).does.not.include('<!--Content here-->')
  });

  it("should return a single <tr>, four <td>s, and no <form> for one completed item", () => {
    const item = [{ title: 'Work it', category: 'Work', isComplete: true }]  
    const result = mergeItems(template, item);
    expect(result).does.include('<table>');
    expect(result).does.include('</table>');
    expect(result).does.include('<tbody>');
    expect(result).does.include('</tbody>');

    expect(result).does.include('<tr>');
    expect(result).does.include('</tr>');
    expect(result).does.include('<td>Work it</td>');
    expect(result).does.include('<td>Work</td>');
    expect(result).does.not.include('<form method="POST" action="/items/1">');

    expect(result).does.not.include('<!--Content here-->')
  });

  it("should return three <tr>s for three items", () => {
    const items = [{ title: 'Work it', category: 'Work', isComplete: true },
      { title: 'Happy', category: 'Vacation', isComplete: false }, 
      { title: 'Sad :(', category: 'Boring', isComplete: false }]
      const result = mergeItems(template, items);
    expect(result).does.include('<table>');
    expect(result).does.include('</table>');
    expect(result).does.include('<tbody>');
    expect(result).does.include('</tbody>');

    expect(result).does.include('<tr>');
    expect(result).does.include('</tr>');
    expect(result).does.include('<td>Work it</td>');
    expect(result).does.include('<td>Work</td>');
    expect(result).does.not.include('<form method="POST" action="/items/1">');
    expect(result).does.include('<form method="POST" action="/items/2">');
    expect(result).does.include('<form method="POST" action="/items/3">');

    expect(result).does.not.include('<!--Content here-->')
  });
});
