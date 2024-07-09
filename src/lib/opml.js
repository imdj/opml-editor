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