import { NavLink } from "react-router-dom";


const HeroFunc = () => {
    return (
        <section className="section-hero">
            <div className="hero">
                <div className="hero-text">
                    <h1 className="heading-primary">Finally, a doctor dedicated to your <span>long-term health</span></h1>
                    <p className="hero-description">
                        Welcome to healthcare the way it should be. A doctor focused on preventing heart attacks and cancer, and not just treating your rash.
                    </p>
                    <NavLink className="btn btn--action" to="/sign-up">
                        Become a Member
                    </NavLink>

                </div>
                <div className="hero-img-box">
                    <img className="hero-image" src="https://images.unsplash.com/photo-1631815590058-860e4f83c1e8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjR8fGNsaW5pY3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60" alt="Doctor taking bloodpreasure" />
                    <img className="hero-image" src="https://images.unsplash.com/photo-1576671494903-8e2bb9327205?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTU4fHxjbGluaWN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60" alt="Doctor performing radiation treatment" />
                </div>
            </div>
        </section>
    )
}

export default HeroFunc;
