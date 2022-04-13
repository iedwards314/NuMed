
const FooterFunc = () => {

    return(
        <footer className="footer">
            <div className="container grid grid--center--v grid--2--cols">
                <div className="author-info-column">
                    <h3 className="author-name">Author: Ian Edwards</h3>
                    <ul className="social-links">
                        <li>
                            <a className="footer-link" href="https://github.com/iedwards314/">
                                <ion-icon className="logo-github" name="logo-github"></ion-icon>
                            </a>
                        </li>
                        <li>
                            <a className="footer-link" href="https://www.linkedin.com/in/edwards-ian/">
                                <ion-icon className="logo-linkedIn" name="logo-linkedin"></ion-icon>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="technology-info">
                    <ul className="technology-list">
                        <li className="footer-link">Python</li>
                        <li className="footer-link">Javascript</li>
                        <li className="footer-link">HTML</li>
                        <li className="footer-link">CSS</li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default FooterFunc;
