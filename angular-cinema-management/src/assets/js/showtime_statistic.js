

window.onload = function chart() {
    'use strict'

    // feather.replace({'aria-hidden': 'true'})

    // Graphs
    const ctx = document.getElementById('showtimeChart')
    // eslint-disable-next-line no-unused-vars
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [
                '12h30',
                '20h30',
                '14h45',
                '17h30',
                '19h30',
                '16h30',
                '12h50',

            ],
            datasets: [{
                data: [
                    2230,
                    5521,
                    1026,
                    3239,
                    1235,
                    7920,
                    2344
                ],
                lineTension: 0,
                backgroundColor: 'transparent',
                borderColor: '#F26b38',
                borderWidth: 4,
                pointBackgroundColor: '#F26b38'
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    boxPadding: 3
                }
            },
            scales: { //Title Configuration
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Số vé đã bán',
                        color: '#F26c38',
                        font: {
                            family: 'tahoma',
                            size: 20,
                            style: 'normal',
                            lineHeight: 1.0
                        },
                        padding: {top: 0, left: 0, right: 0, bottom: 0}
                    }
                }
            }
        }
    })
}

//Show version to check library is active
console.log("phiên bản Jquery là : "+jQuery.fn.jquery);
console.log("Phiên bản Chart.js là: " + Chart.version);
console.log("Phiên bản xlsx là: " + XLSX.version);




