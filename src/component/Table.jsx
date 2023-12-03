import React from "react";
import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import './Table.css';
import { RiDeleteBin5Line } from "react-icons/ri";

import axios from 'axios';

function Table({ ndata }) {
    const [data, setData] = useState([]);
    const [editid, seteditid] = useState(-1);
    const [selectAll, setSelectAll] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [upname, upsetname] = useState('');
    const [upemail, upsetemail] = useState('');
    const [uprole, upsetrole] = useState('');
    const [searchfield, setsearchfield] = useState('');



    useEffect(() => {
        // Copy the initial data to the state only once when the component mounts
        setData(ndata);
    }, [ndata]);

    const toggleRow = (id) => {
        if (selectedRows.includes(id)) {
            setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
        } else {
            setSelectedRows([...selectedRows, id]);
        }
    };

    const toggleSelectAll = () => {
        setSelectAll(!selectAll);
        setSelectedRows(selectAll ? [] : data.map((row) => row.id));
    };



    const handledit = (id) => {
        // seteditid(id);
        // axios.get('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json' + id)
        //     .then(res => {
        //         upsetemail(res.data.email);
        //         upsetname(res.data.name);
        //         upsetrole(res.data.role);

        //     })
        //     .catch(err => console.log(err))
        // seteditid(id);
        seteditid(id);
  const selectedRow = data.find((row) => row.id === id);
  upsetemail(selectedRow.email);
  upsetname(selectedRow.name);
  upsetrole(selectedRow.role);
    }

    const handleUpdate = () => {
        const updatedData = data.map((row) => {
            if (row.id === editid) {
              return { ...row, name: upname, email: upemail, role: uprole };
            }
            return row;
          });
          setData(updatedData);
          seteditid(-1);
    };


    const handleDelete = (id) => {
        const updatedData = data.filter((row) => row.id !== id);
        setData(updatedData);

    };

    const deleteAllSelected = () => {
        const updatedData = data.filter((row) => !selectedRows.includes(row.id));
        setData(updatedData);
        setSelectedRows([]); // Clear selected rows after deletion
    };

    return (
        <div className="conatiner">
            <input className="searchboxw"
                type='search'
                placeholder='search-values'
                onChange={(e) => setsearchfield(e.target.value)}
            />
            <button className='deleteall'onClick={deleteAllSelected}><RiDeleteBin5Line /></button>
            <table >
                <thead>
                    <tr>
                        <th>
                            <input
                                type="checkbox"
                                checked={selectAll}
                                onChange={toggleSelectAll}
                            />
                        </th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {data.filter((user) =>  user.name.toLowerCase().includes(searchfield.toLowerCase()) ||
              user.email.toLowerCase().includes(searchfield.toLowerCase()) ||
              user.role.toLowerCase().includes(searchfield.toLowerCase())).map((value, key) => {

                        return (
                            value.id === editid ?
                                <tr>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={selectedRows.includes(value.id)}
                                            onChange={() => toggleRow(value.id)}
                                        />
                                    </td>
                                    <td><input type="text" value={value.upname} onClick={e => upsetname(e.target.value)} /></td>
                                    <td><input type="text" value={value.upemail} onClick={e => upsetemail(e.target.value)} /></td>
                                    <td><input type="text" value={value.uprole} onClick={e => upsetrole(e.target.value)} /></td>
                                    <td><button onClick={handleUpdate}>Update</button></td>
                                </tr>
                                :
                                <tr key={key}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={selectedRows.includes(value.id)}
                                            onChange={() => toggleRow(value.id)}
                                        />
                                    </td>
                                    <td>{value.name}</td>
                                    <td>{value.email}</td>
                                    <td>{value.role}</td>
                                    <td>
                                        <button onClick={() => handledit(value.id)}>
                                            <CiEdit />
                                        </button>
                                        <button onClick={() => handleDelete(value.id)}>
                                            <MdDeleteOutline />
                                        </button>

                                    </td>
                                </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Table;