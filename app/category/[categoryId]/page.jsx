'use client';

import "./SingalCategory.css";
import {useState,useEffect} from "react";
import Link from "next/link";
import { db_2 } from "../../firebase_realtime.js";
import { ref, onValue, set, update, remove , query, orderByChild, equalTo} from "firebase/database";




const SingalCategory = ({params})=>{

	const [currentCategoryProducts,setCurrentCategoryProducts] = useState([]);

	var list = [];

	useEffect(()=>{
		// db.collection('products').orderBy("timestamp","desc").onSnapshot(snapshot=>{
		//   snapshot.docs.map(doc =>{
		// 	if(doc.data().category === params.categoryId){
		// 		list.push(doc.data())
		// 	}
		//   });
		//   console.log(list)
		//   setCurrentCategoryProducts(list);
		// });
		// console.log(currentCategoryProducts);
		//

	

		// (ADDITIONAL) DISPLAY ITEMS
		const q = query(
		  ref(db_2, "messages"),
		  orderByChild("category"),
		  equalTo(params.categoryId)
		);

		onValue(
		  q,
		  (snapshot) => {
		    const data = snapshot.val();
		    if (!data) {
		      setCurrentCategoryProducts([]);
		      return;
		    }

		    // convert → array + sort newest first
		    const sorted = Object.entries(data)
		      .map(([id, values]) => ({ id, ...values }))
		      .sort((a, b) => b.createdAt - a.createdAt); // ✅ newest on top

		    setCurrentCategoryProducts(sorted);
		  },
		  { onlyOnce: true }
		);






	},[]);


	return (
		<div className="SingalCategory">
			<div className="desktop_menu_item_selected_style_for_category_page_in_detail_area">
				<div className="nevigation_btn_background_style_in_category_page_in_detail_area " > </div>
				<div className="nevigation_btn_background_style_in_category_page_in_detail_area "></div>
				<div className="nevigation_btn_background_style_in_category_page_in_detail_area b_in_detail_area">{params.categoryId}</div>
				<div className="nevigation_btn_background_style_in_category_page_in_detail_area bg_white"> </div>
				<div className="nevigation_btn_background_style_in_category_page_in_detail_area bg_white o_s_in_detail_area"> </div>
			</div>

			<div className="singalCategory_products_area">
				{currentCategoryProducts.map((item,index) =>{
		            return (
			            <Link href={`/products/${item.productId}`} key={index} className="singalCategory_product" 
				            >

							{item.stock_status === "out" ? <div className="stock_status_text">out of stock</div> : <></>}
							<div style={{ backgroundImage: "url("+item.leading_image+")",backgroundPosition :'center center',backgroundRepeat : 'no-repeat'}}  className={item.stock_status === "out" ? "image stock_out" : "singalCategory_image"}></div>
							<div className="singalCategory_product_name">{item.product_name} </div>
							<div className="singalCategory_price">৳ {item.product_price}</div>
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

export default SingalCategory;
