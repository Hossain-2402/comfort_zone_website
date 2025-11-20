'use client'

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {useState, useEffect} from "react";
import "./layout.css";
import Link from "next/link";
import {Provider} from "react-redux";
import store from "./store/store.js";

import Image from "next/image";
import cz_logo from "./logo_black.png"

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Home",
//   description: "This is the home page",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  const [position_of_the_menu_area_for_mobile,set_position_of_the_menu_area_for_mobile] = useState("-200vw"); 
  const [class_name_of_icon,set_class_name_of_icon] = useState("fa fa-bars");

  const showMenuAreaInMobile = ()=>{
    if(position_of_the_menu_area_for_mobile === "-200vw"){
      set_position_of_the_menu_area_for_mobile("0vw");
      set_class_name_of_icon("fa fa-times");
    }    
    else{
      set_position_of_the_menu_area_for_mobile("-200vw");
      set_class_name_of_icon("fa fa-bars");
    }
  }

  return (
    <html lang="en">
      
    <head><title>Comfort Zone</title></head>
      <body className={inter.className}>
      <Provider store={store}>
      <link rel="styleSheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"/>
      <link rel="stylesheet" href="path/to/font-awesome/css/font-awesome.min.css"/>
      <link href="https://fonts.googleapis.com/css2?family=Anton+SC&display=swap" rel="stylesheet"/>
      
      <div className="navigation_area">

        <div className="user_input_area">

          <Link href="/" as="/" className="logo"><Image alt="Loading" src={cz_logo} objectFit="cover"  placeholder="blur" className="logo_image" /></Link>

          <div className="search_bar_area">
{/*            <input type="text" placeholder="Enter the name of the book" className="search_bar"/>
Not necessery            <div className="search_btn">Search</div>
*/}
          </div>

          <div className="log_in_area">
            <div className="user_profile_image"><i className="fa fa-shopping-cart"></i></div>
            <Link href="/cart" as="/cart" className="cart_btn">Cart</Link>
          </div>
        {/*fa fa-bars*/}
          <div className="mobile_menu_btn" onClick={()=>{showMenuAreaInMobile()}}><i className={class_name_of_icon}></i></div>
        </div>

        {/* The nev_btn_area is designed for the desktop version of this website  */}

        <div className="nev_btn_area">
          <Link href="/" className="nev_btn">Home  </Link>
          <Link href="/products"  className="nev_btn">Products</Link>
          <Link href="/category"  className="nev_btn">Category</Link>
          <Link href="/about-us"  className="nev_btn">About us</Link>
          <Link href="/order-status"  className="nev_btn o_s">Order Status</Link>
        </div>
      </div>

      {/*<Link href="/cart" as="cart" className="cart_btn">Cart</Link>*/}

      <div style={{ left: position_of_the_menu_area_for_mobile }} className="mobile_menu_area">
        <div className="menu_btns_box">
          <Link href="/"  className="nev_btn_for_mobile h_home" onClick={()=>{ set_position_of_the_menu_area_for_mobile("-200vw"); set_class_name_of_icon("fa fa-bars"); }}><i className="fa fa-home"></i></Link>
          <Link href="/products" className="nev_btn_for_mobile p_products" onClick={()=>{ set_position_of_the_menu_area_for_mobile("-200vw"); set_class_name_of_icon("fa fa-bars");}}>Products</Link>
          <Link href="/category"  className="nev_btn_for_mobile c_category" onClick={()=>{ set_position_of_the_menu_area_for_mobile("-200vw"); set_class_name_of_icon("fa fa-bars");}}>Category</Link>
          <Link href="/about-us"  className="nev_btn_for_mobile a_aboutus" onClick={()=>{ set_position_of_the_menu_area_for_mobile("-200vw"); set_class_name_of_icon("fa fa-bars");}}>About us</Link>
          <Link href="/order-status"   className="nev_btn_for_mobile or_orderstatus" onClick={()=>{ set_position_of_the_menu_area_for_mobile("-200vw"); set_class_name_of_icon("fa fa-bars"); }}>Order Status</Link>
          <Link href="/cart"  className="nev_btn_for_mobile c_b" onClick={()=>{ set_position_of_the_menu_area_for_mobile("-200vw"); set_class_name_of_icon("fa fa-bars"); }}><i className="fa fa-shopping-cart" ></i></Link>
        </div>
      </div>

      {children}
      </Provider>
      </body>
    </html>
  );
}
