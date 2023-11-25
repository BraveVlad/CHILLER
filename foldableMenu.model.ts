
export type MenuItem = {
    id: string,
    title: string
}

const items = [] as MenuItem[];

type OnMenuUpdateListener = (items: MenuItem[]) => void;
const onUpdateListeners = [] as OnMenuUpdateListener[];

export function addItem(item: MenuItem) {

    items.push(item);

    onUpdate();
}

function getItems(): MenuItem[] {
    return items.slice();
}

export function addOnUpdateListener(callback: OnMenuUpdateListener) {
    onUpdateListeners.push(callback);
}

function onUpdate() {
    onUpdateListeners.forEach((listener) => listener(getItems()));
}