const allATags = document.querySelectorAll('a');
const matchingATags = [];
allATags.forEach((aTag) => {
  const href = aTag.getAttribute('href');
  if (href && href.startsWith('/messages/t/')) {
    matchingATags.push(aTag);
  }
});

function findParentWithRoleRow(element) {
  while (element && element.getAttribute('role') !== 'row') {
    element = element.parentElement;
  }
  return element;
}

function openMenuFromRow(parentRow){
  const gridCells = parentRow.querySelectorAll('div[role="gridcell"]');
  const secondGridCell = gridCells[1];
  const button = secondGridCell.querySelector("div[role=button]");
  setTimeout(()=>{button.click(); console.log("Menu opened")}, 500)
  
}

function findMenuClickDelete(){
  let menu = document.querySelector("div[role=menu]");
  console.log("menu found.")

  let menuItems = menu.querySelectorAll("div[role=menuitem]");

  console.log("Clicking delete option")
  for (let i = 0; i < menuItems.length; i++) {
    let parentMenuItem = menuItems[i];
    let spanWithinParent = parentMenuItem.querySelector('span');
    if (spanWithinParent && spanWithinParent.textContent.trim() === "Delete chat") {
      parentMenuItem.click();
      break;
    }
  }

  setTimeout(()=>{
    console.log("Confirming Delete")
    let delDialogue = document.querySelectorAll('[aria-label="Delete chat"]');
    delDialogue[2].click()
  }, 1500)

}




async function processMatchingATags() {

  for (let index = 0; index < matchingATags.length; index++) {
    const aTag = matchingATags[index];
    const delay =  3000;

    await new Promise((resolve) => setTimeout(resolve, delay));
    console.log(delay, "ms delay");
    console.log("processing index", index ,"/", matchingATags.length);
    let parentRow = findParentWithRoleRow(aTag);

    await new Promise((resolve) => setTimeout(resolve, 1000));
    openMenuFromRow(parentRow);

    await new Promise((resolve) => setTimeout(resolve, 2000));
    findMenuClickDelete();

  }
}

processMatchingATags();






