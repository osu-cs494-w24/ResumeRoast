import styles from './styles.module.css';

export default function About() {
    return (
        <>
            <h1>The Resume Roast Team</h1>
            <div className={styles.aboutContainer}>
                <div className={styles.infoCard}>
                    <h2>Will Garrison</h2>
                </div>

                <div className={styles.infoCard}>
                    <h2>Danny Nguyen</h2>
                </div>

                <div className={styles.infoCard}>
                    <h2>Michelle Nguyen</h2>
                    <p>4th year Computer Science major in Web and Mobile Application Development</p>
                </div>

                <div className={styles.infoCard}>
                    <h2>Kerim Semed</h2>
                </div>
            </div>
        </>
    )
}