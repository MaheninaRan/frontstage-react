import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import axios from 'axios';

function getDatum(data_input) {
  let data = [];
  const len = 12;

  data_input.map((d) => {
    data.push({
      x: d.month,
      y0: d.sortie
    });
  });

  return data;
}

const GroupedColumnChart = () => {
  useEffect(() => {
    axios.get('http://127.0.0.1:5000/statistique/monthly')
      .then((response) => {
        const data = getDatum(response.data);
        graphe(data);
        console.log("RES", data);
      });
  }, []);

  const graphe = (data) => {
    console.log("aze", data);
    const isSmallScreen = window.matchMedia('(max-width: 1024px)').matches;
    const customWidth = isSmallScreen ? 300 : 480;
    const margin = { top: 20, right: 20, bottom: 40, left: 40 };
    const width = customWidth - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const svg = d3
      .select('#multi-chart')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const colorScale = d3.scaleOrdinal().range(['#A389D4']);
    const groupKeys = ['y0'];

    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.x))
      .range([0, width])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => Math.max(d.y0))])
      .range([height, 0]);

    data.forEach((d) => {
      const groupWidth = xScale.bandwidth() / groupKeys.length;

      groupKeys.forEach((key, index) => {
        svg
          .append('rect')
          .attr('x', xScale(d.x) + index * groupWidth)
          .attr('y', yScale(d[key]))
          .attr('height', height - yScale(d[key]))
          .attr('width', groupWidth)
          .attr('fill', colorScale(key));
      });
    });

    // Add X axis
    const xAxis = svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale));

    // Add Y axis
    svg.append('g')
      .call(d3.axisLeft(yScale));

    // Incliner les labels de l'axe X
    xAxis.selectAll('text')
      .attr('transform', 'rotate(-45)')
      .attr('text-anchor', 'end')
      .attr('dx', '-0.8em')
      .attr('dy', '0.15em');
  };

  return <div id="multi-chart"></div>;
};

export default GroupedColumnChart;
