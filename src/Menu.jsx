import React, { useEffect } from "react"
import './select-search.css'
import * as d3 from 'd3'
import './Menu.css'
import VariableSelectSearch, { DVSelectSearch, IVSelectSearch } from './VariableSelectSearch';
import SelectedVariables from "./SelectedVariables";

var menuDown = false;

const Menu = ({ DV, setDV, IV, setIV, setLoading, setData }) => {
    console.log("set loading:")
    console.log(setLoading);
    const resetData = () => {
        setLoading(true);
        var query = DV.variables[0].value
        for(var i = 0; i < IV.variables.length; i++){
            query += ",";
            query += IV.variables[i].value
        }
        console.log(query)
        d3.json("https://decision-tree.fly.dev/tree/" + query).then((d) => {
            setData(d);
            setLoading(false);
        });
    }
    useEffect(() => {
        renderDropdown()
    });
    const renderDropdown = () => {
        const menu = d3.select(".dropdown-menu");
        const button = d3.select(".dropdown-button");
        const arrow = d3.select(".arrow");
        const contents = d3.select(".dropdown-menu-contents");

        const update = () => {
            button.style("background-color", "#D81E5B").style("border-color", "#D81E5B").transition().duration(200).ease(d3.easeCircle).style("background-color", "#EE4266").style("border-color", "#EE4266")
            if (menuDown) {
                contents.transition().duration(350).ease(d3.easeCircle).style("display", null);
                menu.transition().duration(350).ease(d3.easeCircle).style("height", "100%")
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

    //<SelectSearch options={options} name="language" placeholder="Choose Independent Variable" />
    return (
        <div className="Menu">
            <div className="menu-shadow">
                <div className="dropdown-menu">
                    <div className="dropdown-menu-contents" style={{ "display": "none" }}>
                        <div className="row">
                            <div className="column">
                                <h2>Identity Classifications</h2>
                                <hr />
                                <SelectedVariables variables_list={IV} set_variables_list={setIV} />
                                <IVSelectSearch IV={IV} setIV={setIV} />

                            </div>
                            <div className="column">
                                <h2>Question of Interest</h2>
                                <hr />
                                <SelectedVariables variables_list={DV} set_variables_list={setDV} />
                                <DVSelectSearch setDV={setDV} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="column">
                            </div>
                            <div className="column">
                                <div className="submit" onClick={resetData}>submit</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="dropdown-button"><p><i class="arrow"></i></p></div>
            </div>
        </div>
    );
};
export default Menu;