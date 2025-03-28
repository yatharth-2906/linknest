import { FaHome } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaDatabase } from "react-icons/fa";
import { MdOutlineInsights } from "react-icons/md";
import { GiFarmer } from "react-icons/gi";
import { useContextUser } from "./CONTEXT_PROVIDERS/UserProvider";

function HomePage(){
    const { user, handleLogout } = useContextUser();

    return <>
    <main>
        <section className="brand_desc">
            <div className="brand_desc_heading">
                <h1 id="brand_heead">Create multiple Link Nests  for every aspect of your life personal, professional or creative.</h1>
            </div>

            <div className="brand_para">
                <div className="brand_para1">In today’s digital world, managing multiple links can be overwhelming. Whether you’re a creator, entrepreneur, or just love sharing, our platform organizes all your important links in one place. Create multiple Link Nests to tailor your presence for every audience and purpose.</div>

                <br />
                <div className="brand_para2">
                    <a className="learn_more_btn btn_transition" href="#rev">Learn More</a>
                    {!user ? <Link className="sign_up_btn btn_transition" to="/login">Login</Link> : <button className="delete_btn btn_transition" onClick={handleLogout}>Sign Out</button> }
                </div>
            </div>
        </section>

        <br /><br /><br /><br />

        <section className="soil_health" id="soil_health">
            <div className="soil_health_text">
                <div className="soil_health_heading">
                    <h2>Streamline Your Online Presence with Link Management</h2>
                </div>

                <div className="soil_health_para">
                    At LinkNest we help you to organize and share your links effortlessly. Our platform helps users to create multiple Link Nest, offering a smarter way to connect with your audience and grow your digital footprint.
                </div>

                <br />

                <div>
                    <ul className="soil_health_list">
                        <li> <FaDatabase className="icons_list"/> 
                        Smart Link Organization</li> 
                        <li> <GiFarmer className="icons_list"/>
                        Tailored for Every Purpose</li>
                        <li> <MdOutlineInsights className="icons_list" />
                        Seamless Sharing, Anytime, Anywhere</li>
                    </ul>
                </div>
            </div>
            
            <div className="soil_health_img_container">
                <img className="soil_health_img" src="/body_img_1.jpg" alt="Soil health Image" />
            </div>
        </section>

        <br /><br /><br /><br />

        <section className="soil_health">
            <div className="soil_health_text">
                <div className="soil_health_heading">
                    <h2>Seamless Sharing Across Platforms</h2>
                </div>

                <div className="soil_health_para">
                    Share your LinkNest  anywhere—social media, emails, or websites. With a single link, you can direct your audience to all your important content, making it easier than ever to grow your online presence.
                </div>

                <br />

                <div className="soil_health_para_btn">
                    <a className="learn_more_btn_contrast btn_transition" href="#rev">Learn More</a>
                    <Link className="learn_more_btn btn_transition" to="/nests">Try it Out</Link>
                </div>
            </div>
            
            <div className="soil_health_img_container">
                <img className="soil_health_img" src="/body_img_2.png" alt="Soil health Image" />
            </div>
        </section>

        <br /><br /><br /><br />

        <section className="rev" id="rev">
            <div>
                <h1 className="rev_heading">Transforming Link Management with Smart Technology</h1>
            </div>

            <p className="rev_para">
                LinkNest is a powerful, user-friendly platform designed to simplify link sharing. Create multiple Link Nest, customize them to fit your brand, and share them effortlessly across all your digital channels.
            </p>
        </section>

        <br /><br /><br /><br />

        <section className="services">
                <div className="services_element">
                    <img className="services_img" src="/box_3d.svg" alt="" />

                    <div className="services_head">Boost Visibility</div>

                    <div className="services_para">
                        Our platform uses advanced tools to help you organize and share your links seamlessly for both personal use or business projects.
                    </div>
                </div>

                <br /><br />

                <div className="services_element">
                    <img className=" services_img" src="/box_3d.svg" alt="" />

                    <div className="services_head">Simplifying Connections</div>

                    <div className="services_para">
                        With LinkNest, you can centralize all your important links in one place, also you can share them to grow your engagement.
                    </div>
                </div>

                <br /><br />

                <div className="services_element">
                    <img className=" services_img" src="/box_3d.svg" alt="" />

                    <div className="services_head">Effortless Sharing</div>

                    <div className="services_para">
                        Our one-link feature directs your target audience to all your content, making it simpler than ever to connect and engage.
                    </div>
                </div>
        </section>

        <br /><br /><br /><br />

        <section className="form_section" id="form_section">
            <h1 className="form_heading">Contact Us</h1>
            <p className="form_para">Feel free to reach out to us at LinkNest! Our dedicated team is here to assist you. <br /> Whether you have questions, feedback, or inquiries, we're eager to hear from you.</p>

            <br /><br />
            <div className="form_div">
                <div className="details">
                    <div className="details-item">
                        <div className="details-icon">
                        <i><FaHome /></i>
                        </div>
                        
                        <div className="details-content">
                          <h4 className="form_detail_heading">Address</h4>
                          <p className="form_para">4671 Sugar Camp Road,<br/> Owatonna, Minnesota, <br/>55060</p>
                        </div>
                      </div>

                      <div className="details-item">
                        <div className="details-icon">
                        <i><FaPhone /></i>
                        </div>
                        
                        <div className="details-content">
                          <h4 className="form_detail_heading">Phone</h4>
                          <p className="form_para">+91 XX XXXX XXXX</p>
                        </div>
                      </div>

                      <div className="details-item">
                        <div className="details-icon">
                        <i><MdEmail /></i>
                        </div>
                        
                        <div className="details-content">
                          <h4 className="form_detail_heading">Email</h4>
                          <p className="form_para">linktrassist@gmail.com</p>
                        </div>
                      </div>
                </div>

                <form action="https://api.web3forms.com/submit" method="POST" id="contact-form">
                    <input type="hidden" name="access_key" value="7a472bdd-13cd-46ad-9d27-defa5ba4f0e8" />

                    <h2 className="form_heading">Send Message</h2>

                    <div className="inputt_container">
                        <input className="inputt" type="text" required= {true} placeholder="Name" name="name" />
                    </div>
                    <div className="inputt_container">
                        <input className="inputt" type="email" required= {true} placeholder="Email" name="email" />
                    </div>
                    <div className="form-textarea-container">
                        <textarea id="form-textarea" placeholder="Your Message" name="message"></textarea>
                    </div>
                    
                    <br />
                    <button className="submit_btn btn_transition" type="submit">Submit</button>
                  </form>
            </div>
        </section>
    </main>
    </>
}

export default HomePage;