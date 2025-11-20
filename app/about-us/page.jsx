import "./AboutUs.css";
import Link from "next/link";

const AboutUsScreen = ()=>{
	return (
		<div className="AboutUsScreen">
			<div className="desktop_menu_item_selected_style_for_about_us_page">
				<div className="nevigation_btn_background_style_in_about_us_page bg_white"> </div>
				<div className="nevigation_btn_background_style_in_about_us_page bg_white"></div>
				<div className="nevigation_btn_background_style_in_about_us_page bg_white"></div>
				<div className="nevigation_btn_background_style_in_about_us_page a_u"></div>
				<div className="nevigation_btn_background_style_in_about_us_page bg_white o_s"></div>
			</div>


			<div className="about_text">Comfort Zone is a brand targeting the youth to provide their desired outfits.</div>
			
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

export default AboutUsScreen;
