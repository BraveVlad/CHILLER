const chillers = [];
function createChiller(chiller) {
    const newChiller = {
        ...chiller,
        liquidCurrent: 0,
        lastChecked: 0
    };
    chillers.push(newChiller);
}
function main() {
    console.log("Welcome to Chiller. app!");
}
main();
