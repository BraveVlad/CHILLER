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
    onUpdateListeners.forEach((listener) => listener(getChillers()));
}
