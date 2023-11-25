import { PEFIX_ITEM_DATA } from "./chillerGridList.view.js";

type OnGridItemSelectedListener = (itemId: string) => void;

const onSelectedListeners = [] as OnGridItemSelectedListener[];

export function attachClickEventsToGridItems(itemElements: NodeListOf<Element>) {
    itemElements.forEach((item) => item.addEventListener("click", (e) => {
        const selectedItemId = item.getAttribute(PEFIX_ITEM_DATA);

        if (!selectedItemId) throw Error(`Selected grid item missing ID`);

        onSelected(selectedItemId);
    }));
}

export function addOnGridItemSelectedListener(callback: OnGridItemSelectedListener) {
    onSelectedListeners.push(callback);
}

function onSelected(itemId: string) {
    onSelectedListeners.forEach((listener) => listener(itemId));
}