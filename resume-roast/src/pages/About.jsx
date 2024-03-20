import styles from './styles.module.css';
import Will from '../imgs/will.jpg';
import Danny from '../imgs/danny.jpg';
import Michelle from '../imgs/michelle.jpg';
import Kerim from '../imgs/kerim.jpg';
import TopBar from './TopBar';

export default function About() {
    return (
        <>
            <TopBar/>
            <h1>Meet The Resume Roast Team!</h1>
            <div className={styles.aboutContainer}>
                <div className={styles.infoCard}>
                    <img src={Will} alt="Picture of Will" className="aboutImg"/>
                    <h2>Will Garrison</h2>
                </div>

                <div className={styles.infoCard}>
                    <img src={Danny} alt="Picture of Danny" className="aboutImg"/>
                    <h2>Danny Nguyen</h2>
                    <p>Third Year in CS</p>
                    <p>Loves Tennis</p>
                </div>

                <div className={styles.infoCard}>
                    <img src={Michelle} alt="Picture of Michelle" className="aboutImg"/>
                    <h2>Michelle Nguyen</h2>
                    <p>4th year Computer Science major</p>
                    <p>Focus in Web and Mobile Application Development</p>
                </div>

                <div className={styles.infoCard}>
                    <img src={Kerim} alt="Picture of Kerim" className="aboutImg"/>
                    <h2>Kerim Semed</h2>
                    <p> Fifth Year in CS </p>
                    <p> Loves getting A's on group projects </p>
                </div>
            </div>
        </>
    )
}