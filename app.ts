

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


type MenuObject = {
    id: string,
    title: string
}

const PERFIX_FOLDABLE_MENU = ".foldable-menu"
const menu = document.querySelector(PERFIX_FOLDABLE_MENU) as HTMLDivElement;

const title = menu.querySelector(PERFIX_FOLDABLE_MENU + "__title") as HTMLHeadingElement;
const amount = menu.querySelector(PERFIX_FOLDABLE_MENU + "__amount") as HTMLParagraphElement;
const amountTitle = menu.querySelector(PERFIX_FOLDABLE_MENU + "__amount-title") as HTMLSpanElement;
const createButton = menu.querySelector(PERFIX_FOLDABLE_MENU + "__create") as HTMLButtonElement;

const list = menu.querySelector(PERFIX_FOLDABLE_MENU + "__list") as HTMLUListElement;
//, create: Function, list: MenuObject[]
function setTitle(menuTitle: string) {
    title.innerText = menuTitle;
}

function main() {

    console.log("Welcome to Chiller. app!")

    setTitle("Hello");
}


main();
