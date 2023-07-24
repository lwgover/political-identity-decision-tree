import TreeChart from './TreeChart'
import './App.css';
import React, { useState } from 'react';
import * as d3 from 'd3'
import Footer from "./Footer.jsx"
import Description from "./Description.jsx"
import Menu from "./Menu.jsx"

function App() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [DV, setDV] = React.useState({"variables":[]});
  const [IV, setIV] = React.useState({"variables":[]});

  React.useEffect(() => {
    d3.json("https://decision-tree.fly.dev/tree/DP70,DP1,DP2,DP3,DP4,DP5").then((d) => { //http://localhost:5000/tree/DP54,DP3,DP5,DP1,DP2").then((d) => { //
      setData(d);
      setLoading(false);
    });
    return () => undefined;
  }, []);

  return (
    <div className="App">
      <div className="title">
        <h1>American Values Regression Tree</h1>
        <hr/>
      </div>
      <div id="content-wrap">
        <Menu DV={DV} setDV={setDV} IV={IV} setIV={setIV} setLoading={setLoading} setData={setData}/>
        {loading && <div style={{ "backgroundColor": '#FFFFFF', "padding": '25px' }}>App is Loading</div>}
        {!loading && <TreeChart tree={data.tree} data={data.data} />}
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