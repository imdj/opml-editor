import xmlFormat from "xml-formatter";
import {SvelteMap, SvelteSet} from 'svelte/reactivity';

export const viewMode = {
    OUTLINER: 'OUTLINER',
    CODE: 'CODE'
}

export const nodeType = {
    ELEMENT_NODE: 'ELEMENT_NODE',
    TEXT_NODE: 'TEXT_NODE'
}

export class opmlNode {
    attributes = $state(new SvelteMap());
    children = $state([]);
    textContent = $state("");
    tagName;
    nodeType;

    constructor(id, parent_id) {
        this.id = id;
        this.parent_id = parent_id;
    }

    deleteAttribute(name) {
        this.attributes.delete(name);
    }

    setAttribute(name, value="") {
        this.attributes.set(name, value);
    }

    deleteChildById(id) {
        this.children = this.children.filter(c => c.id !== id);
    }

    selectChildren(state) {
        this.children.forEach(child => {
            state.selectedItems.add(child.id);
            child.selectChildren(state);
        })
    }

    deselectChildren(state) {
        this.children.forEach(child => {
            state.selectedItems.delete(child.id);
            child.deselectChildren(state);
        })
    }

    checkParent(state) {
        let parent = state.outlineMap.get(this.parent_id);

        if (state.selectedItems.has(this.parent_id)) {
            state.selectedItems.delete(this.parent_id);
        }
        else if (parent?.children.length && parent.children.every(child => state.selectedItems.has(child.id))) {
            state.selectedItems.add(this.parent_id);
        }
    }

    moveUp(state) {
        // if top level outline
        let parent = state.outlineMap.get(this.parent_id) || state.body;

        let index = parent.children.findIndex(child => child.id === this.id);

        if (index > 0) {
            parent.children.splice(index, 1);
            parent.children.splice(index - 1, 0, this);
        }

        state._rawContent = state.stringify();
    }

    moveDown(state) {
        // if top level outline
        let parent = state.outlineMap.get(this.parent_id) || state.body;

        let index = parent.children.findIndex(child => child.id === this.id);

        if (index < parent.children.length - 1) {
            parent.children.splice(index, 1);
            parent.children.splice(index + 1, 0, this);
        }

        state._rawContent = state.stringify();
    }
}

export class opmlDoc {
    uniqueID;
    head = $state(new opmlNode(0));
    body = $state(new opmlNode(1));

    // debounce timeout for parsing the document again
    parseTimeout;

    version = "2.0";
    nodeMap = $state(new SvelteMap());
    outlineMap = $state(new SvelteMap());
    selectedItems = $state(new SvelteSet());
    numOfFeeds = $derived(Array.from(this.outlineMap.values()).reduce((acc, outline) => acc + outline.attributes.has("xmlUrl"), 0));
    lastSaved = $state(new Date().getTime());
    lastModified = $state(new Date().getTime());

    // private to avoid recursive updates
    _rawContent = $state("");

    set rawContent(value) {
        this._rawContent = value;
        this.lastModified = new Date().getTime();
        this.debounceParse(value);
    }

    get rawContent() {
        return this._rawContent;
    }

    debounceParse(fileString) {
        clearTimeout(this.parseTimeout);
        this.parseTimeout = setTimeout(() => this.parseDoc(fileString), 300);
    }

    parseDoc(fileString) {
        // reset values
        this.uniqueID = 2;
        this.outlineMap.clear();
        this.nodeMap.clear();
        this.selectedItems.clear();

        if (!fileString) return;

        const parser = new DOMParser();
        const doc = parser.parseFromString(fileString, "text/xml");

        this.version = doc.getElementsByTagName("opml")[0]?.getAttribute("version");

        this.parseHead(doc);
        this.parseBody(doc);
    }

    parseHead(doc) {
        this.head = new opmlNode(0);
        this.head.tagName = "head";
        this.head.nodeType = nodeType.ELEMENT_NODE;

        const head = doc.querySelector("head");
        if (!head) return;

        this.nodeMap.set(this.head.id, this.head);

        for (const node of head.childNodes) {
            this.insertNode(this.head.id, this.parseNode(node, this.head.id));
        }
    }

    parseBody(doc) {
        this.body = new opmlNode(1);
        this.body.tagName = "body";
        this.body.nodeType = nodeType.ELEMENT_NODE;

        const body = doc.querySelector("body");
        if (!body) return;

        this.nodeMap.set(this.body.id, this.body);

        for (const node of body.childNodes) {
            this.insertNode(this.body.id, this.parseNode(node, this.body.id));
        }
    }

    // only accepts ELEMENT_NODE and non-empty TEXT_NODE
    parseNode(domElement, parentID) {
        if (domElement.nodeType === Node.ELEMENT_NODE || (domElement.nodeType === Node.TEXT_NODE && domElement.textContent.trim() !== "")) {
            let node = new opmlNode(this.generateId(), parentID);

            if (domElement.nodeType === Node.ELEMENT_NODE) {
                node.nodeType = nodeType.ELEMENT_NODE;
                node.tagName = domElement.tagName;

                for (const attr of domElement.attributes) {
                    node.setAttribute(attr.name, encodeValue(attr.value));
                }
            } else {
                node.nodeType = nodeType.TEXT_NODE;
                node.textContent = domElement.textContent;
            }

            // We need to add node to maps before processing children
            this.nodeMap.set(node.id, node);
            if (node.tagName === "outline") {
                this.outlineMap.set(node.id, node);
            }

            for (const child of domElement.childNodes) {
                this.insertNode(node.id, this.parseNode(child, node.id));
            }

            return node;
        }
    }

    insertNode(parentID, element, index) {
        if (!element) return;
        let parent;

        // if the parent is an outline
        if (this.outlineMap.get(parentID)) {
            parent = this.outlineMap.get(parentID);
        }
        else {
            parent = this.nodeMap.get(parentID) || this.body;
        }

        // if index is not provided, insert at the end
        parent.children.splice(index !== undefined ? index : parent.children.length, 0, element);
    }
 
    createBasic() {
        const basicExample =
            `<?xml version="1.0" encoding="UTF-8"?>
            <opml version="2.0">
                <head>
                    <title>Subscriptions</title>
                </head>
                <body>
                    <outline text="Feeds Folder" title="Feeds Folder">
                        <outline text="Feed 1" title="Feed 1" xmlUrl="https://example.com/feed1.xml"/>
                        <outline text="Feed 2" title="Feed 2" xmlUrl="https://example.com/feed2.xml"/>
                    </outline>
                    <outline text="Feed 3" title="Feed 3" xmlUrl="https://example.com/feed3.xml"/>
                    <outline text="Duplicate feed example" title="Feed 3" xmlUrl="https://example.com/feed2.xml"/>
                </body>
            </opml>`;

        this.rawContent = xmlFormat(basicExample, { lineSeparator: '\n' });
    }

    stringify() {
        let head = this.stringifyNode(this.head);
        let body = this.stringifyNode(this.body);

        return xmlFormat(`<?xml version="1.0" encoding="UTF-8"?>\n<opml version="${this.version}">\n${head}\n${body}\n</opml>`, { lineSeparator: '\n' });
    }

    // recursive function to convert node (including children) to string
    stringifyNode(node) {
        if (node.nodeType === nodeType.TEXT_NODE) {
            return node.textContent;
        }

        let str = `<${node.tagName}`;
        for (const [key, value] of node.attributes) {
            str += ` ${key}="${value}"`;
        }
        str += ">";
        for (const child of node.children) {
            str += this.stringifyNode(child);
        }
        str += `</${node.tagName}>`;
        return str;
    }

    getAllAttributes() {
        let uniqueAttributes = new Set();

        this.outlineMap.forEach(outline => {
            outline.attributes.forEach((_, attrName) => {
                    uniqueAttributes.add(attrName);
                }
            )
        });
        return Array.from(uniqueAttributes);
    }

    deleteAttributeForAll(name) {
        this.outlineMap.forEach(outline => outline.deleteAttribute(name))
        this._rawContent = this.stringify();
    }

    addFeed(text, xmlUrl, htmlUrl) {
        let feedNode = new opmlNode(this.generateId(), this.body.id);
        feedNode.tagName = "outline";
        feedNode.nodeType = nodeType.ELEMENT_NODE;

        feedNode.setAttribute("text", encodeValue(text));
        feedNode.setAttribute("xmlUrl", encodeValue(xmlUrl));
        feedNode.setAttribute("htmlUrl", encodeValue(htmlUrl));

        this.insertNode(this.body.id, feedNode);
        // Updating the private variable directly to avoid re-parsing and assignment coupled with the getter function for rawContent
        this._rawContent = this.stringify();
    }

    removeOutlineDupes() {
        let uniqueOutlines = new Map();

        this.outlineMap.forEach(outline => {
            if (outline.attributes.get('xmlUrl') && uniqueOutlines.has(outline.attributes.get('xmlUrl'))) {
                this.deleteNodeById(outline.id);
            }
            // otherwise if the outline has a feed, but it's not a duplicate
            else if (outline.attributes.get('xmlUrl')) {
                uniqueOutlines.set(outline.attributes.get('xmlUrl'), outline);
            }
        });

        this._rawContent = this.stringify();
    }

    deleteNodeById(id) {
        let node = this.nodeMap.get(id);
        let parent = this.nodeMap.get(node.parent_id);

        // remove children first before deleting the node
        node.children.forEach(child => {
            this.deleteNodeById(child.id);
        });

        if (parent) {
            parent.deleteChildById(id);
        }

        this.nodeMap.delete(id);
        this.outlineMap.delete(id);
        this.selectedItems.delete(id);
    }

    deleteSelected() {
        this.selectedItems.forEach(id => {
            this.deleteNodeById(id);
        });

        this._rawContent = this.stringify();
    }

    append(outlines) {
        for (const outline of outlines) {
            this.insertNode(this.body.id, outline);
        }
        this._rawContent = this.stringify();
    }

    generateId() {
        return this.uniqueID++;
    }
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