import React, { useEffect } from "react"
import * as d3 from 'd3'
import './Menu.css'

var menuDown = false;
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
                menu.transition().duration(350).ease(d3.easeCircle).style("height", "100%")
                contents.transition().duration(350).ease(d3.easeCircle).style("display", null);
                arrow.transition().duration(750).ease(d3.easeCircle).style("transform", "rotate(225deg)").style("-webkit-transform:", "rotate(225deg)");
            } else {
                menu.transition().duration(350).ease(d3.easeCircle).style("height", "0px")
                contents.transition().duration(350).ease(d3.easeCircle).style("display", "none");
                arrow.transition().duration(750).ease(d3.easeCircle).style("transform", "rotate(45deg)").style("-webkit-transform:", "rotate(45deg)");
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
                <div class="dropdown-menu-contents" style={{ "display": "none" }}>
                    <div class="row">
                        <div class="column">
                            <h2>Question of Interest</h2>
                            <p>(Dependent Variable)</p>
                        </div>
                        <div class="column">
                            <h2>Identity Classifications</h2>
                            <p>(Independent Variables)</p>
                        </div>
                    </div>
                </div>
            </div>
            <button className="dropdown-button"><p><i class="arrow"></i></p></button>
        </div>
    );
};
export default Menu;