const {sortPages} = require('./report.js')
const {test,expect} = require('@jest/globals')
// run npm test to run the tests
test('sortPages', ()=>{
    const input = {
        "https://wagslane.dev":5,
        "https://wagslane.dev/tags/":9
    }
    const actual = sortPages(input)
    const expected = [
        ["https://wagslane.dev/tags/",9],
        ["https://wagslane.dev",5]
    ]
    expect(actual).toEqual(expected) // I expect the actual output to equal the expected
})
test('sortPages 4 pages', ()=>{
    const input = {
        "https://wagslane.dev":5,
        "https://wagslane.dev/tags/":9,
        "https://wagslane.dev/exmp":4,
        "https://wagslane.dev/path":15
    }
    const actual = sortPages(input)
    const expected = [
        ["https://wagslane.dev/path",15],
        ["https://wagslane.dev/tags/",9],
        ["https://wagslane.dev",5],
        ["https://wagslane.dev/exmp",4]
    ]
    expect(actual).toEqual(expected) // I expect the actual output to equal the expected
})

