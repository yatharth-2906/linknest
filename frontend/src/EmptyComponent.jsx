import styles from './Profile.module.css';

function EmptyComponent(props){
    const item = props.item || "Content";
    return (
        <>
            <div className={styles.empty_container}>
                <h2 className={styles.empty_heading}>No {item} to show here.</h2>
            </div>
        </>
    );
}

export default EmptyComponent;