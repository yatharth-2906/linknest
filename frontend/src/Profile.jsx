import styles from './User.module.css';
import { useContextUser } from "./CONTEXT_PROVIDERS/UserProvider";
import { useEffect, useState } from 'react';
import Cookies from "js-cookie";

function Profile() {
    const { user, setUser, backend_url } = useContextUser();
    const [file, setFile] = useState(null);

    const token = Cookies.get("token");

    if (!user) {
        window.location.href = "/login";
    }

    async function handleUploadProfilePhoto() {
        document.getElementById("profile_photo").click();
    }

    async function handleRemoveProfilePhoto() {
        setFile(null);
        document.getElementById("user_profile_img").src = '/default_user_image.jpg';

        try {
            const response = await fetch(`${backend_url}/user/update_photo`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token })
            });

            const data = await response.json();

            if (response.ok) {
                const user = JSON.parse(localStorage.getItem("user")) || {};
                user.profile_photo_path = 'default_user_image.png';
                localStorage.setItem("user", JSON.stringify(user));
                setUser(JSON.parse(localStorage.getItem("user")));
                window.location.reload();
            } else {
                alert(data['msg']);
                console.log(data);
            }

        } catch (err) {
            console.error("Error Occurred:", err);
            alert("Something went wrong. Please try again.");
        }
    }

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile) {
            setFile(selectedFile);
            const imageUrl = URL.createObjectURL(selectedFile);
            document.getElementById("user_profile_img").src = imageUrl;
        }
    };

    async function handleSubmitForm(e) {
        e.preventDefault();

        if (!file) {
            alert("No File attached!!");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("file", file);

            const response = await fetch(`${backend_url}/user/update_photo`, {
                method: "POST",
                headers: { "token": token },
                body: formData
            });

            const data = await response.json();

            if (response.ok) {
                const user = JSON.parse(localStorage.getItem("user")) || {};
                user.profile_photo_path = data.fileName;
                localStorage.setItem("user", JSON.stringify(user));
                setUser(JSON.parse(localStorage.getItem("user")));
                window.location.reload();
            } else {
                alert(data['err']);
                console.log(data);
            }

        } catch (err) {
            console.error("Error Occurred:", err);
            alert("Something went wrong. Please try again.");
        }
    };

    async function handleUpdateDetails() {
        const name = document.getElementById('user_name').value;
        const email_id = document.getElementById('user_email_id').value;
        const phone_number = document.getElementById('user_phone_number').value;
        const gender = document.getElementById('user_gender').value;
        const designation = document.getElementById('user_designation').value;
        const country = document.getElementById('user_country').value;

        try {
            const response = await fetch(`${backend_url}/user/`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, name, email_id, phone_number, gender, designation, country })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("user", JSON.stringify(data.user));
                setUser(JSON.parse(localStorage.getItem("user")));
                window.location.reload();
            } else {
                alert(data['err']);
                console.log(data);
            }

        } catch (err) {
            console.error("Error Occurred:", err);
            alert("Something went wrong. Please try again.");
        }
    }

    async function handleGetUserDetails() {
        try{
            const response = await fetch(`${backend_url}/user/update_photo?token=${token}`);

            const data = await response.json();

            if(response.ok){
                localStorage.setItem("user", JSON.stringify(data.user));
                setUser(JSON.parse(localStorage.getItem("user")));
            }
        } catch (err) {
            console.error("Error Occurred:", err);
            alert("Something went wrong. Please try again.");
        }
    }

    useEffect(() => {
        handleGetUserDetails();
    }, [])

    return (
        <>
            <form className={styles.photo_upload_form} onSubmit={handleSubmitForm} encType="multipart/form-data">
                <div className={styles.photo_upload_container}>
                    <div className={styles.photo_edit_container}>
                        <img
                            id='user_profile_img'
                            className={styles.user_profile_image}
                            src={`${backend_url}/user?photo_name=${user.profile_photo}` || 'default_user_image.png'}
                            alt="profile_photo"
                            onClick={handleUploadProfilePhoto}
                            onError={(e) => {
                                e.target.onerror = null;
                            }}
                        />

                        <div className={styles.user_name_email_container}>
                            <h2 className={styles.user_name}>{user.name}</h2>
                            <h4 className={styles.user_email}>{user.email_id}</h4>
                        </div>
                    </div>

                    <div className={styles.photo_edit_button_container}>
                        <input
                            className={styles.profile_photo_file_input}
                            id="profile_photo"
                            name="profile_photo"
                            type="file"
                            onChange={handleFileChange}
                            accept="image/*"
                        />
                        <button
                            className={`${styles.remove_user_profile_photo} ${styles.btn_transition}`}
                            type="button"
                            onClick={handleRemoveProfilePhoto}
                        >
                            Remove Photo
                        </button>

                        <button
                            className={`${styles.photo_submit_form_btn} ${styles.btn_transition}`}
                            type="submit"
                        >
                            Update Photo
                        </button>
                    </div>
                </div>
            </form>


            <div className={styles.photo_upload_form}>
                <div className={styles.user_details_input_container}>
                    <div className={styles.user_details_container}>
                        <input className={styles.user_details_input} type="text" name="user_name" id="user_name" placeholder='Name' defaultValue={user.name} />
                        <input className={styles.user_details_input} style={{ color: "grey", border: "2px solid black" }} type="email" name="user_email_id" id="user_email_id" placeholder='Email Id' value={user.email_id} disabled />
                    </div>

                    <div className={styles.user_details_container}>
                        <input className={styles.user_details_input} type="text" name="user_phone_number" id="user_phone_number" placeholder='Ph. Number' defaultValue={user.phone_number} />
                        <input className={styles.user_details_input} type="text" name="user_gender" id="user_gender" placeholder='Gender' defaultValue={user.gender} />
                    </div>

                    <div className={styles.user_details_container}>
                        <input className={styles.user_details_input} type="text" name="user_designation" id="user_designation" placeholder='Designation' defaultValue={user.designation} />
                        <input className={styles.user_details_input} type="text" name="user_country" id="user_country" placeholder='Country' defaultValue={user.country} />
                    </div>
                </div>

                <button className={`${styles.file_submit_form_btn} ${styles.btn_transition}`} type="button" onClick={handleUpdateDetails}>Update Details</button>
            </div>
        </>
    );
}

export default Profile;
