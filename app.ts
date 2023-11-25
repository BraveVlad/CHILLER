

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
const PERFIX_HIDE_MENU = "foldable-menu--hidden"

const menu = document.querySelector(PERFIX_FOLDABLE_MENU) as HTMLDivElement;

const title = menu.querySelector(PERFIX_FOLDABLE_MENU + "__title") as HTMLHeadingElement;
const amountNumber = menu.querySelector(PERFIX_FOLDABLE_MENU + "__amount") as HTMLParagraphElement;
const amountTitle = menu.querySelector(PERFIX_FOLDABLE_MENU + "__amount-title") as HTMLSpanElement;
const createButton = menu.querySelector(PERFIX_FOLDABLE_MENU + "__create") as HTMLButtonElement;

const list = menu.querySelector(PERFIX_FOLDABLE_MENU + "__list") as HTMLUListElement;

// view
function setTitle(menuTitle: string) {
    title.innerText = menuTitle;
}

// view
function setAmount(amount: number, countedObjectsName: string) {
    amountNumber.innerHTML = amount.toString() + " " + countedObjectsName;
}

// controller
type CreateCallback = (event: MouseEvent) => void;
function setCreateCallback(createCallback: CreateCallback) {
    createButton.addEventListener("click", createCallback);
}

// view
function renderList(objects: MenuObject[]) {

    list.replaceChildren();
    list.innerHTML = `
    ${objects.map(generateItemElement).join('\n')
        }
    `
}

// view 
function generateItemElement(object: MenuObject) {
    return `
    <li class="foldable-menu__item">
        <button class="foldable-menu__object" data-selected-item-id="${object.id}" >${object.title}</button>
    </li>
    `
}

function show() {
    menu.classList.remove(PERFIX_HIDE_MENU);
}

function hide() {
    menu.classList.add(PERFIX_HIDE_MENU);
}


function main() {

    console.log("Welcome to Chiller. app!")

    setTitle("hello");
    setAmount(123, "Chillers");
    setCreateCallback((event) => {
        console.log(event)
    });

    const test: MenuObject[] = [
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

    renderList(test);
    hide();
    show();
}


main();
