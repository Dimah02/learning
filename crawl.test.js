const {normlizeURL, getURLsFromHTML} = require('./crawl.js')
const {test,expect} = require('@jest/globals')
// run npm test to run the tests
test('normlizeURL strip protocol', ()=>{
    const input = 'https://blog.boot.dev/path'
    const actual = normlizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected) // I expect the actual output to equal the expected
})

test('normlizeURL strip trailing slash', ()=>{
    const input = 'https://blog.boot.dev/path/'
    const actual = normlizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normlizeURL capitals and http', ()=>{
    const input = 'http://BLOG.boot.dev/path'
    const actual = normlizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML absolute', ()=>{
    const inputHTMLBody = `
    <html>
        <body>
            <a href = "https://blog.boot.dev/path/"> Boot.dev Blog </a>
        </body>
    </html>
    `
    const inputBaseURL = "https://blog.boot.dev/path/"
    const actual = getURLsFromHTML(inputHTMLBody,inputBaseURL)
    const expected = ["https://blog.boot.dev/path/"]
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML relative', ()=>{
    const inputHTMLBody = `
    <html>
        <body>
            <a href = "/path/"> Boot.dev Blog </a>
        </body>
    </html>
    `
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputHTMLBody,inputBaseURL)
    const expected = ["https://blog.boot.dev/path/"]
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML multiple links', ()=>{
    const inputHTMLBody = `
    <html>
        <body>
            <a href = "https://blog.boot.dev/path1/"> Boot.dev Blog </a>
        </body>
        <body>
            <a href = "/path2/"> Boot.dev Blog </a>
        </body>
    </html>
    `
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputHTMLBody,inputBaseURL)
    const expected = ["https://blog.boot.dev/path1/","https://blog.boot.dev/path2/"]
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML invalid url', ()=>{
    const inputHTMLBody = `
    <html>
        <body>
            <a href = "invalid"> Boot.dev Blog </a>
        </body>
    </html>
    `
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputHTMLBody,inputBaseURL)
    const expected = []
    expect(actual).toEqual(expected)
})