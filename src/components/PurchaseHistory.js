import React, { useState, useContext, useEffect } from "react";
import './PurchaseHistory.css';
import axios from "axios";
import { UserContext } from "./UserContext";

//const express = require('express');
//const bodyParser = require('body-parser');
//const mysql = require('mysql');

const URL = 'database-1.cmkw6xcxraqi.us-east-1.rds.amazonaws.com'

/*const connection = mysql.createPool({
  host     : 'database-1.cmkw6xcxraqi.us-east-1.rds.amazonaws.com',
  user     : 'admin',
  password : 'admin1234',
  database : 'zoo_db'
});*/

const PurchaseHistory = () => {
    const { user } = useContext(UserContext);

    const [customers, setCustomers] = React.useState([]);
    const [purchaseHistory, setPurchaseHistory] = useState([]); 
    const [itemKey, setItemKey] = useState([]); 
    let id = user.userID;

    const getPurchaseHistory = () => {
        console.log("getting purchase history...");
        axios
            .get(`/purchaseHistory/history`, {
                params: { userID: id },
            })
            .then((res) => {
                // console.log(res);
                // console.log(res.data);
                setPurchaseHistory(res.data); 
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getItemKey = () => {
        console.log("getting item_id and product_name");
        axios
            .get(`merchandise/all`)
            .then((res) => {
                // console.log(res);
                // console.log(res.data);
                setItemKey(res.data); 
            })
            .catch((err) => {
                console.log(err);
            });
    }


    // added sql data
    React.useEffect(() => {
        getData()
        getPurchaseHistory();
        getItemKey(); 
    }, [])

    console.log(purchaseHistory); 
    console.log(itemKey); 

    const getData = async () => {

        const response = await axios.get(URL)
        setCustomers(response.data)
    }

    const renderHeader = () => {
        let headerElement = ['id', 'name', 'purchase date', 'item', 'quantity', 'total cost']

        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    const renderBody = () => {
        return customers && customers.map(({ id, name, date, item, quantity, cost }) => {
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{date}</td>
                    <td>{item}</td>
                    <td>{quantity}</td>
                    <td>{cost}</td>
                </tr>
            )
        })
    }

      

    

    return (
        <>
            <h1 id='title'>Purchase History</h1>
            <table id='customer'>
                <thead>
                    <tr>{renderHeader()}</tr>
                </thead>
                <tbody>
                    {renderBody()}
                </tbody>
            </table>
        </>
    )
}


export default PurchaseHistory;