import React, { useEffect, useRef } from "react"
import { scaleLinear, scaleBand } from 'd3-scale';
import { max } from 'd3-array';
import { format } from 'd3-format';
import { axisBottom, axisLeft } from 'd3-axis'
import { select } from 'd3-selection';
import * as d3 from 'd3'
import './TreeChart.css'

const width = 960;
const margin = { top: 10, right: 10, bottom: 10, left: 10 };
const tree_margin = { top: 20, right: 10, bottom: 20, left: 30 };
const innerWidth = width - margin.left - margin.right;
const innerHeight = 200 - margin.top - margin.bottom;

const TreeChart = ({ data }) => {
  const svg = useRef(null);
  useEffect(() => {
    renderBar(data)
  }, [data])
  const renderBar = (data) => {

    const g = select(svg.current).append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .style("font", "8px sans-serif");

    var clipPath = g.append("clipPath")
      .attr("id", "tree-area")
      .append("rect")
      .attr("x", 0) //Set rect's position and size... .attr("y", padding)
      .attr("width", 2 * innerWidth / 3)
      .attr("height", innerHeight);

    var tree_area = g.append("rect")
      .attr("x", 0) //Set rect's position and size... .attr("y", padding)
      .attr("width", innerWidth)
      .attr("height", innerHeight)
      .attr("fill", "rgba(0,200,200,0.1)")
      .attr("clip-path", "url(#tree-area)");

    g.append("clipPath")
      .attr("id", "graph-area")
      .append("rect")
      .attr("x", 10 + (2 * innerWidth / 3)) //Set rect's position and size... .attr("y", padding)
      .attr("width", innerWidth - (2 * innerWidth / 3 - 10))
      .attr("height", 0);

    var graph_area = g.append("rect")
      .attr("x", 0) //Set rect's position and size... .attr("y", padding)
      .attr("width", innerWidth)
      .attr("height", innerHeight)
      .attr("fill", "rgba(0,0,0,0.1)")
      .attr("clip-path", "url(#graph-area)");

    //*************************************************************************************/
    //                                    TREE
    //*************************************************************************************/
    const diagonal = d3.linkHorizontal().x(d => d.y).y(d => d.x)
    const dx = 144;
    const dy = 20;
    const root = d3.hierarchy(data);

    root.x0 = dy / 2;
    root.y0 = 0;
    root.descendants().forEach((d, i) => {
      d.id = i;
      d._children = d.children;
    });

    const gLink = g.append("g")
        .attr("fill", "none")
        .attr("stroke", "#555")
        .attr("stroke-opacity", 0.4)
        .attr("stroke-width", 1.5);

    const gNode = g.append("g")
        .attr("cursor", "pointer")
        .attr("pointer-events", "all");

    function update(event, source) {
      const duration = event?.altKey ? 2500 : 250;
      const nodes = root.descendants().reverse();
      const links = root.links();
  
      // Compute the new tree layout.
      tree(root);
  
      let left = root;
      let right = root;
      root.eachBefore(node => {
        if (node.x < left.x) left = node;
        if (node.x > right.x) right = node;
      });
  
      const height = right.x - left.x + margin.top + margin.bottom;
  
      const transition = g.transition()
          .duration(duration)
          .attr("viewBox", [-margin.left, left.x - margin.top, width, height])
          .tween("resize", window.ResizeObserver ? null : () => () => g.dispatch("toggle"));
  
      // Update the nodes…
      const node = gNode.selectAll("g")
        .data(nodes, d => d.id);
  
      // Enter any new nodes at the parent's previous position.
      const nodeEnter = node.enter().append("g")
          .attr("transform", d => `translate(${(source.y0)},${source.x0})`)
          .attr("fill-opacity", 0)
          .attr("stroke-opacity", 0)
          .on("click", (event, d) => {
            d.children = d.children ? null : d._children;
            update(event, d);
          });
  
      nodeEnter.append("circle")
          .attr("r", 2.5)
          .attr("fill", d => d._children ? "#555" : "#999")
          .attr("stroke-width", 10);
  
      nodeEnter.append("text")
          .attr("dy", "0.31em")
          .attr("x", 6)
          .attr("text-anchor", "start")
          .text(d => d._children ? d.data.variable_description : d.data.classification + ": " + d.data.classificaiton_meaning)
        .clone(true).lower()
          .attr("stroke-linejoin", "round")
          .attr("stroke-width", 3)
          .attr("stroke", "white");
  
      nodeEnter.append("text")
          .attr("dy", "0.31em")
          .attr("x", -6)
          .attr("text-anchor", "end")
          .text(d => d.data.variable_description ? d.data.classifier_description : "")
        .clone(true).lower()
          .attr("stroke-linejoin", "round")
          .attr("stroke-width", 3)
          .attr("stroke", "white");
  
  
      // Transition nodes to their new position.
      const nodeUpdate = node.merge(nodeEnter).transition(transition)
          .attr("transform", d => `translate(${d.y},${d.x})`)
          .attr("fill-opacity", 1)
          .attr("stroke-opacity", 1);
  
      // Transition exiting nodes to the parent's new position.
      const nodeExit = node.exit().transition(transition).remove()
          .attr("transform", d => `translate(${source.y},${source.x})`)
          .attr("fill-opacity", 0)
          .attr("stroke-opacity", 0);
        
  
      // Update the links…
      const link = gLink.selectAll("path")
        .data(links, d => d.target.id);
  
      // Enter any new links at the parent's previous position.
      const linkEnter = link.enter().append("path")
          .attr("d", d => {
            const o = {x: source.x0, y: source.y0};
            return diagonal({source: o, target: o});
          });
  
      // Transition links to their new position.
      link.merge(linkEnter).transition(transition)
          .attr("d", diagonal);
  
      // Transition exiting nodes to the parent's new position.
      link.exit().transition(transition).remove()
          .attr("d", d => {
            const o = {x: source.x, y: source.y};
            return diagonal({source: o, target: o});
          });
  
      // Stash the old positions for transition.
      root.eachBefore(d => {
        d.x0 = d.x;
        d.y0 = d.y;
      });
    }
    update(null, root);
    console.log(root);

  }
  return(
    <div class="scroll">
      <svg width={width} ref={svg} style={{ "backgroundColor": 'white' }} />
    </div>);
}

export default TreeChart