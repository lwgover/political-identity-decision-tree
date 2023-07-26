import React from "react";
import "./Description.css"
const Description = (props) => {
    return (
        <div className="description">
            <hr />
            <h2 className="desc-header">How to use this visualization</h2>
            <div className="desc-text">
                <ul>
                    <li>
                        Click a black node to expand or collapse the tree.
                    </li>
                    <li>
                        Click a point on the graph to expand the tree at the corresponding node.
                    </li>
                    <li>
                        Use the menu to generate a new tree, or change the color scheme.
                    </li>
                </ul>
            </div>
            <h2 className="desc-header">How to read the chart</h2>
            <p className="desc-text">
                Regression trees are a powerful way to analyze patterns in political identity and values. This program utilizes American responses to the World Values Survey to create a tree-like model that can predict patterns based on the responses. The root node is the initial question asked, and the various paths that branch out denote the different responses to that question. Subsequent questions are then asked along each of these paths until a leaf node is reached.

                The size of each branch represents the frequency with which each response was given, which gives a better representation of how different identities and values are related. Additionally, the graph on the right displays the most likely values of the person who gave the responses that led it to that leaf node, further helping to visualize these patterns.
            </p>
            <h2 className="desc-header">How it works</h2>
            <p className="desc-text">
                It works by first splitting the data based on the most relevant factor, then further sub-dividing it into smaller groups based on each factor's importance. Depending on the types of questions asked, it will either construct a Decision Tree or Regression Tree. A Decision Tree is created for Nominal type questions, which ask for answers that can be classified into categories, while a Regression Tree is used for Ordinal and Ratio type questions, which ask for responses that can be measured numerically.
            </p>
            <h2 className="desc-header">
                Credit
            </h2>
            <div className="desc-text">
                <ul>
                    <li>
                        Visualization inspired by <a href="https://observablehq.com/@d3/collapsible-tree">Mike Bostock's collapsible tree</a>.
                    </li>
                    <li>
                        This program utilizes data from the World Values Survey to construct the tree.
                    </li>
                </ul>
            </div>
        </div>
    );
};
export default Description;