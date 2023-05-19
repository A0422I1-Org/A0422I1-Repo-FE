//Show version to check library is active
console.log("Version Jquery: " + jQuery.fn.jquery
  + "\nVersion Chart.js: " + Chart.version
  + "\nVersion xlsx: " + XLSX.version);


//Export Table
function exportTableToExcel() {
  // Hỏi người dùng xác nhận xuất Excel
  if (!confirm("Bạn có chắc chắn muốn xuất dữ liệu này sang Excel?")) {
    return;
  }
  // Lấy dữ liệu bảng
  var table = document.querySelector("#movieTable");
  console.log(table)
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
  XLSX.utils.book_append_sheet(workbook, worksheet, "Doanh thu phim");

  // Xuất file excel
  var filename = "ThongKePhim.xlsx";
  XLSX.writeFile(workbook, filename);

};
