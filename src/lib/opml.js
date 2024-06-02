const opml = {
    parse: parseOPML,
    countFeeds: countFeeds,
    removeDupes: removeDupesFromOPML,
    createEmpty: createEmpty
};

export default opml;

function parseOPML(opmlString) {
    // Parse the XML string into a document object
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(opmlString, "text/xml");

    // Recursive function to parse an outline element
    const parseOutline = outline => {
        // keep attributes for future use
        const attributes = {};
        for (let i = 0; i < outline.attributes.length; i++) {
            const attr = outline.attributes[i];
            attributes[attr.name] = attr.value;
        }

        const isGroup = !outline.getAttribute("xmlUrl");
        const children = [];

        if (isGroup) {
            const childOutlines = outline.querySelectorAll(":scope > outline");
            childOutlines.forEach(childOutline => {
                children.push(parseOutline(childOutline));
            });
        }

        return { attributes, children };
    };

    const body = xmlDoc.querySelector("body");

    const outlines = body.querySelectorAll(":scope > outline");

    const result = [];

    outlines.forEach(outline => {
        result.push(parseOutline(outline));
    });

    return result;
}

function countFeeds(opmlData) {
    let count = 0;

    const countFeedsRecursive = data => {
        data.forEach(item => {
            if (item.attributes.xmlUrl) {
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

// keep metadata but remove duplicates based on the xmlUrl
function removeDuplicates(opmlData) {
    const unique = [];

    const removeDuplicatesRecursive = data => {
        data.forEach(item => {
            if (item.attributes.xmlUrl) {
                const existing = unique.find(feed => feed.attributes.xmlUrl === item.attributes.xmlUrl);
                if (!existing) {
                    unique.push(item);
                }
            }
            else if (item.children && item.children.length > 0) {
                item.children = removeDuplicates(item.children);
                unique.push(item);
            }
            else {
                unique.push(item);
            }
        });
    };

    removeDuplicatesRecursive(opmlData);
    return unique;
}

// keep metadata but remove duplicates based on the xmlUrl
function removeDupesFromOPML(opmlString) {
    const opmlData = parseOPML(opmlString);
    const unique = removeDuplicates(opmlData);

    const head = opmlString.substring(0, opmlString.indexOf("<body>"));

    const opmlDoc = new DOMParser().parseFromString(head + "<body></body></opml>", "text/xml");
    const body = opmlDoc.querySelector("body");

    const appendOutline = (parent, item) => {
        const outline = opmlDoc.createElement("outline");
        for (const key in item.attributes) {
            outline.setAttribute(key, item.attributes[key]);
        }
        if (item.children) {
            item.children.forEach(child => {
                appendOutline(outline, child);
            });
        }
        parent.appendChild(outline);
    };


    unique.forEach(item => {
        appendOutline(body, item);
    });

    return new XMLSerializer().serializeToString(opmlDoc);
}

function createEmpty() {
    return `<?xml version="1.0" encoding="UTF-8"?>
<opml version="1.0">
    <head>
        <title>Feeds</title>
    </head>
    <body>
    </body>
</opml>`;
}