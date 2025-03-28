import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./LinkTree.module.css";
import NotFoundpage from "./NotFoundPage";
import { useContextUser } from "./CONTEXT_PROVIDERS/UserProvider";


function ShowLinkTree() {
    const { backend_url } = useContextUser();
    const { tree_id } = useParams();
    const [urls, setUrls] = useState(null);
    const [loading, setLoading] = useState(true);

    async function handleShowUrls() {
        try {
            const response = await fetch(`${backend_url}/trees`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ tree_id }),
            });

            const data = await response.json();

            if (response.ok) {
                setUrls(data);
            }
        } catch (err) {
            console.error("Error Occurred:", err);
            window.location.href = "/";
            alert("Something went wrong, please try again.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        handleShowUrls();
    }, []);

    if(!loading && !urls)
        return <NotFoundpage />;

    return (
        <div className={styles.container}>
            {loading && (
                <div className={styles.spinner_container}>
                    <div className={styles.spinner}></div>
                </div>
            )}

            {!loading && urls &&
                <div className={styles.urls_details}>
                    <img className={styles.linktree_image} src='/linknest_logo.jpg' />
                    <div className={styles.heading}>LinkNest</div>
                    <div className={styles.link_list}>
                        {urls['urls'].map((item, index) => (
                            <a
                                key={index}
                                href={item.url_path}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.link_button}
                            >
                                {item.url_name}
                            </a>
                        ))}
                    </div>
                    <div className={styles.user_name}>Created By: {urls.user_name}</div>
                </div>
            }
        </div>
    );
}

export default ShowLinkTree;
