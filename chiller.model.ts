
const STORAGE_CHILLERS_LIST = "storage_chillers"
export type LiquidType = "brine" | "goldmax";

export type Chiller = {
    id: string,
    name: string,
    liquidCurrent: number,
    liquidMax: number,
    liquidMin: number,
    liquidType: LiquidType,
    lastChecked: string
}

const chillers = [] as Chiller[];

type OnChillerUpdateListener = (chillers: Chiller[]) => void;
const onUpdateListeners = [] as OnChillerUpdateListener[];

export function createChiller(chiller: Omit<Chiller, "liquidCurrent" | "lastChecked">) {
    const newChiller: Chiller = {
        ...chiller,
        liquidCurrent: 0,
        lastChecked: new Date().toLocaleString()
    }

    chillers.push(newChiller);

    onUpdate();
}

export function editChillerById(chillerId: string, newChiller: Omit<Chiller, "liquidCurrent" | "lastChecked">) {
    const target = getChillerById(chillerId);

    target.name = newChiller.name;
    target.liquidMin = newChiller.liquidMin;
    target.liquidMax = newChiller.liquidMax;
    target.liquidType = newChiller.liquidType;

    onUpdate();
}

export function loadChillers(newChillers: Chiller[]) {
    clear();
    newChillers.forEach((chiller) => chillers.push(chiller));
}

function clear() {
    chillers.splice(0);
}

export function getChillers(): Chiller[] {
    return chillers.slice();
}

export function getChillerById(id: string) {
    const chiller = chillers.find((chiller) => chiller.id === id);

    if (!chiller) throw Error(`Chiller ${id} not found!`);
    return chiller;
}

export function setLiquidLevel(chiller: Chiller, amount: number) {
    if (amount < chiller.liquidMin || amount > chiller.liquidMax)
        throw Error("Invalid liquid level amount");

    chiller.liquidCurrent = amount;
}

export function calculateLiquidLevelPercentage(chiller: Chiller) {
    const totalCapacity = chiller.liquidMax - chiller.liquidMin;

    return (chiller.liquidCurrent / totalCapacity) * 100;
}

export function attachOnChillersUpdateListener(callback: OnChillerUpdateListener) {
    onUpdateListeners.push(callback);
}

export function onUpdate() {
    saveStorage();
    onUpdateListeners.forEach((listener) => listener(getChillers()));
}

function saveStorage() {
    clearStorage();
    const serializedChillers = JSON.stringify(getChillers());
    localStorage.setItem(STORAGE_CHILLERS_LIST, serializedChillers);
}

function clearStorage() {
    localStorage.removeItem(STORAGE_CHILLERS_LIST);
}

export function loadStorage() {
    const fetchedStoredChillers = localStorage.getItem(STORAGE_CHILLERS_LIST);

    if (!fetchedStoredChillers) throw Error("No chillers found in storage");

    const parsedChillers = JSON.parse(fetchedStoredChillers) as Chiller[];

    loadChillers(parsedChillers);
}