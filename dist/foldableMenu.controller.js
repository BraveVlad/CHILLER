import { PERFIX_SELECTED_ITEM_DATA, createButtonView, highlightSelectedItem, removeHighlightFromItems } from "./foldableMenu.view.js";
export function attachCreateCallback(createCallback) {
    createButtonView.addEventListener("click", createCallback);
}
function onMenuItemSelected(itemId) {
    console.log("item pressed " + itemId);
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
