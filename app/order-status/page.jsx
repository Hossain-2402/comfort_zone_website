'use client'

import "./OrderStatus.css";
import Link from "next/link";
import firebase from "firebase/compat/app";
import {useState,useEffect} from "react";
import { v4 as uuidv4 } from 'uuid';
import { db_2 } from "../firebase_realtime.js";
import { ref, onValue, set, update, remove } from "firebase/database";


const OrderStatusScreen = ()=>{

	const [order_id,set_order_id] = useState("");

	const [position_of_the_checkouh_user_info_input_area,set_position_of_the_checkouh_user_info_input_area] = useState("-200vw");

	const[text_here,setText_here] = useState("");

	const [orderedProducts,setOrderedProducts] = useState([{
		    products: [],
		    customerName: "customerName",
		    customerLocation : "customerLocation",
		    customerNumber : "customerNumber",
		    customerEmail : "customerEmail",
		    checkoutID : "tempUniqueId"}]);

	const [currentIndex,setCurrentIndex] = useState(0);

	const [order_status,set_order_status] = useState("Your order was not found");

	const [opacityOfCurrentOrderArea,setOpacityOfCurrentOrderArea] = useState("0");

	const [opacityOfSeeStatusBtn,setOpacityOfSeeStatusBtn] = useState("0");

	const handle_customer_name = (e)=>{
		set_order_id(e.target.value);
	}

	useEffect(()=>{
	  	// db.collection('orders').orderBy("timestamp","desc").onSnapshot(snapshot=>{
	   //    setOrderedProducts(snapshot.docs.map(doc => doc.data()));
	   //  });
	

		const msgRef = ref(db_2, "orders");

		onValue(msgRef, (snapshot) => {
			if (snapshot.exists()) {
				// Equivalent to snapshot.docs.map(...)
				setOrderedProducts(
				  Object.entries(snapshot.val()).map(([id, value]) => ({
				    id,
				    ...value
				  }))
				);
			} else {
				setOrderedProducts([]);
			}
		});




	},[])


	const search = ()=>{
		let is_found = false; 
		setOpacityOfSeeStatusBtn("1")
		for(let i=0;i<orderedProducts.length;i++){
			if(orderedProducts[i].checkoutID === order_id.trim()){
				setCurrentIndex(i);
				set_order_status("Your product/s will be delivered within 7 working days");
				setOpacityOfCurrentOrderArea("1");
				is_found = true;
			}
		}
		if(!is_found){
			set_order_status("Your order was NOT FOUND");
			setOpacityOfCurrentOrderArea("0")
		}

	}

	return (
		<div className="OrderStatusScreen">
			<>
				<link rel="stylesheet" href="path/to/font-awesome/css/font-awesome.min.css"/>
				<link href="https://fonts.googleapis.com/css2?family=Anton+SC&display=swap" rel="stylesheet"/>
				<link href="https://fonts.googleapis.com/css2?family=Arsenal+SC:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet"/>
			</>

			<div className="desktop_menu_item_selected_style_for_order_status_page">
				<div className="nevigation_btn_background_style_in_order_status_page bg_white"> </div>
				<div className="nevigation_btn_background_style_in_order_status_page bg_white"></div>
				<div className="nevigation_btn_background_style_in_order_status_page bg_white"></div>
				<div className="nevigation_btn_background_style_in_order_status_page bg_white"></div>
				<div className="nevigation_btn_background_style_in_order_status_page o_s o"></div>
			</div>

			<div className="cover">
				<input type="text" placeholder="Enter Your Order ID" className="order_status_input" onChange={(e)=>{handle_customer_name(e)}} value={order_id}/>
				<div className="search_btn_in_order_status" onClick={()=>{ search() }}>search</div>
			</div>
			<div style={{ opacity: opacityOfSeeStatusBtn }} className="see_status_btn" onClick={()=>{
				if(order_id !== ""){
					set_position_of_the_checkouh_user_info_input_area("0")
				}else{ alert("Enter your order id")}
			 }}>See Status</div>

			<div style={{ left : position_of_the_checkouh_user_info_input_area }}  className="order_status_area">
				<div className="exit_detail_screen" onClick={()=>{ set_position_of_the_checkouh_user_info_input_area("-200vw");}}><i className="fa fa-times"></i></div>
					
				<p style={{ float: "left",padding:"2vh 2vw",marginTop: "8vh" }}>{order_status}</p>

				<div style={{ opacity: opacityOfCurrentOrderArea }} className="cart_products_area" >
					{orderedProducts[currentIndex].products.map((item,index) =>{
			            return (
				            <div key={index} className="cartProduct" onClick={()=>{ set_position_of_the_detail_area("0vw"); setCurrentProduct(item); set_leading_image(item.leading_image); setTempIndex(index); setTempSize(item.sizes); setTempQuantity(item.quantity); }}>
								<div style={{ backgroundImage: "url("+item.leading_image+")",backgroundPosition :'center center',backgroundRepeat : 'no-repeat',backgroundSize : '85%'}}  className="cartProductImage"></div>
								<div className="cart_product_name">{item.product_name} </div>
								<div className="cart_price">৳ {item.product_price}</div>
								<div className="quantity">Quantity {item.quantity}</div>
								<div className="size">Size {item.sizes}</div>
				            </div>);
			          })}
				</div>
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

export default OrderStatusScreen;



// 57e978fe-ac3d-40a7-9df4-039fd75303f6

// af5a18f2-2c32-4391-a038-d9c11eab1717
