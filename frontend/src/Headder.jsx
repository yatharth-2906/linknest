import { Link } from "react-router-dom";
import { useContextUser } from "./CONTEXT_PROVIDERS/UserProvider";

function Headder() {
    const { user } = useContextUser();

    return (
        <>
            <nav className="nav_bar">
                <div className="nav_btn_container">
                    <button className="dropbtn">≡</button>
                    <div className="dropdown-content">
                        <Link to="/profile" className="dropdown-content-a">Profile</Link>
                        <Link to="/nests" className="dropdown-content-a">Nests</Link>
                    </div>
                </div>

                <div className="nav-content">
                    <Link to="/"><h1 className="logo_text">LinkNest</h1></Link>
                    <Link to="/profile"><h2 className="logo_text2">Profile</h2></Link>
                    <Link to="/nests"><h2 className="logo_text2">Nests</h2></Link>
                </div>

                <div className="logo_img_container">
                    <Link to="/"><h1 className="logo_text">CropHawk</h1></Link>
                </div>

                <div className="sign_up_btn_container">
                    {!user ? <Link className="sign_up_btn btn_transition" to="/login">Login</Link> : <p className="user_name">Hi, {user['name']}</p>}
                </div>
            </nav>
            
            <br /><br /><br /><br />
        </>
    );
}

export default Headder;
