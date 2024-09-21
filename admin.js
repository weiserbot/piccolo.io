// Administrator
function createDatabase() {
  const checkProcess = confirm("Creating database will erase previous data. Proceed?");
  if ( checkProcess == true) {
    localStorage.clear();
    const inventoryArray = [{sku: '000', item: 'Item Name', price: '0.00'}];
    localStorage.setItem('inventory', JSON.stringify(inventoryArray));
    alert("Database ready. Restart application is recommended.");
  };
}

const downloadLink = document.getElementById('backup-inventory');
const inventoryData = localStorage.getItem('inventory');
const blob = new Blob([inventoryData], { type: "text/plain"});
downloadLink.href = URL.createObjectURL(blob);

const fileInput = document.getElementById('file-input');
fileInput.addEventListener('change', () => {
  fileReader = new FileReader();
  fileReader.readAsText(fileInput.files[0]);
  fileReader.addEventListener('load', () => {    
    const checkProcess = confirm("Restore backup will erase previous data. Proceed?");
    if ( checkProcess == true) {
      createDatabase();
      localStorage.setItem('inventory', fileReader.result);
      alert("Backup restored.");
    }
    else {
      alert("No database found. Please create database.");
    }
  })
});