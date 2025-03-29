import styles from './Profile.module.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useContextUser } from "./CONTEXT_PROVIDERS/UserProvider";

function ShowTrees(props) {
    const { backend_url } = useContextUser();
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [newTreeName, setNewTreeName] = useState("");
    const [selectedTree, setSelectedTree] = useState(null); 

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const hours = date.getHours() % 12 || 12;
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
        return `${day}-${month}-${year} ${hours}:${minutes} ${ampm}`;
    };

    const handleEditTreeClick = (e, tree_id) => {
        e.preventDefault();

        setSelectedTree(tree_id); 
        setShowEditPopup(true); 
    };

    const handleUpdateNestName = async () => {
        if (!selectedTree) 
            return;
        
        const token = Cookies.get('token');

        try {
            const response = await fetch(`${backend_url}/`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    token: token,
                    tree_id: selectedTree, 
                    new_tree_name: newTreeName,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                window.location.reload();
                setShowEditPopup(false); 
            } else {
                alert(data.message || "Failed to update nest name.");
            }
        } catch (err) {
            console.error("Error updating nest name:", err);
            alert("Something went wrong, please try again.");
        } finally{
            setSelectedTree(null);
            setShowEditPopup(false); 
        }
    };

    return (
        <>
            <div className={styles.table_container}>
                <table className={styles.tree_table}>
                    <thead>
                        <tr>
                            <th>Serial No.</th>
                            <th>Nest Name</th>
                            <th>Edit Nest</th>
                            <th>Delete Nest</th>
                            <th className={styles.hide_on_small}>Last Updated</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.trees.map((tree, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                    <Link className='links bg_white' to={`/profile/${tree.tree_id}`}>{tree.tree_name}</Link>
                                </td>
                                <td>
                                    <button 
                                        className={`${styles.edit_btn} ${styles.btn_transition}`} 
                                        onClick={(e) => handleEditTreeClick(e, tree.tree_id)}
                                    >
                                        Edit
                                    </button>
                                </td>
                                <td>
                                    <button 
                                        className={`${styles.delete_btn} ${styles.btn_transition}`} 
                                        onClick={(e) => props.handleDeleteTreeClick(e, tree.tree_id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                                <td className={styles.hide_on_small}>{formatDate(tree.last_updated)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Edit Nest Name Popup */}
            {showEditPopup && (
                <div className={styles.popup_overlay}>
                    <div className={styles.popup_container}>
                        <h3>Edit Nest Name</h3>
                        <form className='bg_white'
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleUpdateNestName();
                            }}
                        >
                            <div className={`${styles.form_group} bg_white`}>
                                <label htmlFor="new_tree_name">New Nest Name:</label>
                                <input
                                    type="text"
                                    id="new_tree_name"
                                    name="new_tree_name"
                                    value={newTreeName}
                                    onChange={(e) => setNewTreeName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className={styles.popup_buttons}>
                                <button type="submit" className={styles.edit_btn}>
                                    Update Name
                                </button>
                                <button 
                                    type="button" 
                                    className={styles.cancel_btn} 
                                    onClick={() => setShowEditPopup(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default ShowTrees;