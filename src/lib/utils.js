export function deselectChildren(childrenList, state) {
    if (childrenList.length)
        childrenList.forEach(child => {
            state.deselectItem = child.id;
            if (child.children.length)
                deselectChildren(child.children, state);
        })
}

export function selectChildren(childrenList, state) {
    if (childrenList.length)
        childrenList.forEach(child => {
            state.selectItem = child.id;
            if (child.children.length)
                selectChildren(child.children, state);
        })
}

export function findById(nodeList, id) {
    let result = null;

    nodeList.forEach(node => {
        if (node.id === id) {
            result = node;
        }
        else if (node.children.length) {
            findById(node.children, id);
        }
    });

    return result;
}

export function checkParent(parentID, state) {
    if (!parentID) return;
    let parent = findById(state.body, parentID);

    if (state.selectedItems.includes(parentID)) {
        state.deselectItem = parentID;
    }
    else if (parent?.children.length && parent.children.every(child => state.selectedItems.includes(child.id))) {
        state.selectItem = parentID;
    }
}