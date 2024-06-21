export function deselectChildren(childrenList) {
    if (childrenList.length)
        childrenList.forEach(child => {
            opml.deselectItem = child.id;
            if (child.children.length)
                deselectChildren(child.children)
        })
}

export function selectChildren(childrenList) {
    if (childrenList.length)
        childrenList.forEach(child => {
            opml.selectItem = child.id;
            if (child.children.length)
                selectChildren(child.children);
        })
}

export function checkParent(parentID) {
    if (!parentID) return;
    let parent = opml.body.find(item => item.id === parentID);

    if (opml.selectedItems.includes(parentID)) {
        opml.deselectItem = parentID;
    }
    else if (parent?.children.length && parent.children.every(child => opml.selectedItems.includes(child.id))) {
        opml.selectItem = parentID;
    }
}