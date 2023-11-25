import { PERFIX_SELECTED_ITEM_DATA, createButtonView, highlightSelectedItem, removeHighlightFromItems } from "./foldableMenu.view.js";

export type CreateCallback = (event: MouseEvent) => void;

export function attachCreateCallback(createCallback: CreateCallback) {
    createButtonView.addEventListener("click", createCallback);
}

function onMenuItemSelected(itemId: string) {
    console.log("item pressed " + itemId);
}

export function attachClickEventsToItems(itemElements: NodeListOf<Element>) {
    itemElements.forEach((item) => item.addEventListener("click", (e) => {
        const selectedElement = e.target as HTMLButtonElement;

        removeHighlightFromItems();
        highlightSelectedItem(selectedElement);

        const selectedData = selectedElement.getAttribute(PERFIX_SELECTED_ITEM_DATA);
        if (selectedData) onMenuItemSelected(selectedData);
    }));
}
