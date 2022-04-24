import { NavLink } from "react-router-dom";


const SpecialtyCards = () => {
    return (
        <section className="section-specialties">
            <div className="container center-text">
                <h2 className="heading-secondary specialty-heading">Doctor Specialties</h2>
                <p className="subheading">Included for All Members</p>
            </div>
            <div className="container grid grid--3--cols margin-bottom-md">
                <NavLink to="/doctors/Cancer" className="specialty-nav-link">
                    <div className="specialty">
                        <img src="https://images.unsplash.com/photo-1643224297379-54023dacf558?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHhyYXl8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60" className="specialty-image" alt="Doctor Specialty" />
                        <div className="specialty-content">
                            <p className="specialty-name">Cancer Care</p>
                            <p className="specialty-description">Screenings, lifestyle plans and ongoing help with treatment.</p>
                        </div>
                    </div>
                </NavLink>
                <NavLink to="/doctors/Weight" className="specialty-nav-link">
                    <div className="specialty">
                        <img src="https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c2FsbW9ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60" className="specialty-image" alt="Doctor Specialty" />
                        <div className="specialty-content">
                            <p className="specialty-name">Weight Loss</p>
                            <p className="specialty-description">Achieve weight goals with nutrition and exercise plans.</p>
                        </div>
                    </div>
                </NavLink>
                <NavLink to="/doctors/Heart" className="specialty-nav-link">
                    <div className="specialty">
                        <img src="https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bWVkaWNhbCUyMGRldmljZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60" className="specialty-image" alt="Doctor Specialty" />
                        <div className="specialty-content">
                            <p className="specialty-name">Heart Health</p>
                            <p className="specialty-description">Lower heart attack risk with a customized plan and monitoring.</p>
                        </div>
                    </div>
                </NavLink>
                <NavLink to="/doctors/Primary" className="specialty-nav-link">
                    <div className="specialty">
                        <img src="https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGNsaW5pY3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60" className="specialty-image" alt="Doctor Specialty" />
                        <div className="specialty-content">
                            <p className="specialty-name">Primary Care</p>
                            <p className="specialty-description">24x7 Care Team, prescription delivery, and rapid mini-visits.</p>
                        </div>
                    </div>
                </NavLink>
                <NavLink to="/doctors/COVID19" className="specialty-nav-link">
                    <div className="specialty">
                        <img src="https://images.unsplash.com/photo-1616587896649-79b16d8b173d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzB8fHZpZGVvJTIwY2FsbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60" className="specialty-image" alt="Doctor Specialty" />
                        <div className="specialty-content">
                            <p className="specialty-name">COVID-19 Care</p>
                            <p className="specialty-description">Testing, vaccines, and care all under one roof.</p>
                        </div>
                    </div>
                </NavLink>
                <NavLink to="/doctors/Stress" className="specialty-nav-link">
                    <div className="specialty">
                        <img src="https://images.unsplash.com/photo-1549576490-b0b4831ef60a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHlvZ2F8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60" className="specialty-image" alt="Doctor Specialty" />
                        <div className="specialty-content">
                            <p className="specialty-name">Stress & Anxiety</p>
                            <p className="specialty-description">Reduce anxiety, stress with doctor support and self-care tools.</p>
                        </div>
                    </div>
                </NavLink>
            </div>
        </section>
    )
}

export default SpecialtyCards;
