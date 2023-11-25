import { PEFIX_ITEM_DATA } from "./chillerGridList.view.js";
const onSelectedListeners = [];
export function attachClickEventsToGridItems(itemElements) {
    itemElements.forEach((item) => item.addEventListener("click", (e) => {
        const selectedItemId = item.getAttribute(PEFIX_ITEM_DATA);
        if (!selectedItemId)
            throw Error(`Selected grid item missing ID`);
        onSelected(selectedItemId);
    }));
}
export function addOnGridItemSelectedListener(callback) {
    onSelectedListeners.push(callback);
}
function onSelected(itemId) {
    onSelectedListeners.forEach((listener) => listener(itemId));
}
