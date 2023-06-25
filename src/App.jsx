import TreeChart from './TreeChart'
import './App.css';
import React, {useState} from 'react';
import * as d3 from 'd3'

function App() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    d3.json("https://decision-tree.fly.dev/tree/DP54,DP3,DP5").then((d) => {
      setData(d);
      setLoading(false);
    });
    return () => undefined;
  }, []);
 return (
   <div className="App">
      <h2>American Values Regression Tree</h2>
      {loading && <div>App is Loading</div>}
      {!loading &&<TreeChart data={data}/>}
   </div>
 );
}
export default App;