import { PERFIX_SELECTED_ITEM_DATA, createButtonView, highlightSelectedItem, removeHighlightFromItems } from "./foldableMenu.view.js";
const onSelectedListeners = [];
export function attachCreateCallback(createCallback) {
    console.log("create attached");
    createButtonView.addEventListener("click", createCallback);
}
function onMenuItemSelected(itemId) {
    onSelected(itemId);
}
export function attachClickEventsToItems(itemElements) {
    itemElements.forEach((item) => item.addEventListener("click", (e) => {
        const selectedElement = e.target;
        removeHighlightFromItems();
        highlightSelectedItem(selectedElement);
        const selectedData = selectedElement.getAttribute(PERFIX_SELECTED_ITEM_DATA);
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
