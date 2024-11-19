import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import axios from 'axios';

const PieBasicChart = () => {
  const [datum, setDatum] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/produit/stat_vendu')
      .then(response => {
        console.log(response.data); // Inspecter les données reçues
        setDatum(response.data.data || []);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    if (datum.length === 0) return; // Ne pas exécuter si pas de données

    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2;

    // Nettoyer le graphique précédent
    d3.select('#chart').selectAll('*').remove();

    const svg = d3
      .select('#chart')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const colorScale = d3.scaleOrdinal().range(['#ff8a65', '#f4c22b', '#04a9f5', '#3ebfea', '#4F5467', '#1de9b6', '#a389d4', '#FE8A7D']);

    const pie = d3.pie().value(d => d.y);

    const path = d3.arc().outerRadius(radius).innerRadius(0);

    const arcs = svg.selectAll('arc').data(pie(datum)).enter().append('g');

    arcs
      .append('path')
      .attr('d', path)
      .attr('fill', d => colorScale(d.index)) // Utiliser l'index pour la couleur
      .attr('stroke', 'white')
      .style('stroke-width', '2px');

    arcs
      .append('text')
      .attr('transform', d => `translate(${path.centroid(d)})`)
      .attr('dy', '0.35em')
      .style('text-anchor', 'middle')
      .text(d => d.data.key);

  }, [datum]); // Re-exécuter lorsque `datum` change

  return <div id="chart"></div>;
};

export default PieBasicChart;
