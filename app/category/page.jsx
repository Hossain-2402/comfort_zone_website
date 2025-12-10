'use client'

import "./Category.css";
import { useEffect,useState } from "react";
import Link from "next/link";
import { db_2 } from "../firebase_realtime.js";
import { ref, onValue, set, update, remove , query, orderByChild, equalTo} from "firebase/database";

const CategoryScreen = ()=>{
 
  const blur_image_link = "https://imgs.search.brave.com/HeoLn61NvDjdP6PXVEIX0AH9OtHSD5H_vIgdGxApXXM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1LzcwLzY5LzU1/LzM2MF9GXzU3MDY5/NTU4NF9Lc0hNQkw5/ZGE2VkVVbXBTY2VD/N2d3ejRzQWE4VTVp/NC5qcGc";

 

  const [products,setProducts] = useState([
		{category:"-----", categoryImage:blur_image_link },
		{category:"-----", categoryImage:blur_image_link }
	]);

  var list = [];

  var tempList = [];

  useEffect(()=>{
    // db.collection('products').orderBy("timestamp","desc").onSnapshot(snapshot=>{
    //   snapshot.docs.map(doc=>{
    //   	if(!list.includes(doc.data().category)){
    //   		list.push(doc.data().category);
    //   		tempList.push({categoryName: doc.data().category,categoryImage: doc.data().leading_image })
    //   	}
    //   });
    //   setProducts(tempList);
    // });
	



		// UNIQUE CATEGORIES
		const productsRef = ref(db_2, "messages");

		onValue(
			productsRef,
			(snapshot) => {
				const map = {}; // category → categoryImage

				snapshot.forEach((child) => {
					const item = child.val();
					if (!map[item.category]) {
					  map[item.category] = item.leading_image; // store the FIRST image
					}
				});

				// convert to required format
				setProducts(
					Object.entries(map).map(([category, img]) => ({
					  category,
					  categoryImage: img,
					}))
				);
			},
			{ onlyOnce: true }
		);





  },[]);

	return (
		<div className="CategoryScreen">
			<div className="desktop_menu_item_selected_style_for_category_page">
				<div className="nevigation_btn_background_style_in_category_page bg_white"> </div>
				<div className="nevigation_btn_background_style_in_category_page bg_white"></div>
				<div className="nevigation_btn_background_style_in_category_page c"></div>
				<div className="nevigation_btn_background_style_in_category_page bg_white"></div>
				<div className="nevigation_btn_background_style_in_category_page bg_white o_s"></div>
			</div>
			<div className="cover">
			{products.map((item,index)=>{
				return (
						<Link key={index}  href={`/category/${item.category}`}  className="card">
						      {item.stock_status === "out" ? <div className="stock_status_text">out of stock</div> : <></>}
						      <img src={item.categoryImage} className={item.stock_status === "out" ? "image stock_out" : "card_image"}/>
							<div className="layer"></div>
							<p className="categoryName">{item.category}</p>
						</Link>
					);
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

export default CategoryScreen;
