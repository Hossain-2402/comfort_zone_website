'use client';

import "./Home.css";
import { useEffect,useState } from "react";
/* import db from "./firebase"; */
import firebase from "firebase/compat/app";
import Link from "next/link";
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset } from './store/reducer.js';
import Image from "next/image";

import HeaderImage from "./headerImage.png";

import { db_2 } from "./firebase_realtime.js";
import { ref, onValue, set, update, remove , query, orderByChild, equalTo} from "firebase/database";
import { v4 as uuidv4 } from 'uuid';



const Home = ()=>{


  const count = useSelector((state) => state.value);
  const dispatch = useDispatch();



  const blur_image_link = "https://imgs.search.brave.com/HeoLn61NvDjdP6PXVEIX0AH9OtHSD5H_vIgdGxApXXM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1LzcwLzY5LzU1/LzM2MF9GXzU3MDY5/NTU4NF9Lc0hNQkw5/ZGE2VkVVbXBTY2VD/N2d3ejRzQWE4VTVp/NC5qcGc";

  const [products,setProducts] = useState([{
        product_name : "-----",
        product_price : "-----",
        product_detail : "-----" ,
        leading_image : blur_image_link,
        first_image : "-----",
        second_image : "-----",
        third_image : "-----",
        forth_image : "-----",
        quantity : 1,
        sizes : "S"
	},
	{
        product_name : "-----",
        product_price : "-----",
        product_detail : "-----" ,
        leading_image : blur_image_link,
        first_image : "-----",
        second_image : "-----",
        third_image : "-----",
        forth_image : "-----",
        quantity : 1,
        sizes : "S"
	},
	{
        product_name : "-----",
        product_price : "-----",
        product_detail : "-----" ,
        leading_image : blur_image_link,
        first_image : "-----",
        second_image : "-----",
        third_image : "-----",
        forth_image : "-----",
        quantity : 1,
        sizes : "S"
	},
	{
        product_name : "-----",
        product_price : "-----",
        product_detail : "-----" ,
        leading_image : blur_image_link,
        first_image : "-----",
        second_image : "-----",
        third_image : "-----",
        forth_image : "-----",
        quantity : 1,
        sizes : "S"
	}]);

  const [categories,setCategories] = useState([
		{category:"-----", categoryImage:blur_image_link },
		{category:"-----", categoryImage:blur_image_link },
	]);

  const [currentCategoryProducts,setCurrentCategoryProducts] = useState(products);


  var list = [];

  var tempList = [];

  var categoryList = [];


  useEffect(()=>{

		// DISPLAY ITEMS
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
				setCategories(
					Object.entries(map).map(([category, img]) => ({
					  category,
					  categoryImage: img,
					}))
				);
			},
			{ onlyOnce: true }
		);


		// (ADDITIONAL) DISPLAY ITEMS
		const q = query(
			ref(db_2, "messages"),
			orderByChild("category"),
			equalTo("T-shirts")
		);

		onValue(
			q,
			(snapshot) => {
				const data = snapshot.val();
				if (!data) {
					setCurrentCategoryProducts([]); 
					return;
				}

				// convert object → array {id, ...values}
				setCurrentCategoryProducts(
				Object.entries(data).map(([id, values]) => ({
				  id,
				  ...values,
				}))
				);
			},
			{ onlyOnce: true }
		);




  },[]);

  return (
    <div className="Home">
        <link href="https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"/>

      <link rel="stylesheet" href="path/to/font-awesome/css/font-awesome.min.css"/>
      <link href="https://fonts.googleapis.com/css2?family=Anton+SC&display=swap" rel="stylesheet"/>
      <div className="desktop_menu_item_selected_style_for_home_page">
        <div className="nevigation_btn_background_style_in_home_page h"> </div>
        <div className="nevigation_btn_background_style_in_home_page bg_white"></div>
        <div className="nevigation_btn_background_style_in_home_page bg_white"></div>
        <div className="nevigation_btn_background_style_in_home_page bg_white"></div>
        <div className="nevigation_btn_background_style_in_home_page bg_white o_s"></div>
      </div>

      <div className="landing_image_area">
        <Image src={HeaderImage} objectFit="cover"  placeholder="blur" className="landing_image"/>
        <div className="grey_shade_in_landing_image"></div>
        <div className="heading_text_and_btn_area">
          <h1 className="large_image">Comfort Zone</h1>
          <span className="intro_text">Comfort Zone is a brand targeting the youth to provide their desired outfits.</span>
          <Link href="/cart" as="/cart"  className="cart_btn_in_heading">Cart</Link>
        </div>
      </div>

      <h2 className="products_text">Latest products</h2>

      <div className="first_five_products_products_area">
        {products.filter((item, idx) => idx < 4).map((item,index) => {
          const image_path = item.leading_image;
          return (
            <Link href={`/products/${item.productId}`} key={index} className="first_five_products_product" >
	       {item.stock_status === "out" ? <div className="stock_status_text">out of stock</div> : <></>}
              <img src={image_path} className={item.stock_status === "out" ? "first_five_products_image stock_out" : "first_five_products_image"}/>

              <div className="first_five_products_product_name">{item.product_name} </div>
              <div className="first_five_products_price">৳ {item.product_price}</div>
            </Link>);
        })}
      </div>


      <h2 className="products_text">Catogery</h2>


      <div className="cover">
        {categories.map((item,index)=>{
          return (
              <Link key={index}  href={`/category/${item.category}`}  className="card">

                <img src={item.categoryImage} className="card_image"/>

                <div className="layer"></div>
                <p className="categoryName">{item.category}</p>
              </Link>
            );
        })}
      </div>


      <h2 className="products_text">{currentCategoryProducts[0].category}</h2>

      <div className="first_five_products_products_area">
        {currentCategoryProducts.filter((item, idx) => idx < 4).map((item,index) => {
          const image_path = item.leading_image;
          return (
            <Link href={`/products/${item.productId}`} key={index} className="first_five_products_product" >
              <img src={image_path} className="first_five_products_image"/>
              <div className="first_five_products_product_name">{item.product_name} </div>
              <div className="first_five_products_price">৳ {item.product_price}</div>
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

export default Home;





/*
style={{ backgroundImage: "url("+item.categoryImage+")",backgroundPosition :'center center',backgroundRepeat : 'no-repeat' }}

              <div style={{ backgroundImage: "url("+item.leading_image+")",backgroundPosition :'center center',backgroundRepeat : 'no-repeat'}}  className="first_five_products_image"></div>


*/
