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
    lastChecked: number
}

const chillers = [] as Chiller[];


function createChiller(chiller: Omit<Chiller, "liquidCurrent" | "lastChecked">) {
    const newChiller: Chiller = {
        ...chiller,
        liquidCurrent: 0,
        lastChecked: 0
    }

    chillers.push(newChiller);
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
        showCreateChillerMenu();
    });

    FoldableMenuView.show();
}

function showCreateChillerMenu() {
    console.log("create chiller ")
}

function hideChillerMenu() {
    FoldableMenuView.hide();
}


function main() {

    console.log("Welcome to Chiller. app!")

    showChillerMenu();

}


main();
