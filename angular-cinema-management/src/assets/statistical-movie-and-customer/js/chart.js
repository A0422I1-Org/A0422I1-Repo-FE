// import jquery in js file
var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.6.3.min.js'; // Check https://jquery.com/ for the current version
document.getElementsByTagName('head')[0].appendChild(script);
//

// chart
exports.callJSFun=function(){
  let currentvalue = document.getElementById('onoff').value;
  if (currentvalue === "Off") {
    document.getElementById("onoff").value = "On";
    const num = document.getElementsByClassName("num");
    const chart = document.getElementsByClassName("animated-progress");
    colSpanReturn()
    animationChart();
    for (let i = 0; i < num.length; i++) {
      num[i].style.display = "block";
    }
    for (let i = 0; i < chart.length; i++) {
      chart[i].style.display = "none";
    }
  } else {
    document.getElementById("onoff").value = "Off";
    const num = document.getElementsByClassName("num");
    const chart = document.getElementsByClassName("animated-progress");
    colSpan();
    animationChart();
    for (let i = 0; i < num.length; i++) {
      num[i].style.display = "none";
    }
    for (let i = 0; i < chart.length; i++) {
      chart[i].style.display = "block";
    }
  }
}

function animationChart() {
  $(".animated-progress span").removeAttr('style')
  $(".animated-progress span").each(function () {
    $(this).animate(
      {
        width: $(this).attr("data-progress") + "%",
      },
      1200
    );

  })
}

function colSpan() {
    const colSpan = document.getElementsByClassName("colSpan");
    for (let i = 0; i < colSpan.length; i++) {
        colSpan[i].colSpan = "2";
    }

}

function colSpanReturn() {
    const colSpan = document.getElementsByClassName("colSpan");
    for (let i = 0; i < colSpan.length; i++) {
        colSpan[i].colSpan = "0";
    }
}





