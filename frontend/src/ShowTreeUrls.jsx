import { useContextUser } from "./CONTEXT_PROVIDERS/UserProvider"
import { useState, useEffect } from "react"
import Cookies from "js-cookie"
import { useParams } from "react-router-dom"
import styles from "./Profile.module.css"
import ShowUrls from "./ShowUrls"
import EmptyComponent from "./EmptyComponent"

function ShowTreesUrls() {
    const { user, backend_url } = useContextUser();
    const [showAddUrlPopup, setShowAddUrlPopup] = useState(false);

    if (!user) {
        window.location.href = "/login";
    }

    const { tree_id } = useParams();

    const [urls, setUrls] = useState(null);
    const [loading, setLoading] = useState(true);

    async function handleShowUrls(token) {
        try {
            const response = await fetch(`${backend_url}/trees`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, tree_id }),
            });

            const data = await response.json();

            if (response.ok) {
                setUrls(data);
            } else {
                alert(data);
                console.log(data);
            }
        } catch (err) {
            console.error("Error Occurred:", err);
            alert("Something went wrong, please try again.");
        } finally {
            setLoading(false);
        }
    }

    async function handleDeleteClick(e, tree_id, url_name, url_path) {
        e.preventDefault();
        
        const token = Cookies.get("token");
        const task = "DELETE";

        try {
            const response = await fetch(`${backend_url}/`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, tree_id, url_name, url_path, task }),
            });

            const data = await response.json();

            if (response.ok) {
                window.location.reload();
            } else {
                alert(data);
                console.log(data);
            }
        } catch (err) {
            console.error("Error Occurred:", err);
            alert("Something went wrong, please try again.");
        }
    }

    async function handleAddUrl(e, tree_id) {
        e.preventDefault();

        const token = Cookies.get("token");
        const task = "ADD";
        const url_name = document.getElementById('url_name').value;
        const url_path = document.getElementById('url_path').value;

        try {
            const response = await fetch(`${backend_url}/`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, tree_id, url_name, url_path, task }),
            });

            const data = await response.json();

            if (response.ok) {
                window.location.reload();
            } else {
                alert(data);
                console.log(data);
            }
        } catch (err) {
            console.error("Error Occurred:", err);
            alert("Something went wrong, please try again.");
        }
    }

    useEffect(() => {
        const token = Cookies.get("token");
        if (token) {
            handleShowUrls(token);
        }
    }, [])

    return (
        <>
            <div className={styles.user_details_container}>
                {!loading && urls && <h3 className={styles.user_msg}>List of Url's in {urls.tree_name} LinkNest</h3>}
                {!loading && urls &&
                    (<div className={styles.tree_btn_container}>
                        <button className={`${styles.add_btn} ${styles.btn_transition}`} onClick={() => setShowAddUrlPopup(true)}>
                            Add Url
                        </button>
                        <button className={`${styles.add_btn} ${styles.btn_transition}`} onClick={() => window.location.href = `/nests/${tree_id}`}>
                            Show Nest
                        </button>
                    </div>
                    )}
            </div>
            {loading && (
                <div className={styles.spinner_container}>
                    <div className={styles.spinner}></div>
                </div>
            )}
            {!loading && urls && urls.urls.length != 0 && <ShowUrls urls={urls} handleDeleteClick={handleDeleteClick} />}
            {!loading && urls && urls.urls.length == 0 && <EmptyComponent />}

            {/* Add URL Popup */}
            {showAddUrlPopup && (
                <div className={styles.popup_overlay}>
                    <div className={styles.popup_container}>
                        <h3>Add New URL</h3>
                        <form className='bg_white' onSubmit={(e)=> {handleAddUrl(e, tree_id)}}>
                            <div className={styles.form_group}>
                                <label htmlFor="url_name">URL Name:</label>
                                <input
                                    type="text"
                                    id="url_name"
                                    name="url_name"
                                    placeholder="YouTube"
                                    required
                                />
                            </div>
                            <div className={styles.form_group}>
                                <label htmlFor="url_path">URL Path:</label>
                                <input
                                    type="url"
                                    id="url_path"
                                    name="url_path"
                                    placeholder="https://www.youtube.com"
                                    required
                                />
                            </div>
                            <div className={styles.popup_buttons}>
                                <button type="submit" className={styles.edit_btn}>
                                    Add URL
                                </button>
                                <button type="button" className={styles.cancel_btn} onClick={() => setShowAddUrlPopup(false)}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default ShowTreesUrls

