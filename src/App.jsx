import TreeChart from './TreeChart'
import './App.css';
import React, { useState } from 'react';
import * as d3 from 'd3'
import Footer from "./Footer.jsx"
import Description from "./Description.jsx"
import Menu from "./Menu.jsx"

const RenderTree = ({setLoading, setData, setFailedLoad, lastQuery, loading, data, failedLoad, colorScheme}) => {
  var reloadButton=d3.select(".reload-button");
  const reloadTree = () => {
    reloadButton.style("background-color", "rgb(138, 154, 168)").transition().duration(200).ease(d3.easeCircle).style("background-color", "aliceblue");
    setLoading(true);
    setFailedLoad(false);
    d3.json(lastQuery)
    .then((d) => { //http://localhost:5000/tree/DP54,DP3,DP5,DP1,DP2").then((d) => { //
      console.log("reloaded correctly")
      setData(d);
      setLoading(false);
      setFailedLoad(false)
    }).catch((d)=> {setFailedLoad(true);});
  }

  if(failedLoad){
    return (<div className="app-visual" style={{ "backgroundColor": '#FFFFFF', "padding": '25px' }}>
      <h3>App Failed to load</h3>
      <button className="reload-button" onClick={reloadTree}>try again</button>
    </div>)
  }

  return (<div className="app-visual">
      {loading && <div style={{ "backgroundColor": '#FFFFFF', "padding": '50px' }}><span className="loading-screen">App is Loading</span></div>}
      {!loading && <TreeChart tree={data.tree} data={data.data} colorScheme={colorScheme}/>}
  </div>);
}

function App() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [colorScheme, setColorScheme] = React.useState({"variables":[{"name":"blue-to-red","value":"blue-to-red"}]});
  const [failedLoad, setFailedLoad] = React.useState(false);
  const [lastQuery, setLastQuery] = React.useState("https://decision-tree.fly.dev/tree/DP70,DP1,DP3,DP5");


  React.useEffect(() => {
    d3.json("https://decision-tree.fly.dev/tree/DP70,DP1,DP3,DP5")
    .then((d) => { //http://localhost:5000/tree/DP54,DP3,DP5,DP1,DP2").then((d) => { //
      setData(d);
      setLoading(false);
      setFailedLoad(false)
    }).catch((d)=> {setFailedLoad(true);});
    return () => undefined;
  }, []);

  return (
    <div className="App">
      <div className="title">
        <h1>American Values Regression Tree</h1>
        <hr/>
      </div>
      <div id="content-wrap">
        <Menu setLoading={setLoading} setData={setData} setColorScheme={setColorScheme} setFailedLoad={setFailedLoad} setLastQuery={setLastQuery} colorScheme={colorScheme}/>
        <RenderTree setLoading={setLoading} setData={setData} setFailedLoad={setFailedLoad} lastQuery={lastQuery} loading={loading} data={data} failedLoad={failedLoad} colorScheme={colorScheme}/>
        <div className="random-10px-padding"/>
        <div className='description-container'>
        <Description />
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default App;