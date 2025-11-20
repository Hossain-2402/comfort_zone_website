'use client';

import "./CartScreen.css";
import {useState,useEffect} from "react";
import firebase from "firebase/compat/app";
import Link from "next/link";
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset, addToCartFunction } from '../store/reducer.js';
import { v4 as uuidv4 } from 'uuid';
import { db_2 } from "../firebase_realtime.js";
import { ref, onValue, set, update, remove } from "firebase/database";

const CartScreen = ()=>{


	const cartProducts = useSelector((state)=> state.cart);

	const [position_of_the_detail_area,set_position_of_the_detail_area] = useState("-200vw"); 

	const [position_of_the_checkouh_user_info_input_area,set_position_of_the_checkouh_user_info_input_area] = useState("-200vw"); 

	const [currentProduct,setCurrentProduct] = useState({
		product_name : "Product Name",
		product_price : "55",
		product_detail : " Product detail" ,
		leading_image : "Some Image",
		first_image : "first image",
		second_image : "second image",
		third_image : "third image",
		forth_image : "forth image",
		quantity : 1,
		sizes : "S",
		
	});
	const [leading_image,set_leading_image] = useState("");  

	const [tempIndex,setTempIndex] = useState();

	const [tempSize,setTempSize] = useState("");

	const [tempQuantity,setTempQuantity] = useState(1);

	const [total_product_price,set_total_product_price] = useState(0);

	const [total_purchase_price,set_total_purchase_price] = useState(0);

	const shipping_price = 70;


	const [customerName,setCustomerName] = useState("");
	const [customerLocation,setCustomerLocation] = useState("");
	const [customerNumber,setCustomerNumber] = useState("");
	const [customerEmail,setCustomerEmail] = useState("");

	const [checkoutId,setCheckoutId] = useState("");

	const [positionOfThis,setPositionOfThis] = useState(0);


	useEffect(()=>{
		let cost = 0;
		for(let i=0;i<cartProducts.length;i++){
			cost = cost + (cartProducts[i].quantity * parseInt(cartProducts[i].product_price));
		}
		set_total_product_price(cost);
		set_total_purchase_price(cost+shipping_price)
	},[])



	const smallSize = ()=>{
	    cartProducts[tempIndex].sizes = "S";
	    setTempSize("S");
	}
	const mediumSize = ()=>{
	    cartProducts[tempIndex].sizes = "M";
	    setTempSize("M");
	}
	const largeSize = ()=>{
	    cartProducts[tempIndex].sizes = "L";
	    setTempSize("L");
	}
	const xlSize = ()=>{
	    cartProducts[tempIndex].sizes = "XL";
	    setTempSize("XL");
	}

	const increaseQuantity = ()=>{
		let a = tempQuantity;
		setTempQuantity(a+1);
		cartProducts[tempIndex].quantity = cartProducts[tempIndex].quantity + 1;
		set_total_product_price(total_product_price + parseInt(cartProducts[tempIndex].product_price));
	}
	const decreaseQuantity = ()=>{
		let a = tempQuantity;
		if(tempQuantity > 0){
			setTempQuantity(a-1);
			cartProducts[tempIndex].quantity = cartProducts[tempIndex].quantity - 1;
		set_total_product_price(total_product_price - parseInt(cartProducts[tempIndex].product_price));
		}
	}


	const handle_customer_name = (e)=>{
	setCustomerName(e.target.value);
	}

	const handle_customer_location = (e)=>{
	setCustomerLocation(e.target.value);
	}

	const handle_customer_number = (e)=>{
	setCustomerNumber(e.target.value);
	}

	const handle_customer_email = (e)=>{
	setCustomerEmail(e.target.value);
	}


	const placeAnOrder = ()=>{
		if(customerName === "" || customerLocation === "" || customerNumber === "" || customerEmail === ""){
		  alert("Fillup the form first");
		}
		else{

		  const tempUniqueId = uuidv4();
		  setCheckoutId(tempUniqueId);
		  // db.collection('orders').add({ 
		    // products: cartProducts,
		    // customerName: customerName,
		    // customerLocation : customerLocation,
		    // customerNumber : customerNumber,
		    // customerEmail : customerEmail,
		    // timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		    // checkoutID : tempUniqueId
				//
		  // });
			



		const data = { 
		    products: cartProducts,
		    customerName: customerName,
		    customerLocation : customerLocation,
		    customerNumber : customerNumber,
		    customerEmail : customerEmail,
		    checkoutID : tempUniqueId
		  };


		set(ref(db_2, "orders/" + tempUniqueId), data);
	console.log("data added");


		  setCustomerName("");
		  setCustomerLocation("");
		  setCustomerEmail("");
		  setCustomerNumber("");
		  setPositionOfThis(1);
    }
	}



	return (
		<div className="CartScreen">
      <link rel="stylesheet" href="path/to/font-awesome/css/font-awesome.min.css"/>
      <link href="https://fonts.googleapis.com/css2?family=Anton+SC&display=swap" rel="stylesheet"/>
			<div className="desktop_menu_item_selected_style_for_Cart_page">
				<div className="nevigation_btn_background_style_in_Cart_page bg_white"> </div>
				<div className="nevigation_btn_background_style_in_Cart_page bg_white"></div>
				<div className="nevigation_btn_background_style_in_Cart_page bg_white"></div>
				<div className="nevigation_btn_background_style_in_Cart_page bg_white"></div>
				<div className="nevigation_btn_background_style_in_Cart_page bg_white o_s"></div>
			</div>

			<div style={{ left : position_of_the_detail_area }} className="detail_cart_product">

				<div className="exit_detail_screen" onClick={()=>{ set_position_of_the_detail_area("-200vw") }}><i className="fa fa-times"></i></div>

				<div className="product_detail_area">

					<div className="cart_product_detail_image_area">
						<div className="cart_supporting_images_area">
							<div className="cart_supporting_image first_image" onClick={()=>{set_leading_image(currentProduct.leading_image)}} style={{ backgroundImage: "url("+currentProduct.leading_image+")",backgroundSize : '100%',backgroundRepeat : 'no-repeat',backgroundPosition : 'center center'}}></div>
							<div className="cart_supporting_image second_image" onClick={()=>{set_leading_image(currentProduct.first_image)}} style={{ backgroundImage: "url("+currentProduct.first_image+")",backgroundSize : '100%',backgroundRepeat : 'no-repeat',backgroundPosition : 'center center'}}></div>
							<div className="cart_supporting_image third_image" onClick={()=>{set_leading_image(currentProduct.second_image)}} style={{ backgroundImage: "url("+currentProduct.second_image+")",backgroundSize : '100%',backgroundRepeat : 'no-repeat',backgroundPosition : 'center center'}}></div>
							<div className="cart_supporting_image forth_image" onClick={()=>{set_leading_image(currentProduct.third_image)}} style={{ backgroundImage: "url("+currentProduct.third_image+")",backgroundSize : '100%',backgroundRepeat : 'no-repeat',backgroundPosition : 'center center'}}></div>
							<div className="cart_supporting_image fifth_image" onClick={()=>{set_leading_image(currentProduct.forth_image)}} style={{ backgroundImage: "url("+currentProduct.forth_image+")",backgroundSize : '100%',backgroundRepeat : 'no-repeat',backgroundPosition : 'center center'}}></div>
						</div>
						<div className="cart_detail_leading_image" style={{ backgroundImage: "url("+leading_image+")",backgroundRepeat : 'no-repeat',backgroundPosition : 'center center'}}></div>
					</div>

					<div className="cart_product_detail_info_area">
						<div class="cart_detail_product_name"> {currentProduct.product_name} </div>
						<pre class="cart_detail_product_description">{currentProduct.product_detail}</pre>
						<div class="cart_detail_price">৳ {currentProduct.product_price}</div>
					</div>
				</div>

				<div className="product_measurement_area">
					<div className="size_text">Your size is : {tempSize}</div>
					 <div className="sizes_area">
			            <div className="size_btn small_size_btn" onClick={()=>{smallSize()}}>S</div>
			            <div className="size_btn medium_size_btn" onClick={()=>{mediumSize()}}>M</div>
			            <div className="size_btn large_size_btn" onClick={()=>{largeSize()}}>L</div>
			            <div className="size_btn xl_size_btn" onClick={()=>{xlSize()}}>XL</div>
			          </div>
				</div>

				<div className="quantity_area">
					<div className="decrease_auantity_btn" onClick={()=>{decreaseQuantity()}}>-</div>
					<div className="quantity">{tempQuantity}</div>
					<div className="increase_auantity_btn" onClick={()=>{increaseQuantity()}}>+</div>
		        </div>


			</div>

			<div style={{ left : position_of_the_checkouh_user_info_input_area }} className="checkouh_user_info_input_area">
				<div className="exit_detail_screen" onClick={()=>{ set_position_of_the_checkouh_user_info_input_area("-200vw") }} ><i className="fa fa-times"></i></div>

				<div className="input_area">
					<input type="text" placeholder="Enter Your name" className="use_name" onChange={(e)=>{handle_customer_name(e)}} value={customerName}/>
					<textarea type="text" placeholder="Enter Your location" className="use_name" onChange={(e)=>{handle_customer_location(e)}} value={customerLocation}></textarea>
					<input type="email" placeholder="Enter Your email" className="use_name" onChange={(e)=>{handle_customer_email(e)}} value={customerEmail}/>
					<input type="number" placeholder="Enter Your number" className="use_name" onChange={(e)=>{handle_customer_number(e)}} value={customerNumber}/>
				</div>

				<div className="confirm_order_btn" onClick={()=>{placeAnOrder()}}> Confirm Order </div>

				<div style={{opacity : positionOfThis}} className="checkoutId">Your Id is : {checkoutId}</div>
				<div style={{opacity : positionOfThis}} className="note">Remember This id and go to ( Order Status ) from ( Menu ) to see status of your order</div>

			</div>


			{cartProducts.length === 0 ?

				<div className="no_product_in_cart_area">No items in cart</div>
			:
				<>
					<div className="cart_products_area" >
						{cartProducts.map((item,index) =>{
				            return (
					            <div key={index} className="cartProduct" onClick={()=>{ set_position_of_the_detail_area("0vw"); setCurrentProduct(item); set_leading_image(item.leading_image); setTempIndex(index); setTempSize(item.sizes); setTempQuantity(item.quantity); }}>
									<div style={{ backgroundImage: "url("+item.leading_image+")",backgroundPosition :'center center',backgroundRepeat : 'no-repeat',backgroundSize : '85%'}}  className="cartProductImage"></div>
									<div className="cart_product_name">{item.product_name} </div>
									<div className="cart_price">৳ {item.product_price}</div>
					            </div>);
				          })}
					</div>

					<div className="cart_products_pricing_area">
					  	<div className="lable_area">
					  		<div className="total_price_lable">Total Porduct price :  </div>
					  		<div className="shipping_price_lable">Shipping price : </div>
					  		<div className="total_purchase_price_lable">Total cost : </div>
					  	</div>
					  	<div className="total_price_area">
					  		<div className="total_product_price">৳ {total_product_price} </div>
					  		<div className="shipping_price">৳ 70</div>
					  		<div className="total_purchase_price">৳ {total_purchase_price}</div>
					  	</div>
					</div>

					<div className="checkout_btn" onClick={()=>{ set_position_of_the_checkouh_user_info_input_area("0") }}>Checkout</div>
				</>

			  }


			  
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

export default CartScreen;

// asd;
