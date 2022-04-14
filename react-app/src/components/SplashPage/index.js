import HeroFunc from "./hero";
import FooterFunc from "./footer";
import SpecialtyCards from "./specialtyCards";
import "./styles/SplashPage.css"

const SplashPage = () => {
    // added for heroku set-up

    return(
        <>
            <main>
                <HeroFunc />
                <SpecialtyCards />
            </main>
            <FooterFunc />
        </>
    )
}

export default SplashPage;
