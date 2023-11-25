import * as FoldableMenuView from "./foldableMenu.view.js";
import * as FoldableMenuController from "./foldableMenu.controller.js";
import * as FoldableMenu from "./foldableMenu.model.js";
const screenView = document.querySelector(".screen");
const screenTitleView = screenView.querySelector(".screen__title");
const screenMainView = screenView.querySelector(".screen__main");
const chillers = [];
const onUpdateListeners = [];
function createChiller(chiller) {
    const newChiller = {
        ...chiller,
        liquidCurrent: 0,
        lastChecked: 0
    };
    chillers.push(newChiller);
}
function generateChillerListView(chillers) {
}
function generateChillerView(chiller) {
    return `
    
    `;
}
function main() {
    console.log("Welcome to Chiller. app!");
    showChillerMenu();
    showChillerListScreen();
}
main();
function showChillerListScreen() {
    setScreenTitle("Main Chillers List");
}
function setScreenTitle(title) {
    screenTitleView.innerHTML = title;
}
function setScreenMainContent(content) {
    screenMainView.replaceChildren();
    screenMainView.append(content);
}
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
function showChillerMenu() {
    FoldableMenuView.setHeader("Chillers", "chillers");
    FoldableMenu.addOnUpdateListener(FoldableMenuView.renderList);
    test.forEach((item) => FoldableMenu.addItem(item));
    FoldableMenuController.attachCreateCallback((event) => {
        showCreateChiller();
    });
    FoldableMenuView.show();
}
function showCreateChiller() {
    console.log("create chiller ");
}
function hideChillerMenu() {
    FoldableMenuView.hide();
}
