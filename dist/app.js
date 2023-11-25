import * as FoldableMenuView from "./foldableMenu.view.js";
import * as FoldableMenuController from "./foldableMenu.controller.js";
import * as FoldableMenu from "./foldableMenu.model.js";
import * as ChillerGridView from "./chillerGridList.view.js";
import * as Chiller from "./chiller.model.js";
const screenView = document.querySelector(".screen");
const screenTitleView = screenView.querySelector(".screen__title");
const screenMainView = screenView.querySelector(".screen__main");
function showChillerListScreen() {
    setScreenTitle("Main Chillers List");
    setScreenMainContent(ChillerGridView.generateChillerGridView(Chiller.getChillers()));
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
    updateMenuWithChillers();
    FoldableMenuView.show();
}
function convertChillerToMenuItem(chiller) {
    return { id: chiller.id, title: chiller.name };
}
function showCreateChiller() {
    console.log("create chiller ");
}
function hideChillerMenu() {
    FoldableMenuView.hide();
}
function updateMenuWithChillers() {
    const chillersAsMenuItems = Chiller.getChillers().map(convertChillerToMenuItem);
    FoldableMenu.addItems(chillersAsMenuItems);
    FoldableMenuController.attachCreateCallback((event) => {
        showCreateChiller();
    });
}
function updateGridViewWithChillers() {
    setScreenMainContent(ChillerGridView.generateChillerGridView(Chiller.getChillers()));
}
function main() {
    console.log("Welcome to Chiller. app!");
    Chiller.attachOnChillersUpdateListener((chillers) => {
        updateMenuWithChillers();
        updateGridViewWithChillers();
    });
    Chiller.createChiller({
        id: "123",
        name: "ABCD",
        liquidMax: 50,
        liquidMin: 0,
        liquidType: "Brine"
    });
    Chiller.createChiller({
        id: "234",
        name: "aaaa",
        liquidMax: 100,
        liquidMin: 0,
        liquidType: "Brine"
    });
    const testLiquidChange = Chiller.getChillerById("123");
    Chiller.setLiquidLevel(testLiquidChange, 25);
    showChillerMenu();
    showChillerListScreen();
    Chiller.createChiller({
        id: "5412",
        name: "bbbb",
        liquidMax: 100,
        liquidMin: 0,
        liquidType: "Brine"
    });
    Chiller.createChiller({
        id: "5412",
        name: "bbbb",
        liquidMax: 100,
        liquidMin: 0,
        liquidType: "Brine"
    });
}
main();
