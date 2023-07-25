import React, { useEffect, useRef } from "react"
import { scaleLinear, scaleBand } from 'd3-scale';
import { max } from 'd3-array';
import { format } from 'd3-format';
import { axisBottom, axisLeft } from 'd3-axis'
import { select } from 'd3-selection';
import * as d3 from 'd3'
import './TreeChart.css'


var width = 15000;
var height = 600;
const margin = { top: 10, right: 10, bottom: 10, left: 10 };
const scale_margin = 20;

var textWidths = [];
var maxTextWidth = 0;

const TreeChart = ({ tree, data }) => {
  const svg = useRef(null);
  useEffect(() => {
    maxTextWidth = 0;
    renderChart(tree, data)
  }, [tree]);
  const renderChart = (tree, data) => {
    var clusterLayout = function (node) {
      node.sort();
      d3.cluster().nodeSize([30, 160])(node); // .size is the wrong function, rewrite later to specify node size or something
    }
    // Give the data to this cluster layout:
    var root = d3.hierarchy(tree, function (d) {
      return d.children;
    });
    clusterLayout(root);
    root.isLeaf = false;

    select(svg.current).selectAll("g").remove();
    const g = select(svg.current).append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .style("font", "10px sans-serif");

    var treeArea = g.append("clipPath")
      .attr("id", "tree-area")
      .append("rect");

    var graphArea = g.append("clipPath")
      .attr("id", "graph-area")
      .append("rect")
      .attr("rx", "20")
      .attr("width", 186);

    g.append("rect").attr("fill", "rgba(0,0,0,0.1)").attr("width", 20000).attr("height", 20000).attr("clip-path", "url(#graph-area)");

    var xScale = d3.scaleOrdinal().domain(data.meanings.map(d => d[1])).range([0, 160]);
    var xAxis = d3.axisBottom();
    xAxis.scale(xScale)
      .ticks(data.meanings.length);

    var scale = g.append("g")
      .attr("class", "axis") //Assign "axis" class .call(xAxis);
      .attr("transform", "translate(10,10)")
      .call(xAxis);
    scale.selectAll("text")
      .style("text-anchor", "end");

    scale.selectAll("text").each(function (d, i) {
      var textWidth = this.getComputedTextLength()
      textWidths.push(textWidth)
    })

    maxTextWidth = Math.max(...textWidths)

    root.descendants().reverse().forEach((d, i) => {
      d.id = i;
      d._children = d.children;
      d.y0 = d.y
      d.x0 = d.x
      d.children = d.depth > 1 ? null : d.children;
      d.isLeaf = d.depth <= 1 && d.children ? false : true;
    });

    const gLink = g.append("g")
      .attr("fill", "none")
      .attr("stroke", "#AAA")
      .attr("stroke-opacity", 0.8)
      .attr("transform", "translate(10,0)");;

    const gNode = g.append("g")
      .attr("cursor", "pointer")
      .attr("pointer-events", "all")
      .attr("transform", "translate(10,0)");

    const gDots = g.append("g")
      .attr("cursor", "pointer")
      .attr("pointer-events", "all")
      .attr("transform", "translate(10,0)");



    function update(event, source) {
      const duration = event?.altKey ? 1000 : 350;
      const transition = g.transition().duration(duration).ease(d3.easeCircle);
      const nodes = root.descendants().reverse();
      const links = root.links();
      clusterLayout(root);

      var leaves = root.leaves();
      height = d3.max(root.descendants(), function (d) { return d.x }) - d3.min(root.descendants(), function (d) { return d.x }) + 2 * (margin.top + margin.bottom) + scale_margin;
      var offset = -1 * d3.min(root.descendants(), function (d) { return d.x }) + margin.top + margin.bottom;
      width = d3.max(root.descendants(), function (d) { return d.y }) + 180 + margin.left;

      gNode.attr("transform", d => `translate(10,${offset})`)
      gLink.attr("transform", d => `translate(10,${offset})`)
      gDots.attr("transform", d => `translate(10,${offset})`)

      //update essentials
      treeArea.attr("width", width - 180)
        .attr("height", height);

      //update nodes
      update_nodes(source, nodes, gNode, transition);
      update_links(source, links, gLink, transition);

      //update graph
      update_graph(nodes, source, height, width, gDots, transition);


      select(svg.current).attr("height", height + margin.top + margin.bottom + (maxTextWidth)); // adjust height
      select(svg.current).transition().duration(duration).attr("width", width + margin.right + margin.left + margin.left + 6); // adjust height
    }

    function update_nodes(source, nodes, gNode, transition) {
      const node = gNode.selectAll("g")
        .data(nodes, d => d.id);

      // Enter any new nodes at the parent's previous position.
      const nodeEnter = node.enter().append("g")
        .attr("transform", d => source.y0 ? `translate(${(source.y0)},${source.x0})` : `translate(${(Number(source.y))},${Number(source.x)})`)
        .attr("fill-opacity", 0)
        .attr("stroke-opacity", 0)
        .on("click", (event, d) => {
          d.children = d.children ? null : d._children;
          d.isLeaf = d._children ? !d.isLeaf : d.isLeaf;

          d3.selectAll('.backText')
            .text(d => d.isLeaf || d.data.variable_description == null ? "" : d.data.variable_description)

          update(event, d);
        });

      nodeEnter.append("circle")
        .attr("r", d => Math.max(Math.log2(d.data.n) / 2, 2.5))
        .attr("fill", d => d._children ? "#555" : "#999")
        .attr("stroke-width", 10);

      nodeEnter.append("text")
        .classed("backText", true)
        .attr("dy", "0.31em")
        .attr("x", 6)
        .attr("text-anchor", "start")
        .text(d => d.isLeaf ? "" : d.data.variable_description)
        .clone(true).lower()
        .attr("stroke-linejoin", "round")
        .attr("stroke-width", 3)
        .attr("stroke", "#F3F3FF");

      nodeEnter.append("text")
        .attr("dy", "0.31em")
        .attr("x", -6)
        .attr("text-anchor", "end")
        .text(d => d.data.variable_description ? d.data.classifier_description : "")
        .clone(true).lower()
        .attr("stroke-linejoin", "round")
        .attr("stroke-width", 3)
        .attr("stroke", "#F3F3FF");

      // Transition nodes to their new position.
      const nodeUpdate = node.merge(nodeEnter).transition(transition)
        .attr("transform", d => `translate(${d.y},${d.x})`)
        .attr("fill-opacity", 1)
        .attr("stroke-opacity", 1);

      // Transition exiting nodes to the parent's new position.
      const nodeExit = node.exit().transition(transition).remove()
        .attr("transform", d => `translate(${source.y},${source.x})`)
        .attr("fill-opacity", 0)
        .attr("stroke-opacity", 0)
    }

    function update_links(source, links, gLink, transition) {
      const diagonal = d3.linkHorizontal().x(d => d.y).y(d => d.x)
      // Update the links…
      const link = gLink.selectAll("path")
        .data(links, d => d.target.id);

      // Enter any new links at the parent's previous position.
      const linkEnter = link.enter().append("path")
        .attr("d", d => {
          const o = { x: source.x0, y: source.y0 };
          return diagonal({ source: o, target: o });
        })
        .attr("stroke-width", d => 1 + Math.log2(d.target.data.n));

      // Transition links to their new position.
      link.merge(linkEnter).transition(transition)
        .attr("d", diagonal);

      // Transition exiting nodes to the parent's new position.
      link.exit().transition(transition).remove()
        .attr("d", d => {
          const o = { x: source.x, y: source.y };
          return diagonal({ source: o, target: o });
        });
    }

    function update_graph(nodes, source, height, width, gDots, transition) {
      graphArea.attr("height", height);
      graphArea.transition(transition).attr("x", width - 180 + margin.right);
      scale.transition(transition).attr("transform", `translate(${width - 170 + margin.right + 3},${height - 20})`)
      if (root.isLeaf) {
        scale.selectAll("text").transition(transition).attr("transform", "rotate(-87.5)")
          .attr("dx", "-.8em")
          .attr("dy", "-.48em");

      } else {
        scale.selectAll("text").transition(transition).attr("transform", "rotate(-65)")
          .attr("dx", "-.8em")
          .attr("dy", ".15em");
      }
      //draw scale

      const dot = gDots.selectAll("g")
        .data(nodes, d => d.id);

      // Enter any new nodes at the parent's previous position.
      const dotEnter = dot.enter().append("g")
        .attr("transform", d => `translate(${width},${0})`)
        .attr("fill-opacity", 0)
        .attr("stroke-opacity", 0)
        .on("click", (event, d) => {
          d.children = d.children ? null : d._children;
          d.isLeaf = !d.isLeaf;
          update(event, d);
        });

      dotEnter.append("circle")
        .attr("r", d => 3 + Math.log2(d.data.n))
        .attr("y", source.y0)
        .attr("fill", function (d) {
          return `rgb(${parseFloat(d.data.classification) * 25},${255 - parseFloat(d.data.classification) * 25},100)`;
        })
        .attr("stroke-width", 10);

      // Transition nodes to their new position.
      const dotUpdate = dot.merge(dotEnter).transition(transition)
        .attr("transform", d => `translate(${width - 180 + 3 - margin.left + (18 * parseFloat(d.data.classification))},${d.x})`) // turn data.classification to int for it to work
        .attr("fill-opacity", d => d.children ? 0 : 1)
        .attr("pointer-events", d => d.children ? "none" : "all")
        .attr("stroke-opacity", 1);

      // Transition exiting nodes to the parent's new position.
      const dotExit = dot.exit().transition().remove()
        .attr("transform", d => `translate(${width + margin.left},${source.x})`)
        .attr("fill-opacity", 0)
        .attr("stroke-opacity", 0)
        .attr("pointer-events", "none");
    }

    // Stash the old positions for transition.
    root.eachBefore(d => {
      d.x0 = d.x;
      d.y0 = d.y;
    });

    update(null, root);
    update(null, root);
  }
  return (
    <div class="scroll" style={{ "backgroundColor": '#FFFFFF', "padding": '20px' }}>
        <svg class="tree-svg" ref={svg} style={{ "backgroundColor": '#F3F3FF', "borderRadius": '25px' }} />
    </div>);
}

export default TreeChart