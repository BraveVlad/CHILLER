const chillers = [];
function createChiller(chiller) {
    const newChiller = {
        ...chiller,
        liquidCurrent: 0,
        lastChecked: 0
    };
    chillers.push(newChiller);
}
const PERFIX_FOLDABLE_MENU = ".foldable-menu";
const PERFIX_HIDE_MENU = "foldable-menu--hidden";
const PERFIX_HIGHLIGHT_ITEM = "foldable-menu__object--highlight";
const PERFIX_SELECTED_ITEM_DATA = "data-selected-item-id";
const menu = document.querySelector(PERFIX_FOLDABLE_MENU);
const title = menu.querySelector(PERFIX_FOLDABLE_MENU + "__title");
const amountNumber = menu.querySelector(PERFIX_FOLDABLE_MENU + "__amount");
const amountTitle = menu.querySelector(PERFIX_FOLDABLE_MENU + "__amount-title");
const createButton = menu.querySelector(PERFIX_FOLDABLE_MENU + "__create");
const list = menu.querySelector(PERFIX_FOLDABLE_MENU + "__list");
// view
function setTitle(menuTitle) {
    title.innerText = menuTitle;
}
// view
function setAmount(amount, countedObjectsName) {
    amountNumber.innerHTML = amount.toString() + " " + countedObjectsName;
}
function setCreateCallback(createCallback) {
    createButton.addEventListener("click", createCallback);
}
// view
function renderList(objects) {
    list.replaceChildren();
    list.innerHTML = `
    ${objects.map(generateItemElement).join('\n')}
    `;
    attachClickEventsToItems(getAllListItems());
}
function getAllListItems() {
    return list.querySelectorAll(".foldable-menu__object");
}
// view 
function generateItemElement(object) {
    return `
    <li class="foldable-menu__item">
        <button class="foldable-menu__object" ${PERFIX_SELECTED_ITEM_DATA}="${object.id}">${object.title}</button>
    </li>
    `;
}
function attachClickEventsToItems(itemElements) {
    itemElements.forEach((item) => item.addEventListener("click", (e) => {
        const selectedElement = e.target;
        removeHighlightFromItems();
        highlightSelectedItem(selectedElement);
        const selectedData = selectedElement.getAttribute(PERFIX_SELECTED_ITEM_DATA);
        if (selectedData)
            onMenuItemSelected(selectedData);
    }));
}
// controller
function onMenuItemSelected(itemId) {
    console.log("item pressed " + itemId);
}
function highlightSelectedItem(itemElement) {
    itemElement.classList.add(PERFIX_HIGHLIGHT_ITEM);
}
function removeHighlightFromItems() {
    const items = getAllListItems();
    items.forEach((item) => item.classList.remove(PERFIX_HIGHLIGHT_ITEM));
}
function show() {
    menu.classList.remove(PERFIX_HIDE_MENU);
}
function hide() {
    menu.classList.add(PERFIX_HIDE_MENU);
}
function main() {
    console.log("Welcome to Chiller. app!");
    setTitle("hello");
    setAmount(123, "Chillers");
    setCreateCallback((event) => {
        console.log(event);
    });
    const test = [
        {
            id: "1",
            title: "first item"
        },
        {
            id: "2",
            title: "first item"
        },
        {
            id: "3",
            title: "first item"
        },
        {
            id: "4",
            title: "first item"
        }
    ];
    renderList(test);
    hide();
    show();
}
main();
