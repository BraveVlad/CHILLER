import { calculateLiquidLevelPercentage } from "./chiller.model.js";
import { attachClickEventsToGridItems } from "./chillerGridList.controller.js";
export const PEFIX_ITEM_DATA = "data-chiller-item";
export function generateChillerGridView(chillers) {
    const gridListView = document.createElement("ul");
    gridListView.classList.add("objects-grid");
    gridListView.innerHTML = `
        ${chillers.map(generateChillerGridItem).join('\n')}
    `;
    attachClickEventsToGridItems(getGridItemsList(gridListView));
    return gridListView;
}
function generateChillerGridItem(chiller) {
    const liquidPercentage = calculateLiquidLevelPercentage(chiller);
    return `
        <li class="objects-grid__item" ${PEFIX_ITEM_DATA}="${chiller.id}">
            <div class="chiller-view" >
                <p class="chiller-view__id">${chiller.id}</p>
                <p class="chiller-view__name">${chiller.name}</p>
                <p class="chiller-view__last-checked">${chiller.lastChecked}</p>
                <progress class="chiller-view__liquid-level" max="100" value="${liquidPercentage}">${liquidPercentage}%)}
            </div>
        </li>
    `;
}
function getGridItemsList(gridView) {
    return gridView.querySelectorAll(".objects-grid__item");
}
