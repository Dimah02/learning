const { JSDOM } = require('jsdom')

async function crawlPage(baseURL,currentURL,pages) {
    const baseURLObj = new URL(baseURL)
    const currentURLObj = new URL(currentURL)
    if(baseURLObj.hostname!==currentURLObj.hostname){
        return pages;
    }

    const normlizedCurrentURL = normlizeURL(currentURL)
    if(pages[normlizedCurrentURL]>0){
        pages[normlizedCurrentURL]++;
        return pages;
    }

    pages[normlizedCurrentURL] = 1;
    console.log("Activley crawling:", currentURL)

    try {
        const resp = await fetch(currentURL);

        if(resp.status >399){
            console.log(`Error in fetch with status code ${resp.status} on page ${currentURL}`)
            return pages;
        }

        const contentType = resp.headers.get("content-type")
        if(!contentType.includes("text/html")){
            console.log(`non html response, content type: ${contentType} on page ${currentURL}`)
            return pages;
        }

        const htmlBody = await resp.text()
        const nextURLs = getURLsFromHTML(htmlBody,baseURL)
        for(const nextURL of nextURLs){
            pages = await crawlPage(baseURL,nextURL,pages)
        }
    } catch (err) {
        console.log("Error: Invalid URL",err)
        return pages;
    }
    return pages
}

function getURLsFromHTML(htmlBody, baseURL) {
    const urls = []
    const dom = new JSDOM(htmlBody) //create an object rebresenting the html tree structure
    const linkElements = dom.window.document.querySelectorAll('a')
    for (const linkElement of linkElements) {
        if (linkElement.href.slice(0, 1) === '/') {
            //This is a relative URL and we want to return the absolute
            try {
                const urlObj = new URL(`${baseURL}${linkElement.href}`) //This will throw an error if the string is not valid URL
                urls.push(`${baseURL}${linkElement.href}`)
            }
            catch (err) {
                console.log(`Error with relative url: ${err.message}`)
            }
        }
        else {
            //it starts with http so it is absolute
            try {
                const urlObj = new URL(linkElement.href)
                urls.push(urlObj.href)
            }
            catch (err) {
                console.log(`Error with absolute url: ${err.message}`)
            }
        }
    }
    return urls
}


function normlizeURL(urlString) {
    const urlObj = new URL(urlString)
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`
    if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
        return hostPath.slice(0, -1)
    }
    return hostPath
}

// This will make the function available to use to other files
module.exports = {
    normlizeURL,
    getURLsFromHTML,
    crawlPage
}