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
const menu = document.querySelector(PERFIX_FOLDABLE_MENU);
const title = menu.querySelector(PERFIX_FOLDABLE_MENU + "__title");
const amount = menu.querySelector(PERFIX_FOLDABLE_MENU + "__amount");
const amountTitle = menu.querySelector(PERFIX_FOLDABLE_MENU + "__amount-title");
const createButton = menu.querySelector(PERFIX_FOLDABLE_MENU + "__create");
const list = menu.querySelector(PERFIX_FOLDABLE_MENU + "__list");
//, create: Function, list: MenuObject[]
function setTitle(menuTitle) {
    title.innerText = menuTitle;
}
function main() {
    console.log("Welcome to Chiller. app!");
    setTitle("Hello");
}
main();
