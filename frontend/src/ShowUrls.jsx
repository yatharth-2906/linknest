import styles from './Profile.module.css';
import { Link } from 'react-router-dom';

function ShowTrees(props) {
    return (<>
        <div className={styles.table_container}>
            <br />
            <table className={styles.tree_table}>
                <thead>
                    <tr>
                        <th>Serial No.</th>
                        <th>URL Name</th>
                        <th>URL PATH</th>
                        <th>Delete URL</th>
                    </tr>
                </thead>
                <tbody>
                    {props.urls.urls.map((url, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                                <Link className='links bg_white' to={url.url_path} target="_blank" rel="noopener noreferrer">{url.url_name}</Link>
                            </td>
                            <td>{url.url_path}</td>
                            <td><button className={`${styles.delete_btn} ${styles.btn_transition}`} onClick={() => props.handleDeleteClick(url.tree_id, url.url_name, url.url_path)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    );
}

export default ShowTrees;
