import React, { useEffect } from "react"
import './select-search.css'
import * as d3 from 'd3'
import './Menu.css'
import VariableSelectSearch, { DVSelectSearch, IVSelectSearch, ColorschemeSelectSearch} from './VariableSelectSearch';
import SelectedVariables from "./SelectedVariables";

var menuDown = true;

const Menu = ({setLoading, setData, setFailedLoad, setLastQuery, setColorScheme, colorScheme}) => {
    const [DV, setDV] = React.useState({"variables":[ {
        "name": "Left vs right",
        "value": "DP70"
      }]});
      const [IV, setIV] = React.useState({"variables":[{
        "name": "Biological sex",
        "value": "DP1"
      },
      {
        "name": "Ethnicity",
        "value": "DP3"
      },
      {
        "name": "Education",
        "value": "DP5"
      },]});

    
    
    const resetData = () => {
        if(DV.variables.length <= 0){
            alert("Plase enter a question before submitting.")
            return;
        }
        if(IV.variables.length <= 0){
            alert("Plase enter one or more identity classifications before submitting.")
            return;
        }
        setLoading(true);
        var query = DV.variables[0].value
        for(var i = 0; i < IV.variables.length; i++){
            query += ",";
            query += IV.variables[i].value
        }
        setLastQuery(query)
        d3.json("https://decision-tree.fly.dev/tree/" + query)
        .catch((d)=> setFailedLoad(true))
        .then((d) => {
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
            button.style("background-color", "#D81E5B").style("border-color", "#D81E5B").transition().duration(200).ease(d3.easeCircle).style("background-color", "#EE4266").style("border-color", "#EE4266");
            if (menuDown) {
                //contents.transition().duration(350).ease(d3.easeCircle).style("display", null);
                console.log(contents.node().getBoundingClientRect().bottom - contents.node().getBoundingClientRect().bottom);
                
                menu.transition().duration(350).ease(d3.easeCircle).style("height", `${contents.node().getBoundingClientRect().height}px`);
                //contents.transition().duration(3500).ease(d3.easeCircle).style("height", "0%");
                arrow.transition().duration(750).ease(d3.easeCircle).style("transform", "rotate(225deg)").style("-webkit-transform:", "rotate(225deg)");
            } else {
                menu.transition().duration(350).ease(d3.easeCircle).style("height", "0px");
                //contents.transition().duration(3500).ease(d3.easeCircle).style("height", "0%");
                //contents.transition().duration(350).ease(d3.easeCircle).style("height":"");
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
                <div className="dropdown-menu" style={{ "overflow":"hidden" }}>
                    <div className="dropdown-menu-contents">
                        <div className="row">
                            <div className="column">
                                <h2>Question of Interest</h2>
                                <hr />
                                <SelectedVariables variables_list={DV} set_variables_list={setDV} />
                                <DVSelectSearch setDV={setDV} />
                                <h2>Color Scheme</h2>
                                <hr />
                                <SelectedVariables variables_list={colorScheme} set_variables_list={setColorScheme} />
                                <ColorschemeSelectSearch setColorSchemefn={setColorScheme}/>
                            </div>
                            <div className="column">
                                <h2>Identity Classifications</h2>
                                <hr />
                                <SelectedVariables variables_list={IV} set_variables_list={setIV} />
                                <IVSelectSearch IV={IV} setIV={setIV} />
                                <hr/>
                                <div style={{"padding": "20px"}}><div className="submit" onClick={resetData}>submit</div></div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="dropdown-button"><p><i className="arrow"></i></p></div>
            </div>
        </div>
    );
};
export default Menu;