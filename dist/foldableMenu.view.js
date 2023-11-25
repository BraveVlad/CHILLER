import { attachClickEventsToItems } from "./foldableMenu.controller.js";
export const PERFIX_SELECTED_ITEM_DATA = "data-selected-item-id";
const PERFIX_FOLDABLE_MENU = ".foldable-menu";
const PERFIX_HIDE_MENU = "foldable-menu--hidden";
const PERFIX_HIGHLIGHT_ITEM = "foldable-menu__object--highlight";
const menuView = document.querySelector(PERFIX_FOLDABLE_MENU);
const titleView = menuView.querySelector(PERFIX_FOLDABLE_MENU + "__title");
const amountNumberView = menuView.querySelector(PERFIX_FOLDABLE_MENU + "__amount");
const listView = menuView.querySelector(PERFIX_FOLDABLE_MENU + "__list");
export const createButtonView = menuView.querySelector(PERFIX_FOLDABLE_MENU + "__create");
let itemsName = "";
export function setHeader(menuTitle, countedItemsName) {
    itemsName = countedItemsName;
    setTitle(menuTitle);
    setAmount(0);
}
export function renderList(objects) {
    listView.replaceChildren();
    listView.innerHTML = `
    ${objects.map(generateItemElement).join('\n')}
    `;
    setAmount(objects.length);
    attachClickEventsToItems(getAllListItemViews());
}
export function show() {
    menuView.classList.remove(PERFIX_HIDE_MENU);
}
export function hide() {
    menuView.classList.add(PERFIX_HIDE_MENU);
}
function setTitle(menuTitle) {
    titleView.innerText = menuTitle;
}
function setAmount(amount) {
    amountNumberView.innerHTML = amount.toString() + " " + itemsName;
}
function generateItemElement(object) {
    return `
    <li class="foldable-menu__item">
        <button class="foldable-menu__object" ${PERFIX_SELECTED_ITEM_DATA}="${object.id}">${object.title}</button>
    </li>
    `;
}
function getAllListItemViews() {
    return listView.querySelectorAll(".foldable-menu__object");
}
export function highlightSelectedItem(itemElement) {
    itemElement.classList.add(PERFIX_HIGHLIGHT_ITEM);
}
export function removeHighlightFromItems() {
    const items = getAllListItemViews();
    items.forEach((item) => item.classList.remove(PERFIX_HIGHLIGHT_ITEM));
}
