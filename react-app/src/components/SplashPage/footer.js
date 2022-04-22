import { NavLink } from "react-router-dom";
import logo from "../../logos/NuMed-Logo-blue.png"


const FooterFunc = () => {

    return(
        <footer className="footer">
            <div className="container grid grid--center--v grid--2--cols">
                <div className="author-info-column">
                    <NavLink to="/">
                        <img className="logo" alt="NuMed logo" src={logo} />
                    </NavLink>
                    <h3 className="author-name">Creator: Ian Edwards</h3>
                    <ul className="social-links">
                        <li>

                        </li>
                        <li>
                            <a className="footer-link logo-github" href="https://github.com/iedwards314/">
                                <ion-icon name="logo-github"></ion-icon>Github
                            </a>
                        </li>
                        <li>
                            <a className="footer-link logo-linkedIn" href="https://www.linkedin.com/in/edwards-ian/">
                                <ion-icon name="logo-linkedin"></ion-icon>LinkedIn
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="technology-info">
                    <ul className="technology-list">
                        <li className="footer-link"><ion-icon name="logo-python"></ion-icon> Python</li>
                        <li className="footer-link"><ion-icon name="logo-javascript"></ion-icon>Javascript</li>
                        <li className="footer-link"><ion-icon name="logo-react"></ion-icon>React</li>
                        <li className="footer-link"><ion-icon name="logo-html5"></ion-icon>HTML</li>
                        <li className="footer-link"><ion-icon name="logo-css3"></ion-icon>CSS</li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default FooterFunc;
