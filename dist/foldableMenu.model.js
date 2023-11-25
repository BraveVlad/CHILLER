const items = [];
const onUpdateListeners = [];
export function addItem(item) {
    items.push(item);
    onUpdate();
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
