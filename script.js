// Inventory
class Item {
  constructor(sku, item, price) {
    this.sku = sku;
    this.item = item;
    this.price = price;
  }
}

function newItem(itemData) {
  const itemObj = new Item(itemData.sku.value, itemData.item.value, itemData.price.value);
  const getInventory = JSON.parse(localStorage.getItem('inventory'));
  if (getInventory != null) {
    getInventory.push(itemObj);
    localStorage.setItem('inventory', JSON.stringify(getInventory));
    document.getElementById('item-form').reset();
    getItemList();
    event.preventDefault()
  } else {
    alert("Create database before adding items.");
  }
}

function getItemList() {
  const inventoryList = JSON.parse(localStorage.getItem('inventory'));
  if(inventoryList != null) {
    displayTable(inventoryList);
    document.getElementById('item-form').reset();
  } else {
    alert("No database found. Please create database.");
  }
}

function updateItem() {
  const skuSelected = document.getElementById('sku');
  const itemSelected = document.getElementById('item');
  const priceSelected = document.getElementById('price');
  const inventoryList = JSON.parse(localStorage.getItem('inventory'));

  for (i in inventoryList) {
    if (inventoryList[i].sku == skuSelected.value) {
      inventoryList[i].item = itemSelected.value;
      inventoryList[i].price = priceSelected.value;
      localStorage.setItem('inventory', JSON.stringify(inventoryList));
      getItemList();
    }
  }
	event.preventDefault();
}

function deleteItem() {
  let inventoryArray = JSON.parse(localStorage.getItem('inventory'));
  inventoryArray.splice(previousRow - 1, 1);    
  localStorage.setItem('inventory', JSON.stringify(inventoryArray));
  location.reload();
  event.preventDefault();
}

function displayTable(tableData) {
	document.querySelector('tbody').remove();
	document.querySelector('table').append(document.createElement('tbody'));
	for (record in tableData) {
		let dataTable = document.querySelector('tbody');
		let dataRow = document.createElement('tr');
		let skuCell = document.createElement('td');
		let itemCell = document.createElement('td');
		let priceCell = document.createElement('td');
		skuCell.innerHTML = tableData[record].sku;
		itemCell.innerHTML = tableData[record].item;
		priceCell.innerHTML = tableData[record].price;
		dataTable.append(dataRow);
		dataRow.append(skuCell, itemCell, priceCell);
		dataRow.setAttribute('onclick', 'selectRow(this);');
	};
};

let previousRow;
function selectRow(rowElement) {
	let itemTable = document.getElementById('item-table');
	let rowNumber = rowElement.rowIndex;
	let skuEntry = 0;
	let itemEntry = 1;
	let priceEntry = 2;
	let skuData = itemTable.rows[rowNumber].cells[skuEntry].textContent;
	let itemData = itemTable.rows[rowNumber].cells[itemEntry].textContent;
	let priceData = itemTable.rows[rowNumber].cells[priceEntry].textContent;
	if (previousRow) {
		if (previousRow % 2 == 0) {
			itemTable.rows[previousRow].cells[skuEntry].style.backgroundColor = "rgb(221, 227, 233)";
			itemTable.rows[previousRow].cells[itemEntry].style.backgroundColor = "rgb(221, 227, 233)";
			itemTable.rows[previousRow].cells[priceEntry].style.backgroundColor = "rgb(221, 227, 233)";
		}
		else {
			itemTable.rows[previousRow].cells[skuEntry].style.backgroundColor = "rgb(245, 247, 248)";
			itemTable.rows[previousRow].cells[itemEntry].style.backgroundColor = "rgb(245, 247, 248)";
			itemTable.rows[previousRow].cells[priceEntry].style.backgroundColor = "rgb(245, 247, 248)";
		};
	};
	itemTable.rows[rowNumber].cells[skuEntry].style.backgroundColor = "darkgray";
	itemTable.rows[rowNumber].cells[itemEntry].style.backgroundColor = "darkgray";
	itemTable.rows[rowNumber].cells[priceEntry].style.backgroundColor = "darkgray";
	previousRow = rowNumber;
	let formEntries = document.getElementById('item-form');
	formEntries.sku.value = skuData;
	formEntries.item.value = itemData;
	formEntries.price.value = priceData;
};





getItemList();

