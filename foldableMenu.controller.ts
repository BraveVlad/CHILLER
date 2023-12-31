import { PERFIX_SELECTED_ITEM_DATA, createButtonView, highlightSelectedItem, removeHighlightFromItems } from "./foldableMenu.view.js";

export type CreateCallback = (event: MouseEvent) => void;

export type OnMenuItemSelectedListener = (itemId: string) => void;
const onSelectedListeners = [] as OnMenuItemSelectedListener[];

export function attachCreateCallback(createCallback: CreateCallback) {
    createButtonView.addEventListener("click", createCallback);
}

function onMenuItemSelected(itemId: string) {
    onSelected(itemId);
}

export function attachClickEventsToItems(itemElements: NodeListOf<Element>) {

    itemElements.forEach((item) => item.addEventListener("click", (e) => {
        const selectedElement = e.target as HTMLButtonElement;
        const selectedData = selectedElement.getAttribute(PERFIX_SELECTED_ITEM_DATA);

        removeHighlightFromItems();
        highlightSelectedItem(selectedElement);

        if (selectedData) onMenuItemSelected(selectedData);
    }));
}

export function attachOnMenuItemSelected(callback: OnMenuItemSelectedListener) {
    onSelectedListeners.push(callback);
}
function onSelected(itemId: string) {
    onSelectedListeners.forEach((listener) => listener(itemId));
}