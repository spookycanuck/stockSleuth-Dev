export const Lines = {
  data: [
    {
      name: '',
      x: [],
      y: [],
      mode: 'lines',
      marker: {
        color: "black",
        opacity: 1,
      }
    },
    {
      marker: {
          opacity: 0.5
      },
      type: 'bar',
      yaxis: "y2"
    },
  ],

  config: {
      responsive: true,
      displayModeBar: false
  }
}

export const Candlestick = {
  data: [
    {
      name: '',
      x: [],
      close: [],
      decreasing: {
        line: {color: 'red'}
      },
      increasing: {
        line: {color: 'green'}
      },
      high: [],
      low: [],
      open: [],
      type: 'candlestick',
    },
    {
      marker: {
          opacity: 0.5
      },
      type: 'bar',
      yaxis: "y2"
    },
  ],

  config: {
      responsive: true,
      displayModeBar: false
  }
}

export const Layout = {
  layout: {
    title: '',
    height: 900,
    showlegend: true,
    hovermode: 'x',
    autosize: true,
    legend: {"orientation": "v"},
    margin: { l: 5, r: 5, t: 50, b: 5 },
    xaxis: {
        type: 'category',
        categoryorder: "category ascending",
        showspikes: true,
        spikemode: 'across',
        spikesnap: 'cursor',
        showline: true,
        showgrid: false,
        showticklabels: true,
        tickangle: 45,
        autorange: true,
        nticks: 12,
        rangeslider: {visible: false},
        automargin: true,
    },
    yaxis: {
        showticklabels: true,
        showgrid: true,
        fixedrange: true,
        automargin: true,
        side: 'right'
    },
    yaxis2: {
      visible: false,
      showgrid: false,
      title: 'Volume',
      type: 'linear',
      overlaying: 'y',
      side: 'right',
      marker: {
          opacity: .5
      },
      fixedrange: true,
      range: []
  }
}
}
