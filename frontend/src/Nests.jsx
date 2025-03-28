import styles from './Profile.module.css';
import ShowTrees from './ShowTrees';
import EmptyComponent from './EmptyComponent';
import { useContextUser } from "./CONTEXT_PROVIDERS/UserProvider";
import { useState, useEffect } from 'react';
import Cookies from "js-cookie";

function Nests() {
    const { user, backend_url } = useContextUser();
    const [showCreateTreePopup, setShowCreateTreePopup] = useState(false);

    if (!user) {
        window.location.href = "/login";
    }

    const [trees, setTrees] = useState(null);
    const [loading, setLoading] = useState(true);

    async function handleShowTrees(token) {
        try {
            const response = await fetch(`${backend_url}?token=${token}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });

            const data = await response.json();

            if (response.ok) {
                setTrees(data);
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

    async function handleCreatetree() {
        const token = Cookies.get("token"); 
        const tree_name = document.getElementById('tree_name').value.trim();

        if (!tree_name) {
            alert("Please enter a tree name");
            treeNameInput.focus();
            return;
        }

        try {
            const response = await fetch(`${backend_url}/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, tree_name }),
            });
            
            if(response.ok)
                window.location.reload();
        } catch (err) {
            console.error("Error Occurred:", err);
            alert("Something went wrong, please try again.");
        }
    }

    async function handleDeleteTreeClick(tree_id) {
        const token = Cookies.get('token');

        try {
            const response = await fetch(`${backend_url}/trees`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, tree_id }),
            });

            const data = await response.json();
            console.log(data);
            window.location.reload();
        } catch (err) {
            console.error("Error Occurred:", err);
            alert("Something went wrong, please try again.");
        }
    }

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            handleShowTrees(token);
        }
    }, []);

    return (<>
        {!loading &&
            (
                <div className={styles.user_details_container}>
                    <h2 className={styles.user_msg}>Check out your LinkNest's:</h2>
                    <div className={styles.tree_btn_container}>
                        <button className={`${styles.add_btn} ${styles.btn_transition}`} onClick={() => setShowCreateTreePopup(true)}>
                            Create Nest
                        </button>
                    </div>
                </div>
            )
        }

        {loading && <div className={styles.spinner_container}> <div className={styles.spinner}></div> </div>}


        {!loading && trees && trees.length != 0 && <ShowTrees trees={trees} handleDeleteTreeClick={handleDeleteTreeClick} />}
        {!loading && trees && trees.length == 0 && <EmptyComponent />}

        {showCreateTreePopup && (
            <div className={styles.popup_overlay}>
                <div className={styles.popup_container}>
                    <h3>Create New LinkNest</h3>
                    <form className='bg_white' onSubmit={handleCreatetree}>
                        <div className={styles.form_group}>
                            <label htmlFor="url_name">Nest Name:</label>
                            <input
                                type="text"
                                id="tree_name"
                                name="tree_name"
                                required
                            />
                        </div>
                        <div className={styles.popup_buttons}>
                            <button type="submit" className={styles.add_btn}>
                                Create Nest
                            </button>
                            <button type="button" className={styles.cancel_btn} onClick={() => setShowCreateTreePopup(false)}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )}
    </>);
}

export default Nests;