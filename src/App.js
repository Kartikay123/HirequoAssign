import logo from './logo.svg';
import './App.css';
import Table from './component/Table';
import { useState,useEffect } from 'react';
import axios from 'axios';
import Pagination from './component/Pagination';


function App() {
  const [currentpage,setcurrentpage] =useState(1);
  const [dataperpage,setdataperpage]=useState(10);
  const [data, setData] = useState([]);
  const laspost= currentpage*dataperpage;
  const firstpost= laspost-dataperpage;
  useEffect(() => {
    axios.get('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
        .then(res => setData(res.data))
        .catch(err => console.log(err))
}, [])

  const newdata= data.slice(firstpost,laspost);
  return (
    <div className="App">
      <h1>ADMIN DASHBOARD</h1>
      <Table ndata={newdata}/>
      <Pagination total={data.length} dataperpage={dataperpage} setcurrentpage={setcurrentpage} 
      currentpage={currentpage}/>
      
    </div>
  );
}

export default App;
