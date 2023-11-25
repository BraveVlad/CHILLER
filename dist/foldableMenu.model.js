const items = [];
const onUpdateListeners = [];
export function addItem(item) {
    items.push(item);
    onUpdate();
}
export function addItems(itemsList) {
    clearItems();
    itemsList.forEach((item) => items.push(item));
    onUpdate();
}
function clearItems() {
    items.splice(0);
}
function getItems() {
    return items.slice();
}
export function addOnUpdateListener(callback) {
    onUpdateListeners.push(callback);
}
function onUpdate() {
    onUpdateListeners.forEach((listener) => listener(getItems()));
}
