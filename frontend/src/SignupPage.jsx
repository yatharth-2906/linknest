import styles from './Auth.module.css';
import { FcGoogle } from "react-icons/fc";
import { useContextUser } from "./CONTEXT_PROVIDERS/UserProvider";

function SignupPage(){
    const { user, backend_url } = useContextUser();

    if(user != null)
        window.location.href = "/";

    async function handleSignUpClick(){
        const name = document.getElementById('name').value;
        const email_id = document.getElementById('email_id').value;
        const password = document.getElementById('password').value;
        const checked_tc = document.getElementById('checked_tc').checked;

        if(!checked_tc)
            return alert("Please Check Our Terms & Conditions.");
    
        try{
            const response = await fetch(`${backend_url}/user/`,{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({name, email_id, password})
            });
        
            const data = await response.json();

            if (response.ok) {
                console.log(data);
                window.location.href = "/login";
            } else {
                alert(data['err']);
                console.log(data);
            }

        } catch (err) {
                console.error("Error Occurred:", err);
                alert("Something went wrong. Please try again.");
        }
    }

    return <>
        <div className={styles.login_body}>
            <div className={styles.login_main}>  
            <div className={styles.form_container}>
                <form id={styles.login_form}>
                    <h1 className={styles.form_heading}>Sign Up To CropHawk</h1>
                    <p className={styles.form_para}>Sign Up to join our community</p>

                    <br />
                    <div className={styles.inputt_container}>
                        <input className={styles.inputt} type="text" required= {true} placeholder="Name" name="name" id="name" />
                    </div>

                    <br />
                    <div className={styles.inputt_container}>
                        <input className={styles.inputt} type="email" required= {true} placeholder="Email ID" name="email_id" id="email_id" />
                    </div>
    
                    <br />
                    <div className={styles.inputt_container}>
                        <input className={styles.inputt} type="password" required= {true} placeholder="Password" name="password" id="password" />
                    </div>

                    <br />
                    <div className={styles.checkbox_container}>
                        <input type="checkbox" id="checked_tc" required= {true} />
                        <p className={styles.checkbox_para}>By Signing Up, you agree to our Terms & Conditions.</p>
                    </div>
                    
                    <br />
                    <button className={styles.sign_up_btn} type="button" onClick={handleSignUpClick}>Sign Up</button>
                    
                    <br />
                    <p className={styles.form_para_2}>Already a member? <a style={{color: "purple"}} href="/login">Login</a></p>
                </form>
            </div>

            <div className={styles.login_img}>
            </div>

            </div>
        </div>
        </>
}

export default SignupPage;