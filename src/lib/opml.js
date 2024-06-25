// In case of merging multiple files we need to keep track of the id
let universal_id = 0;

export function parseHead(opmlString) {
    if (!opmlString)
        return [];

    const parser = new DOMParser();
    const doc = parser.parseFromString(opmlString, "text/xml");
    const head = doc.querySelector("head");
    return head?.children || [];
}

export function parseBody(opmlString) {
    if (!opmlString)
        return [];

    const parser = new DOMParser();
    const doc = parser.parseFromString(opmlString, "text/xml");
    const body = doc.querySelector("body");

    if (!body)
        return [];

    const outlinesElements = body.querySelectorAll(":scope > outline");

    function parseOutlines(parent_id, children) {
        let outlines = []

        if (!children.length)
            return outlines;

        for (const outline of children) {
            let id = universal_id++;
            let outlineObject = {
                id: id,
                parent_id: parent_id,
                attributes: outline.attributes.length ? Object.fromEntries([...outline.attributes].map(attr => [attr.name, encodeValue(attr.value)])) : {},
                children: outline.children.length ? parseOutlines(id, outline.children) : []
            };

            outlines.push(outlineObject);
        }

        return outlines;
    }

    return parseOutlines(null, outlinesElements);
}

export function stringify(headChildNodes, outlines) {
    let head = "";
    let body = "";

    if (headChildNodes.length) {
        let headElement = document.createElement("head");
        for (const node of headChildNodes) {
            headElement.appendChild(node.cloneNode(true));
        }
        head = headElement.innerHTML;
    }

    if (outlines.length) {
        function stringifyRecursive(nodeList) {
            nodeList.forEach(node => {
                body += `<outline ${Object.keys(node.attributes).map(key => `${key}="${node.attributes[key]}"`).join(" ")}>`;
                if (node.children.length > 0) {
                    stringifyRecursive(node.children);
                }
                body += "</outline>";
            });
        }

        stringifyRecursive(outlines);
    }

    // construct body
    return `<?xml version="1.0" encoding="UTF-8"?>\n<opml version="1.0">` + `<head>${head}</head>` + `<body>${body}</body>` + `</opml>`;
}

export function countFeeds(outlines) {
    if (!outlines.length)
        return 0;

    let count = 0;

    function countRecursive (nodeList) {
        nodeList.forEach(node => {
            if (node.attributes.xmlUrl) {
                count++;
            }
            if (node.children && node.children.length) {
                countRecursive(node.children);
            }
        });
    }

    countRecursive(outlines);
    return count;
}

export function removeDuplicates(outlines) {
    const unique = new Map();

    function findUnique(nodeList) {
        const filteredOutlines = [];

        nodeList.forEach(item => {
            if (item.attributes.xmlUrl && !unique.has(item.attributes.xmlUrl)) {
                unique.set(item.attributes.xmlUrl, item);
                filteredOutlines.push(item);
            } else if (item.children?.length) {
                item.children = findUnique(item.children);
                filteredOutlines.push(item);
            } else if (!item.attributes.xmlUrl) {
                filteredOutlines.push(item);
            }
        });

        return filteredOutlines;
    }

    return findUnique(outlines);
}

export function createEmpty() {
    return `<?xml version="1.0" encoding="UTF-8"?>
<opml version="2.0">
    <head>
        <title>Feeds</title>
    </head>
    <body>
    </body>
</opml>`;
}

export function merge(outlines, newOutlines) {
    return outlines.concat(newOutlines);
}

export function removeItems(outlines, itemsToDelete) {
    const itemsSet = new Set(itemsToDelete);

    function removeRecursive(nodeList) {
        return nodeList.map(node => {
            if (itemsSet.has(node.id)) {
                return null;
            }
            else if (node.children.length) {
                node.children = removeRecursive(node.children);
            }
            return node;
        }).filter(node => node !== null);
    }
    return removeRecursive(outlines);
}

export function encodeValue(value) {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

export function decodeValue(value) {
    return value
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, "\"")
        .replace(/&#39;/g, "'");
}

// id and increment it
export function generateID() {
    return universal_id++;
}

export default {
    parseHead,
    parseBody,
    stringify,
    countFeeds,
    removeDuplicates,
    createEmpty,
    merge,
    removeItems,
    encodeValue,
    decodeValue
};