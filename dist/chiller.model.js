const STORAGE_CHILLERS_LIST = "storage_chillers";
const chillers = [];
const onUpdateListeners = [];
export function createChiller(chiller) {
    const newChiller = {
        ...chiller,
        liquidCurrent: 0,
        lastChecked: new Date().toLocaleString()
    };
    chillers.push(newChiller);
    onUpdate();
}
export function editChillerById(chillerId, newChiller) {
    const target = getChillerById(chillerId);
    target.name = newChiller.name;
    target.liquidMin = newChiller.liquidMin;
    target.liquidMax = newChiller.liquidMax;
    target.liquidType = newChiller.liquidType;
    onUpdate();
}
export function loadChillers(newChillers) {
    clear();
    newChillers.forEach((chiller) => chillers.push(chiller));
}
function clear() {
    chillers.splice(0);
}
export function getChillers() {
    return chillers.slice();
}
export function getChillerById(id) {
    const chiller = chillers.find((chiller) => chiller.id === id);
    if (!chiller)
        throw Error(`Chiller ${id} not found!`);
    return chiller;
}
export function setLiquidLevel(chiller, amount) {
    if (amount < chiller.liquidMin || amount > chiller.liquidMax)
        throw Error("Invalid liquid level amount");
    chiller.liquidCurrent = amount;
}
export function calculateLiquidLevelPercentage(chiller) {
    const totalCapacity = chiller.liquidMax - chiller.liquidMin;
    return (chiller.liquidCurrent / totalCapacity) * 100;
}
export function attachOnChillersUpdateListener(callback) {
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
    if (!fetchedStoredChillers)
        throw Error("No chillers found in storage");
    const parsedChillers = JSON.parse(fetchedStoredChillers);
    loadChillers(parsedChillers);
}
