import { PERFIX_SELECTED_ITEM_DATA, createButtonView, highlightSelectedItem, removeHighlightFromItems } from "./foldableMenu.view.js";
const onSelectedListeners = [];
export function attachCreateCallback(createCallback) {
    createButtonView.addEventListener("click", createCallback);
}
function onMenuItemSelected(itemId) {
    onSelected(itemId);
}
export function attachClickEventsToItems(itemElements) {
    itemElements.forEach((item) => item.addEventListener("click", (e) => {
        const selectedElement = e.target;
        const selectedData = selectedElement.getAttribute(PERFIX_SELECTED_ITEM_DATA);
        removeHighlightFromItems();
        highlightSelectedItem(selectedElement);
        if (selectedData)
            onMenuItemSelected(selectedData);
    }));
}
export function attachOnMenuItemSelected(callback) {
    onSelectedListeners.push(callback);
}
function onSelected(itemId) {
    onSelectedListeners.forEach((listener) => listener(itemId));
}
