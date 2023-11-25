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
}
// view 
function generateItemElement(object) {
    return `
    <li class="foldable-menu__item">
        <button class="foldable-menu__object" data-selected-item-id="${object.id}" >${object.title}</button>
    </li>
    `;
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
