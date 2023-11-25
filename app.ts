import * as FoldableMenuView from "./foldableMenu.view.js";
import * as FoldableMenuController from "./foldableMenu.controller.js";
import * as FoldableMenu from "./foldableMenu.model.js";




type LiquidType = "Brine" | "Goldmax";

type Chiller = {
    id: string,
    name: string,
    liquidCurrent: number,
    liquidMax: number,
    liquidMin: number,
    liquidType: LiquidType,
    lastChecked: Date
}

const chillers = [] as Chiller[];

type OnChillerUpdateListener = (chillers: Chiller[]) => void;
const onUpdateListeners = [] as OnChillerUpdateListener[];

function createChiller(chiller: Omit<Chiller, "liquidCurrent" | "lastChecked">) {
    const newChiller: Chiller = {
        ...chiller,
        liquidCurrent: 0,
        lastChecked: new Date()
    }

    chillers.push(newChiller);
    console.log(chillers)
}

function getChillers(): Chiller[] {
    return chillers.slice();
}


const screenView = document.querySelector(".screen") as HTMLElement;
const screenTitleView = screenView.querySelector(".screen__title") as HTMLHeadingElement;
const screenMainView = screenView.querySelector(".screen__main") as HTMLDivElement;

function showChillerListScreen() {
    setScreenTitle("Main Chillers List");
}

function setScreenTitle(title: string) {
    screenTitleView.innerHTML = title;
}

function setScreenMainContent(content: HTMLElement) {
    screenMainView.replaceChildren();
    screenMainView.append(content);
}

function showChillerMenu() {

    FoldableMenuView.setHeader("Chillers", "chillers")
    FoldableMenu.addOnUpdateListener(FoldableMenuView.renderList)

    getChillers().forEach((chiller) => FoldableMenu.addItem({ id: chiller.id, title: chiller.name }));

    FoldableMenuController.attachCreateCallback((event) => {
        showCreateChiller();
    });

    FoldableMenuView.show();
}

function showCreateChiller() {
    console.log("create chiller ")
}

function hideChillerMenu() {
    FoldableMenuView.hide();
}


function main() {

    console.log("Welcome to Chiller. app!")

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