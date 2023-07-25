import React, { useEffect, useRef } from "react"
import { select } from 'd3-selection';
import * as d3 from 'd3'
import './SelectedVariables.css'


const SelectedVariables = ({ variables_list, set_variables_list }) => {
    const ul = useRef();
    useEffect(() => {
        renderVars(variables_list);
    });
    const renderVars = (variables_list) => {
        d3.select(ul.current).selectAll("ul").remove();
        const lists = d3.select(ul.current).append('ul').selectAll("li").data(variables_list.variables).enter().append("li").append("div").classed("selected-variables-item",true);
        lists.append("span").text(d => d.name);
        const button = lists.append("button")
        button.append("span").text("×");
        button.on("click", (event, d) => {
            set_variables_list({"variables":variables_list.variables.filter(a => a != d)});   
        });
    }
    return (
        <div className="selected-variables">
            <ul className="selected-variables-list" ref={ul} />
        </div>);
}

export default SelectedVariables