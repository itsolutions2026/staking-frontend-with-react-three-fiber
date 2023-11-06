export const pieChartOptions: any = {
    labels: [ 'Your files', 'System', ],
    colors: [ '#4318FF', '#6AD2FF', ],
    chart: {
        width: '80px'
    },
    states: {
        hover: {
            filter: {
                type: 'none'
            }
        }
    },
    legend: {
        show: false
    },
    dataLabels: {
        enabled: false
    },
    hover: { mode: null },
    plotOptions: {
        donut: {
            expandOnClick: false,
            donut: {
                labels: {
                    show: false
                }
            }
        }
    },
    fill: {
        colors: [ '#4318FF', '#6AD2FF' ]
    },
    tooltip: {
        enabled: true,
        theme: 'dark'
    }
};

export const pieChartData = [ 5, 95 ];
