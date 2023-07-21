import React, { useEffect } from "react"
import * as d3 from 'd3'
import './Menu.css'

var menuDown = true;
const Menu = () => {
    useEffect(() => {
        renderDropdown()
    });
    const renderDropdown = () => {
        const menu = d3.select(".dropdown-menu");
        const button = d3.select(".dropdown-button");
        const arrow = d3.select(".arrow");
        const contents = d3.select(".dropdown-menu-contents"); 

        const update = () => {
            if (menuDown) {
                menu.transition().duration(100).ease(d3.easeCircle).style("height", "400px")
                contents.style("display","true");
                arrow.transition().duration(100).ease(d3.easeCircle).style("transform", "rotate(225deg)").style("-webkit-transform:", "rotate(225deg)");
            } else {
                menu.transition().duration(100).ease(d3.easeCircle).style("height", "0px")
                contents.style("display","false");
                arrow.transition().duration(100).ease(d3.easeCircle).style("transform", "rotate(45deg)").style("-webkit-transform:", "rotate(45deg)");
            }
        }
        button.on("click", (event, d) => {
            menuDown = !menuDown;
            update();
        });
        update();

    }

    return (
        <div className="Menu">
            <div className="dropdown-menu">
                <div class="dropdown-menu-contents">
                    [insert menu to query database and make tree here]
                </div>
            </div>
            <button className="dropdown-button"><p><i class="arrow"></i></p></button>
        </div>
    );
};
export default Menu;