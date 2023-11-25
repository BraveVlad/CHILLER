import * as FoldableMenuView from "./foldableMenu.view.js";
import * as FoldableMenuController from "./foldableMenu.controller.js";
import * as FoldableMenu from "./foldableMenu.model.js";

import * as ChillerGridView from "./chillerGridList.view.js";
import * as ChillerGridController from "./chillerGridList.controller.js";
import * as Chiller from "./chiller.model.js"

const screenView = document.querySelector(".screen") as HTMLElement;
const screenTitleView = screenView.querySelector(".screen__title") as HTMLHeadingElement;
const screenMainView = screenView.querySelector(".screen__main") as HTMLDivElement;

function setScreenTitle(title: string) {
    screenTitleView.innerHTML = title;
}

function setScreenMainContent(content: HTMLElement) {
    screenMainView.replaceChildren();
    screenMainView.append(content);
}

function showChillerListScreen() {
    setScreenTitle("Main Chillers List");
    setScreenMainContent(ChillerGridView.generateChillerGridView(Chiller.getChillers()));
    ChillerGridController.addOnGridItemSelectedListener((itemId) => {
        showChillerEditScreen(Chiller.getChillerById(itemId));
    });
}

function loadChillerFoldableMenu() {

    FoldableMenuView.setHeader("Chillers", "chillers")
    FoldableMenu.addOnUpdateListener(FoldableMenuView.renderList)
    FoldableMenuController.attachCreateCallback((event) => {
        showCreateChillerScreen();
    });

    updateFoldableMenuWithChillers();
    FoldableMenuController.attachOnMenuItemSelected((itemId) => {
        showChillerEditScreen(Chiller.getChillerById(itemId));
    })

}

function convertChillerToMenuItem(chiller: Chiller.Chiller): FoldableMenu.MenuItem {
    return { id: chiller.id, title: chiller.name }
}


function hideFoldableMenu() {
    FoldableMenuView.hide();
}

function showFoldableMenu() {
    FoldableMenuView.show();
}

function updateFoldableMenuWithChillers() {
    const chillersAsMenuItems = Chiller.getChillers().map(convertChillerToMenuItem);
    FoldableMenu.addItems(chillersAsMenuItems);
}

// function updateGridViewWithChillers() {
//     setScreenMainContent(ChillerGridView.generateChillerGridView(Chiller.getChillers()));
// }

function showChillerEditScreen(chiller: Chiller.Chiller) {
    setScreenTitle(`Chiller ${chiller.name} Editor`)
    setScreenMainContent(generateChillerEditForm(chiller));
    showFoldableMenu();
}

function generateChillerEditForm(chiller: Chiller.Chiller) {
    const editor = document.createElement("form") as HTMLFormElement;
    editor.classList.add("object-editor");
    editor.name = "chiller-editor";
    editor.setAttribute("data-edited-chiller-id", chiller.id);

    editor.innerHTML = `
        <fieldset class="object-editor__fieldset">
            <label for="chiller-editor__id" class="object-editor__label">ID: </label>
            <input type="text" name="chiller-editor__id" id="chiller-editor__id"
                class="object-editor__input" readonly value="${chiller.id}">
        </fieldset>

        <fieldset class="object-editor__fieldset">
            <label for="chiller-editor__name" class="object-editor__label">Name: </label>
            <input type="text" name="chiller-editor__name" id="chiller-editor__name"
                class="object-editor__input" value="${chiller.name}">
        </fieldset>

        <fieldset class="object-editor__fieldset">
            <label for="chiller-editor__liquid-max" class="object-editor__label">Liquid Maximum Level:
            </label>
            <input type="number" name="chiller-editor__liquid-max" id="chiller-editor__liquid-max"
                class="object-editor__input" value="${chiller.liquidMax}">
        </fieldset>

        <fieldset class="object-editor__fieldset">
            <label for="chiller-editor__liquid-min" class="object-editor__label">Liquid Minimum Level:
            </label>
            <input type="number" name="chiller-editor__liquid-min" id="chiller-editor__liquid-min"
                class="object-editor__input" value="${chiller.liquidMin}">
        </fieldset>

        <fieldset class="object-editor__fieldset">
            <label for="chiller-editor__liquid-types" class="object-editor__label">Liquid Type:
            </label>
            <select type="text" name="chiller-editor__liquid-types" id="chiller-editor__liquid-types"
                class="object-editor__input">
                <option value="brine" ${chiller.liquidType === "brine" ? "selected" : ""}>Brine</option>
                <option value="goldmax" ${chiller.liquidType === "goldmax" ? "selected" : ""}>Goldmax</option>
            </select>
        </fieldset>

        <input type="submit" value="SAVE" class="object-editor__submit">
        `;

    editor.addEventListener("submit", onChillerEditSubmit);

    return editor;
}

function onChillerEditSubmit(event: SubmitEvent) {
    event.preventDefault();

    const editor = event.target as HTMLFormElement;
    const editorData = new FormData(editor);

    const chillerId = editor.getAttribute("data-edited-chiller-id");
    if (!chillerId) throw Error("Couldnt find chiller ID to edit");

    Chiller.editChillerById(chillerId,
        {
            id: chillerId,
            name: editorData.get("chiller-editor__name") as string,
            liquidMax: Number(editorData.get("chiller-editor__liquid-max")),
            liquidMin: Number(editorData.get("chiller-editor__liquid-min")),
            liquidType: editorData.get("chiller-editor__liquid-types") as Chiller.LiquidType,
        });

    hideFoldableMenu();
    showChillerListScreen();
}

function showCreateChillerScreen() {
    console.log("create chiller ")
}

function main() {

    console.log("Welcome to Chiller. app!")

    Chiller.attachOnChillersUpdateListener((chillers) => {
        updateFoldableMenuWithChillers();
    });

    Chiller.createChiller({
        id: "123",
        name: "ABCD",
        liquidMax: 50,
        liquidMin: 0,
        liquidType: "goldmax"
    });
    Chiller.createChiller({
        id: "234",
        name: "aaaa",
        liquidMax: 100,
        liquidMin: 0,
        liquidType: "brine"
    });

    const testLiquidChange = Chiller.getChillerById("234");
    Chiller.setLiquidLevel(testLiquidChange, 25);

    Chiller.createChiller({
        id: "5412",
        name: "bbbb",
        liquidMax: 100,
        liquidMin: 0,
        liquidType: "brine"
    });

    Chiller.createChiller({
        id: "5412",
        name: "bbbb",
        liquidMax: 100,
        liquidMin: 0,
        liquidType: "brine"
    });

    loadChillerFoldableMenu();
    hideFoldableMenu();
    showChillerListScreen();

}

main();