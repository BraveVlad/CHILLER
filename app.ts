import * as FoldableMenuView from "./foldableMenu.view.js";
import * as FoldableMenuController from "./foldableMenu.controller.js";
import * as FoldableMenu from "./foldableMenu.model.js";


const screenView = document.querySelector(".screen") as HTMLElement;
const screenTitleView = screenView.querySelector(".screen__title") as HTMLHeadingElement;
const screenMainView = screenView.querySelector(".screen__main") as HTMLDivElement;


type LiquidType = "Brine" | "Goldmax";

type Chiller = {
    id: string,
    name: string,
    liquidCurrent: number,
    liquidMax: number,
    liquidMin: number,
    liquidType: LiquidType,
    lastChecked: number
}

const chillers = [] as Chiller[];

type OnChillerUpdateListener = (chillers: Chiller[]) => void;
const onUpdateListeners = [] as OnChillerUpdateListener[];

function createChiller(chiller: Omit<Chiller, "liquidCurrent" | "lastChecked">) {
    const newChiller: Chiller = {
        ...chiller,
        liquidCurrent: 0,
        lastChecked: 0
    }

    chillers.push(newChiller);
}

function generateChillerListView(chillers: Chiller[]) {

}

function generateChillerView(chiller: Chiller) {
    return `
    
    `
}



function main() {

    console.log("Welcome to Chiller. app!")

    showChillerMenu();
    showChillerListScreen();

}


main();



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
const test: FoldableMenu.MenuItem[] = [
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
]
function showChillerMenu() {

    FoldableMenuView.setHeader("Chillers", "chillers")
    FoldableMenu.addOnUpdateListener(FoldableMenuView.renderList)

    test.forEach((item) => FoldableMenu.addItem(item));

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