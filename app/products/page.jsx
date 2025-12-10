'use client';

import "./Products.css";
import {useState,useEffect} from "react";
/* import db from "./firebase_in_products"; */
import firebase from "firebase/compat/app";
import Link from "next/link";
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset, addToCartFunction } from '../store/reducer.js';


import { db_2 } from "../firebase_realtime.js";
import { ref, onValue, set, update, remove } from "firebase/database";
import { v4 as uuidv4 } from 'uuid';




const ProductsScreen = ()=>{

  const cartLength = useSelector((state) => state.cartLength);
  const cart = useSelector((state)=> state.cart);
  const dispatch = useDispatch();


  const [products,setProducts] = useState([{
	product_name : "-----",
        product_price : "-----",
        product_detail : "-----" ,
        leading_image : "https://imgs.search.brave.com/HeoLn61NvDjdP6PXVEIX0AH9OtHSD5H_vIgdGxApXXM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1LzcwLzY5LzU1/LzM2MF9GXzU3MDY5/NTU4NF9Lc0hNQkw5/ZGE2VkVVbXBTY2VD/N2d3ejRzQWE4VTVp/NC5qcGc",
        first_image : "-----",
        second_image : "-----",
        third_image : "-----",
        forth_image : "-----",
        quantity : 1,
        sizes : "S",
	stock_status : "in"
	},
	{
        product_name : "-----",
        product_price : "-----",
        product_detail : "-----" ,
        leading_image : "https://imgs.search.brave.com/HeoLn61NvDjdP6PXVEIX0AH9OtHSD5H_vIgdGxApXXM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1LzcwLzY5LzU1/LzM2MF9GXzU3MDY5/NTU4NF9Lc0hNQkw5/ZGE2VkVVbXBTY2VD/N2d3ejRzQWE4VTVp/NC5qcGc",
        first_image : "-----",
        second_image : "-----",
        third_image : "-----",
        forth_image : "-----",
        quantity : 1,
        sizes : "S",
	stock_status : "in"
	},
	{
        product_name : "-----",
        product_price : "-----",
        product_detail : "-----" ,
        leading_image : "https://imgs.search.brave.com/HeoLn61NvDjdP6PXVEIX0AH9OtHSD5H_vIgdGxApXXM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1LzcwLzY5LzU1/LzM2MF9GXzU3MDY5/NTU4NF9Lc0hNQkw5/ZGE2VkVVbXBTY2VD/N2d3ejRzQWE4VTVp/NC5qcGc",
        first_image : "-----",
        second_image : "-----",
        third_image : "-----",
        forth_image : "-----",
        quantity : 1,
        sizes : "S",
	stock_status : "in"
	},
	{
        product_name : "-----",
        product_price : "-----",
        product_detail : "-----" ,
        leading_image : "https://imgs.search.brave.com/HeoLn61NvDjdP6PXVEIX0AH9OtHSD5H_vIgdGxApXXM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1LzcwLzY5LzU1/LzM2MF9GXzU3MDY5/NTU4NF9Lc0hNQkw5/ZGE2VkVVbXBTY2VD/N2d3ejRzQWE4VTVp/NC5qcGc",
        first_image : "-----",
        second_image : "-----",
        third_image : "-----",
        forth_image : "-----",
        quantity : 1,
        sizes : "S",
	stock_status : "in"
	}]);



	const [messages, setMessages] = useState([]);

  useEffect(()=>{
  	// db.collection('products').orderBy("timestamp","desc").onSnapshot(snapshot=>{
   //    setProducts(snapshot.docs.map(doc => doc.data()));
   //  });
	/* console.log(products); */
	
	const msgRef = ref(db_2, "messages");

		onValue(msgRef, (snapshot) => {
		  if (!snapshot.exists()) {
		    setProducts([]);
		    return;
		  }

		  const newestFirst = Object.entries(snapshot.val())
		    .map(([id, value]) => ({ id, ...value }))
		    .sort((a, b) => b.createdAt - a.createdAt) // ✅ newest on top

		  setProducts(newestFirst);	
		});

  },[]);


	// CREATE
	const addMessage = () => {

		const id = uuidv4();
		const data = {
			leading_image: "https://firebasestorage.googleapis.com/v0/b/cz-database.appspot.com/o/319637343_3440174402788540_4356361542207011003_n.jpg?alt=media&token=ba04ad24-8086-4e7b-8679-cfc461c050a4",
			first_image: "https://firebasestorage.googleapis.com/v0/b/cz-database.appspot.com/o/319676443_1293798481405031_5727287384283136176_n.jpg?alt=media&token=a2e9bfe8-a439-43ed-a82e-763e24c4d13d",
			second_image: "https://firebasestorage.googleapis.com/v0/b/cz-database.appspot.com/o/319901646_1485032195311218_6478903262143309063_n.jpg?alt=media&token=0a907a74-d3d4-4f6c-8d10-878f52f0abe6",
			quantity: 1,
			forth_image: "https://firebasestorage.googleapis.com/v0/b/cz-database.appspot.com/o/319156738_558901649393545_5642164122364418647_n.jpg?alt=media&token=7e9eedc0-f56c-41fc-b779-3318cd233422",
			product_detail:
			"- Chain Pockets so you never lose your stuff.\n" +
			"- Fabric with NO BRUSH inside.\n" +
			"- Stretchable.\n" +
			"- Elastic waist.\n" +
			"- SIZE\n" +
			"S :- (LENGTH - 38) (WAIST - 28-30)\n" +
			"M :-(LENGTH - 39) (WAIST - 30-32)\n" +
			"L :- (LENGTH - 40) (WAIST - 32-34)\n" +
			"XL :- (LENGTH - 41) (WAIST - 34-36)\n" +
			"2XL:- (LENGTH - 42) (WAIST - 36-38)",
			sizes: "S",
			productId: id ,
			third_image:
			"https://firebasestorage.googleapis.com/v0/b/cz-database.appspot.com/o/319894145_557538636265433_5254539879537447215_n.jpg?alt=media&token=5451f5a9-5e76-4e8b-81f4-f90e3cfa1f41",
			product_name: "3 Unisex Grey joggers",
			category: "Joggers",
			product_price: "850/-",
		};


		set(ref(db_2, "messages/" + id), data);
	};



	return (
		<div className="ProductsScreen">
      <link rel="stylesheet" href="path/to/font-awesome/css/font-awesome.min.css"/>
      <link href="https://fonts.googleapis.com/css2?family=Anton+SC&display=swap" rel="stylesheet"/>
			<div className="desktop_menu_item_selected_style_for_books_page">
				<div className="nevigation_btn_background_style_in_books_page bg_white"> </div>
				<div className="nevigation_btn_background_style_in_books_page b"></div>
				<div className="nevigation_btn_background_style_in_books_page bg_white"></div>
				<div className="nevigation_btn_background_style_in_books_page bg_white"></div>
				<div className="nevigation_btn_background_style_in_books_page bg_white o_s"></div>
			</div>

			<div className="products_area">
				{products.map((item,index) =>{
		            return (
			            <Link href={`/products/${item.productId}`} key={index} className="product" 
				            >

						      {item.stock_status === "out" ? <div className="stock_status_text">out of stock</div> : <></>}
						      <img src={item.leading_image} className={item.stock_status === "out" ? "image stock_out" : "image"}/>

							<div className="product_name">{item.product_name} </div>
							<div className="price">৳ {item.product_price}</div>
			            </Link>);
	          })}
			</div>



					
		      <div className="footer">
			<div className="layer_1">
			  <Link href="/" as="/" className="logo_in_footer">CZ</Link>
			  <a href="https://www.facebook.com/comfortzone.outfit" className="facebook">Facebook</a>
			  <a href="" className="instagram">Instagram</a>
			  <a href="" className="twitter">Twitter</a>
			</div>
			<div className="layer_2">© 2024 CZ. All rights reserved.</div>
		      </div>

				



		</div>
		);
}

export default ProductsScreen;


/*

              <div style={{ backgroundImage: "url("+item.leading_image+")",backgroundPosition :'center center',backgroundRepeat : 'no-repeat'}}  className="image"></div>


*/


























