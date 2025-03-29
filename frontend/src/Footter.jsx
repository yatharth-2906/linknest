import { Link } from "react-router-dom";

function Footter(){
    const date = new Date();

    return <>
    <br /><br /><br /><br />
    <div id="footer">
        <div className="footer_div">
            <div className="footer_actions">
                <a href="/#brand_heead">About Us</a>
                <a href="/#soil_health">Services</a>
                <a href="/#rev">Solutions</a>
                <a href="/#form_section">Contact Us</a>
            </div>
        </div>

        <br />

        <div className="footer_line_container">
            <hr className="footer_line" />
        </div> 
        
        <br />

        <div className="footer_rem">
            <div className="copyright">© {date.getFullYear()} LinkNest. All rights reserved.</div>
            <div className="policies">
                <Link to="https://github.com/yatharth-2906/linknest" target="_blank" rel="noopener noreferrer">Made with ❤️ by Yatharth</Link>
            </div>
        </div>
    </div>
    </>
}

export default Footter;