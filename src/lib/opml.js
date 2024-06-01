const opml = {
    parse: parseOPML,
    serialize: serializeOPML,
    countFeeds: countFeeds
};

export default opml;

function parseOPML(opmlString) {
    // Parse the XML string into a document object
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(opmlString, "text/xml");

    // Recursive function to parse an outline element
    const parseOutline = outline => {
        const title = outline.getAttribute("title") || outline.getAttribute("text");
        const xmlUrl = outline.getAttribute("xmlUrl");
        const isGroup = !xmlUrl;
        const children = [];

        if (isGroup) {
            const childOutlines = outline.querySelectorAll(":scope > outline");
            childOutlines.forEach(childOutline => {
                children.push(parseOutline(childOutline));
            });
        }

        return { title, xmlUrl, children };
    };

    const body = xmlDoc.querySelector("body");

    const outlines = body.querySelectorAll(":scope > outline");

    const result = [];

    outlines.forEach(outline => {
        result.push(parseOutline(outline));
    });

    return result;
}

function serializeOPML(opmlData) {
    const xmlDoc = document.implementation.createDocument("", "", null);
    const opmlElement = xmlDoc.createElement("opml");
    opmlElement.setAttribute("version", "2.0");

    const head = xmlDoc.createElement("head");
    const title = xmlDoc.createElement("title");
    title.textContent = "Example OPML";
    head.appendChild(title);
    opmlElement.appendChild(head);

    const body = xmlDoc.createElement("body");

    opmlData.forEach(item => {
        const outline = xmlDoc.createElement("outline");
        outline.setAttribute("text", item.title);
        outline.setAttribute("xmlUrl", item.xmlUrl);
        body.appendChild(outline);
    });

    opmlElement.appendChild(body);
    xmlDoc.appendChild(opmlElement);

    const serializer = new XMLSerializer();
    return serializer.serializeToString(xmlDoc);
}

function countFeeds(opmlData) {
    let count = 0;

    const countFeedsRecursive = data => {
        data.forEach(item => {
            if (item.xmlUrl) {
                count++;
            }
            if (item.children && item.children.length > 0) {
                countFeedsRecursive(item.children);
            }
        });
    };

    countFeedsRecursive(opmlData);
    return count;
}
