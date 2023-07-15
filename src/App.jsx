import TreeChart from './TreeChart'
import './App.css';
import React, {useState} from 'react';
import * as d3 from 'd3'
import Footer from "./Footer.jsx"

function App() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    d3.json("https://decision-tree.fly.dev/tree/DP54,DP1,DP2").then((d) => { //http://localhost:5000/tree/DP54,DP3,DP5,DP1,DP2").then((d) => { //
      setData(d);
      setLoading(false);
    });
    return () => undefined;
  }, []);
 return (
   <div className="App">
      <h2>American Values Regression Tree</h2>
      {loading && <div>App is Loading</div>}
      {!loading &&<TreeChart tree = {data.tree} data={data.data}/>}
      <Footer/>
   </div>
 );
}
export default App;