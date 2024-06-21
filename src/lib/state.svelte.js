import {countFeeds, parseHead, parseBody, stringify} from "$lib/opml.js";

export default function createState() {
    let _rawContent = $state("");
    let _head = $state("");
    let _body = $state("");
    let numFeeds = $derived(countFeeds(_body));
    let outlineViewStatus = $state(false);
    let selectedItems = $state([]);

    return {
        get rawContent() {
            return _rawContent;
        },
        set rawContent(content) {
            _rawContent = content;
            _head = parseHead(content);
            _body = parseBody(content);
        },
        get head() {
            return _head;
        },
        set head(nodeList) {
            _head = nodeList;
            _rawContent = stringify(nodeList, _body);
        },
        get body() {
            return _body;
        },
        set body(nodeList) {
            _body = nodeList;
            _rawContent = stringify(_head, nodeList);
        },
        get numFeeds() {
            return numFeeds;
        },
        get outlineViewStatus() {
            return outlineViewStatus;
        },
        set outlineViewStatus(status) {
            outlineViewStatus = status;
        },
        get selectedItems() {
            return selectedItems;
        },
        set selectedItems(list) {
            selectedItems = list;
        },
        set selectItem(id) {
            if (!selectedItems.includes(id)) {
                selectedItems = [...selectedItems, id];
            }
        },
        set deselectItem(id) {
            if (selectedItems.includes(id)) {
                selectedItems = selectedItems.filter(i => i !== id);
            }
        }
    };
}