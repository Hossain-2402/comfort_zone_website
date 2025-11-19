'use client';

import "./ProductDetail.css";
import {useState,useEffect} from "react";
import Link from "next/link";
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset, addToCartFunction } from '../../store/reducer.js';

import { db_2 } from "./firebase_realtime_in_product_detail.js";
import { ref, onValue, set, update, remove } from "firebase/database";



const ProductDetailScreen = ({params})=>{


  const cartLength = useSelector((state) => state.cartLength);
  const cart = useSelector((state)=> state.cart);
  const dispatch = useDispatch();


  const [bgCOLOR,setBgCOLOR] = useState("#E9BD42");
  const [add_to_cart_btn_text,set_add_to_cart_btn_text] = useState("Add to cart");


	const [currentProduct,setCurrentProduct] = useState({
        product_name : "-----",
        product_price : "-----",
        product_detail : "-----" ,
        leading_image : "https://imgs.search.brave.com/HeoLn61NvDjdP6PXVEIX0AH9OtHSD5H_vIgdGxApXXM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1LzcwLzY5LzU1/LzM2MF9GXzU3MDY5/NTU4NF9Lc0hNQkw5/ZGE2VkVVbXBTY2VD/N2d3ejRzQWE4VTVp/NC5qcGc",
        first_image : "-----",
        second_image : "-----",
        third_image : "-----",
        forth_image : "-----",
        quantity : 1,
        sizes : "S"
	});
	const [leading_image,set_leading_image] = useState("");

  useEffect(()=>{
  //   db.collection('products').orderBy("timestamp","desc").onSnapshot(snapshot=>{
  //     snapshot.docs.map(doc =>{
		// if(doc.data().productId === params.productId){
		// 	setCurrentProduct(doc.data()); set_leading_image(doc.data().leading_image)
		// }
	 //  });
	
   /*  }); */



		const itemRef = ref(db_2, "messages/" + params.productId);

		onValue(
			itemRef,
			(snapshot) => {
			if (snapshot.exists()) {
				setCurrentProduct(snapshot.val());
				set_leading_image(snapshot.val().leading_image);
				console.log(snapshot.val());
			} else {
				setCurrentProduct(null);
			}
			},
			{ onlyOnce: true }
		);



    for(let i=0;i<cartLength;i++){
    	if(cart[i].productId === params.productId){
    		setBgCOLOR("grey");
    		set_add_to_cart_btn_text("Added");
    	}
    }
  },[]);

  const hideBtn = ()=>{
  	setBgCOLOR("grey");
  	set_add_to_cart_btn_text("Added");
  }





	return (
		<div className="ProductDetailScreen">
      <link rel="stylesheet" href="path/to/font-awesome/css/font-awesome.min.css"/>
      <link href="https://fonts.googleapis.com/css2?family=Anton+SC&display=swap" rel="stylesheet"/>
			<div className="desktop_menu_item_selected_style_for_books_page_in_detail_area">
				<div className="nevigation_btn_background_style_in_books_page_in_detail_area bg_white_in_detail_area b_in_detail_area" >{currentProduct.product_name} </div>
				<div className="nevigation_btn_background_style_in_books_page_in_detail_area bg_white_in_detail_area"></div>
				<div className="nevigation_btn_background_style_in_books_page_in_detail_area bg_white"></div>
				<div className="nevigation_btn_background_style_in_books_page_in_detail_area bg_white"> </div>
				<div className="nevigation_btn_background_style_in_books_page_in_detail_area bg_white o_s_in_detail_area"> </div>
			</div>

			<div className="path_to_current_page_area">
				<Link href="/" as="/" className="nevigation_redirect_btn">Home</Link> / <Link href="/products" as="/products" className="nevigation_redirect_btn">Products</Link> / {currentProduct.product_name}
			</div>


			<div className="product_detail_area">
				<div className="product_detail_image_area">
					<div className="supporting_images_area">
						<div className="supporting_image first_image" onClick={()=>{set_leading_image(currentProduct.leading_image)}} style={{ backgroundImage: "url("+currentProduct.leading_image+")",backgroundSize : '100%',backgroundRepeat : 'no-repeat',backgroundPosition : 'center center'}}></div>
						<div className="supporting_image second_image" onClick={()=>{set_leading_image(currentProduct.first_image)}} style={{ backgroundImage: "url("+currentProduct.first_image+")",backgroundSize : '100%',backgroundRepeat : 'no-repeat',backgroundPosition : 'center center'}}></div>
						<div className="supporting_image third_image" onClick={()=>{set_leading_image(currentProduct.second_image)}} style={{ backgroundImage: "url("+currentProduct.second_image+")",backgroundSize : '100%',backgroundRepeat : 'no-repeat',backgroundPosition : 'center center'}}></div>
						<div className="supporting_image forth_image" onClick={()=>{set_leading_image(currentProduct.third_image)}} style={{ backgroundImage: "url("+currentProduct.third_image+")",backgroundSize : '100%',backgroundRepeat : 'no-repeat',backgroundPosition : 'center center'}}></div>
						<div className="supporting_image fifth_image" onClick={()=>{set_leading_image(currentProduct.forth_image)}} style={{ backgroundImage: "url("+currentProduct.forth_image+")",backgroundSize : '100%',backgroundRepeat : 'no-repeat',backgroundPosition : 'center center'}}></div>
					</div>
					<div className="detail_leading_image" style={{ backgroundImage: "url("+leading_image+")",backgroundRepeat : 'no-repeat',backgroundPosition : 'center center'}}></div>
				</div>
				<div className="product_detail_info_area">
					<div class="detail_product_name"> {currentProduct.product_name} </div>
					{/*<div class="detail_category_name">Category: category</div>*/}
					<pre class="detail_product_description">{currentProduct.product_detail}</pre>
					<div class="detail_price">৳ {currentProduct.product_price}</div>
				</div>
			</div>

			<div style={{ background:bgCOLOR }} className="add_to_cart_btn"
				onClick={() =>{
          	let isAdded = false;
          	for(let i=0;i<cart.length;i++){
          		if(cart[i].productId === currentProduct.productId){
          			isAdded = true;
          		}
          	}
          	if(!isAdded){	
            	dispatch(addToCartFunction(currentProduct));
            	dispatch(increment());
            	hideBtn();
          	}
        }}>{add_to_cart_btn_text}</div>

        
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

export default ProductDetailScreen;
