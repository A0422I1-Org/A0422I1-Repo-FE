//Show version to check library is active
console.log("Version Jquery: " + jQuery.fn.jquery
  + "Version Chart.js: " + Chart.version
  + "Version xlsx: " + XLSX.version);


//Export Table
function exportTableToExcels() {
  // Lấy dữ liệu bảng
  var table = document.querySelector("#movieTable, #customerTable");
  var rows = table.querySelectorAll("tr");
  var data = [];
  for (var i = 0; i < rows.length; i++) {
    var row = [],
      cols = rows[i].querySelectorAll("td, th");
    for (var j = 0; j < cols.length; j++) {
      row.push(cols[j].innerText);
    }
    data.push(row);
  }

  // Tạo workbook và worksheet
  var workbook = XLSX.utils.book_new();
  var worksheet = XLSX.utils.aoa_to_sheet(data);

  // Thêm worksheet vào workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, "Thống kê");

  // Xuất file excel
  var filename = "ThongKe.xlsx";
  XLSX.writeFile(workbook, filename);

};
