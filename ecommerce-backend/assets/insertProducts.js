import { Product } from "../models/product.models.js";
import all_product from "../assets/all_product.js"
// import fs from "fs"
// import path from "path"
import { useEffect } from "react";



// useEffect(async function insertProducts(){
//     await Product.insertMany(all_product)
//         .then(() =>{
//             console.log("Data added to the database...");
//         })
//         .catch((err) =>{
//             console.error("Error: ", err);
//         })
//         insertProducts()
// },[])
    


export const insertProducts = await Product.insertMany(all_product)
        .then(() =>{
            console.log("Data added to the database...");
        })
        .catch((err) =>{
            console.error("Error: ", err);
        })




// const products = JSON.parse(fs.readFile('all_product.js', 'utf-8'))
// useEffect(() => {
//    console.log(products); 
// }, [])


// fs.readFile(path.join(__dirname,'all_product.js'), 'utf-8', (err, data) => {
//     if(err)
//         {
//             console.error("Error reading this file: ",Error);
//             return
//         }
//         try {
//             const jsonData = JSON.parse(data)
//         } catch (error) {
//             console.error("Error parsing data: ", error);
//         }
// })
// useEffect(() => {
// console.log(products); 
// }, [])

// const insertProducts = async () =>{
//     try {
//         await Product.insertMany(products)
//         console.log("Products added successfully");
//     } catch (error) {
//         console.error("Error adding products : ", error);
//     }
// }

// useEffect(async function insertProducts(){
//     try {
//         await Product.insertMany(products)
//         console.log("Products added successfully...");
//     } catch (error) {
//         console.error("Error: ", error);
//     }
//     insertProducts()
// }, [])

