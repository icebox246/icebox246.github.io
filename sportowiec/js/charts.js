
Chart.defaults.global.defaultFontFamily = "Montserrat";

const tnf_ctx = document.querySelector("#tnf-chart").getContext('2d');

const tnf_chart = new Chart(
  tnf_ctx, {
  type: 'bar',

  data: {
    labels: ["1996", "1998", "2000", "2001", "2007", "2008", "2009", "2011", "2012", "2013"],
    datasets: [
      {
        label: "Miejsce w rankingu",
        data: [10, 9, 1, 2, 7, 5, 4, 10, 8, 7],
        backgroundColor: "rgba(130, 44, 201,0.7)",
        borderColor: "rgba(130, 44, 201,1)",
        borderWidth: 3
      }
    ]
  },
  options: {
    legend: {
      display: false,
      position: "bottom"
    },
    title: {
      display: true,
      fontSize: 20,
      fontColor: "black",
      text: "Ranking Track and Field News"
    },
    scales: {
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: "Rok"
        }
      }],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Miejsce"
          },
          ticks: {
            padding: 1,
            min: 0,
            stepSize: 1
          }
        }
      ]
    }
  }
}
);


const gr_ctx = document.querySelector("#gr-chart").getContext('2d');

const gr_chart = new Chart(
  gr_ctx, {
  type: 'bar',

  data: {
    labels: ["2001", "2005", "2006", "2007", "2008"],
    datasets: [
      {
        label: "Miejsce w rankingu",
        data: [2, 4, 3, 7, 4],
        backgroundColor: "rgba(130, 44, 201,0.7)",
        borderColor: "rgba(130, 44, 201,1)",
        borderWidth: 3
      }
    ]
  },
  options: {
    legend: {
      display: false,
      position: "bottom"
    },
    title: {
      display: true,
      fontSize: 20,
      fontColor: "black",
      text: "Światowy ranking lekkoatletyczny (do 2006 ranking IAAF)"
    },
    scales: {
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: "Rok"
        }
      }],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Miejsce"
          },
          ticks: {
            padding: 1,
            min: 0,
            stepSize: 1
          }
        }
      ]
    }
  }
}
);


const progress_ctx = document.querySelector("#progress-chart").getContext('2d');

const progress_chart = new Chart(
  progress_ctx, {
  type: 'line',

  data: {
    labels: ["1990", "1991", "1992", "1993", "1994", "1995", "1996", "1997", "1998", "1999", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015"],
    datasets: [
      {
        label: "Długość rzutu w metrach",
        data: [43.94, 55.96, 63.84, 67.34, 72.48, 75.42, 79.52, 79.14, 79.58, 79.01, 81.42, 83.38, 79.78, 76.97, 79.41, 79.35, 82.31, 80.70, 79.55, 79.30, 77.51, 79.02, 78.51, 78.79, 78.41, 73.15],
        backgroundColor: "rgba(130, 44, 201,0.7)",
        borderColor: "rgba(130, 44, 201,1)",
        borderWidth: 3,
        cubicInterpolationMode: 'monotone'
      }
    ]
  },
  options: {
    legend: {
      display: false,
      position: "bottom"
    },
    title: {
      display: true,
      fontSize: 20,
      fontColor: "black",
      text: "Postępy w wynikach na przebiegu lat"
    },
    scales: {
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: "Rok"
        }
      }],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Długość rzutu w metrach"
          },
          ticks: {
            padding: 1,
            min: 30,
          }
        }
      ]
    }
  }
}
);