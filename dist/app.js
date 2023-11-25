import * as FoldableMenuView from "./foldableMenu.view.js";
import * as FoldableMenuController from "./foldableMenu.controller.js";
import * as FoldableMenu from "./foldableMenu.model.js";
const chillers = [];
const onUpdateListeners = [];
function createChiller(chiller) {
    const newChiller = {
        ...chiller,
        liquidCurrent: 0,
        lastChecked: new Date()
    };
    chillers.push(newChiller);
    console.log(chillers);
}
function getChillers() {
    return chillers.slice();
}
const screenView = document.querySelector(".screen");
const screenTitleView = screenView.querySelector(".screen__title");
const screenMainView = screenView.querySelector(".screen__main");
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
function showChillerMenu() {
    FoldableMenuView.setHeader("Chillers", "chillers");
    FoldableMenu.addOnUpdateListener(FoldableMenuView.renderList);
    getChillers().forEach((chiller) => FoldableMenu.addItem({ id: chiller.id, title: chiller.name }));
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
function main() {
    console.log("Welcome to Chiller. app!");
    createChiller({
        id: "123",
        name: "ABCD",
        liquidMax: 100,
        liquidMin: 0,
        liquidType: "Brine"
    });
    createChiller({
        id: "234",
        name: "aaaa",
        liquidMax: 100,
        liquidMin: 0,
        liquidType: "Brine"
    });
    createChiller({
        id: "5412",
        name: "bbbb",
        liquidMax: 100,
        liquidMin: 0,
        liquidType: "Brine"
    });
    showChillerMenu();
    showChillerListScreen();
}
main();
