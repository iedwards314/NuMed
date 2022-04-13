import HeroFunc from "./hero";
import FooterFunc from "./footer";
import SpecialtyCards from "./specialtyCards";
import "./styles/SplashPage.css"

const SplashPage = () => {
    // added for heroku set-up

    return(
        <>
            <HeroFunc />
            <SpecialtyCards />
            <FooterFunc />
        </>
    )
}

export default SplashPage;
