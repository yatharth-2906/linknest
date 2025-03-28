import styles from './Auth.module.css';
import Cookies from "js-cookie";
import { useContextUser } from "./CONTEXT_PROVIDERS/UserProvider";

function LoginPage(){
    const { user, backend_url } = useContextUser();

    if(user != null)
        window.location.href = "/";

    async function handleLoginClick(){
        const email_id = document.getElementById('email_id').value;
        const password = document.getElementById('password').value;

        try{
            const response = await fetch(`${backend_url}/user/login`,{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({email_id, password})
            });
    
            const data = await response.json();

            if (response.ok) {
                const token = data['token'];
                Cookies.set("token", token, { expires: 7, secure: true });
                window.location.href = "/";
            } else {
                alert(data['err']);
                console.log(data);
            }
        } catch (err) {
            console.error("Error Occurred:", err);
            alert("Something went wrong, please try again.");
        }
    }

    return <>
    <div className={styles.login_body}>
        <div className={styles.login_main}>
        <div className={styles.login_img}>
        </div>  
        <div className={styles.form_container}>
            <form id={styles.login_form}>
                <h1 className={styles.form_heading}>Welcome Back</h1>
                <p className={styles.form_para}>Enter Your Credentials To Login</p>

                <br /><br />
                <div className={styles.inputt_container}>
                    <input className={styles.inputt} type="email" required= {true} placeholder="Email ID" name="email_id" id="email_id" />
                </div>

                <br />
                <div className={styles.inputt_container}>
                    <input className={styles.inputt} type="password" required= {true} placeholder="Password" name="password" id="password" />
                </div>
                
                <br />
                <button className={styles.sign_up_btn} onClick={handleLoginClick} type="button">Login</button>

                <br /><br />
                <p className={styles.form_para_2}>Don't you have an account? <a style={{color: "purple"}} href="/sign_up">Sign Up</a></p>
            </form>
        </div>
        </div>
    </div>
    </>
}

export default LoginPage;