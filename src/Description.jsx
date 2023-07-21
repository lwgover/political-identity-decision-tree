import React from "react";
import "./Description.css"
const Description = (props) => {
    return (
        <div className="description">
            <hr/>
            <h2 className="desc-header">How to use this visualization</h2>
            <p className="desc-text">
                <ul>
                    <li>
                        Click a black node to expand or collapse the tree.
                    </li>
                    <li>
                        Click a point on the graph to expand the tree at the corresponding node.
                    </li>
                </ul>
            </p>
            <h2 className="desc-header">How it works</h2>
            <p className="desc-text">
            This regression tree program uses data from American responses to the World Values Survey to construct a tree-like model for predicting patterns. It works by first splitting the data based on the most relevant factor, then further sub-dividing it into smaller groups based on each factor's importance. Depending on the types of questions asked, it will either construct a Decision Tree or Regression Tree. A Decision Tree is created for Nominal type questions, which ask for answers that can be classified into categories, while a Regression Tree is used for Ordinal and Ratio type questions, which ask for responses that can be measured numerically.
            </p>
            <h2 className="desc-header">
                Credit
            </h2>
            <p className="desc-text">
            <ul>
                    <li>
                        Visualization inspired by <a href="https://observablehq.com/@d3/collapsible-tree">Mike Bostock's collapsible tree</a>.
                    </li>
                    <li>
                        This program utilizes data from the World Values Survey to construct the tree.
                    </li>
                </ul>
               </p>
        </div>
    );
};
export default Description;