const {normlizeURL} = require('./crawl.js')
const {test,expect} = require('@jest/globals')

test('normlizeURL strip protocol', ()=>{
    const input = 'https://blog.boot.dev/path'
    const actual = normlizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected) // I expect the actual output to equal the expected
    // run npm test
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