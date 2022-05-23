
const HeaderFunc = ({user}) => {

    return (
        <>
            <section className="section-profile-header">
                <div className="container center-text">
                    <h1 className="heading-secondary profile-heading">Welcome {`${user?.first_name} ${user?.last_name}`} to Your Healthcare Hub!</h1>
                </div>
            </section>
        </>
    )
}

export default HeaderFunc;
