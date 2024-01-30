const container = document.getElementById('main-container')
const root = ReactDOM.createRoot(container)

const { useState } = React

const SignupForm = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [country, setCountry] = useState('')
    const [gender, setGender] = useState('')
    const [birthdate, setBirthdate] = useState('')
    const [termsChecked, setTermsChecked] = useState(false)
    const [mailingChecked, setMailingChecked] = useState(false)
    const [needSignUp, setNeedSignUp] = useState(false)

    const validateEmail = () => {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)
    }
    const styleEmail = () => {
        return validateEmail() ? 'valid' : 'invalid'
    }

    const validatePassword = () => {
        if (password.length > 5 && password === password2) {
            return false
        }
        return bonusPassword()
    }

    const bonusPassword = () => {
        if (password.length === 0) {
            return ''
        } else if (/^(?=.*\d)(?=.*[!@#$%^&*]).{11,}$/.test(password)) {
            return 'strong';
        } else if (/^(?=.*\d).{5,10}$/.test(password)) {
            return 'medium';
        } else {
            return 'weak';
        }
    }

    const validateBirthdate = () => {
        const [bdayYear, bdayMonth, bdayDay] = birthdate.split("-").map(Number);

        let todayDate = new Date()
        let todayYear = todayDate.getFullYear()
        let todayMonth = todayDate.getMonth()
        let todayDay = todayDate.getDay()

        let age = todayYear - bdayYear

        if (todayMonth < bdayMonth || (todayMonth === bdayMonth && todayDay < bdayDay)) {
            age--;
        }

        return age >= 18;

    }

    const validateForm = (e) => {
        e.preventDefault()
        if (validateEmail() && validatePassword() && validateBirthdate() && termsChecked) {
            alert('You are IN')
        } else {
            if (!validateBirthdate()) {
                alert('You must be 18 or older to access.')
            } if (!termsChecked) {
                alert('You must accept the Terms and Conditions')
            } else {
                alert('Wrong email or password')
            }

        }
    }

    function handleChangeCountry(e) {
        setCountry(e.target.value)
    }

    function countriesList(countries) {
        return (
            countries.map((country, index) => {
                return <option value={country.code} key={index}>{country.name}</option>
            })
        )

    }

    const onOptionChangeGender = e => {
        setGender(e.target.value)
    }

    const handleNeedSignUpChange = (e) => {
        //le metemos un ".preventDefault" para que al pulsar no resetee al valor original ("false")
        e.preventDefault()
        //si la variable "needSignUp" es "false", la pasamos a "true"
        if (needSignUp === false) {
            setNeedSignUp(true)
            //y lo contrario aquí:
        } else {
            setNeedSignUp(false)
        }
    }

    //Esta función cambiará la clase del div que contiene el resto del formulario (la parte del "signup-form") en función del valor de "needSignUp":
    const showHideSignupForm = () => {
        return needSignUp === true ? "signup-form" : "hide"
    }
    const showHideLoginForm = () => {
        return needSignUp === false ? "signup-form" : "hide"
    }


    //esta función mostrará u ocultará el botón de "Log In" y el mensaje de "Don´t you have an account?" en función del valor de "needSignUp"
    const showHideLoginSignupMessage = () => {
        return needSignUp === true ? "hide" : ""
    }

    //Por último, creamos la función para manejar el "click" del botón "Log In":
    const handleLoginButtonClick = (e) => {
        e.preventDefault()
        console.log("Log In button clicked!")
        if (validateEmail() && validatePassword()) {
            return alert("You are IN!")
        } else {
            return alert("Invalid Email or Password!")
        }
    }


    return (
        <form>

            <h1 className={showHideLoginForm()}>Hello Again! </h1>
            <h1 className={showHideSignupForm()}>Create Account</h1>

            <label>Insert your email:</label>
            <input type="email" className={styleEmail()} id="box" value={email} onChange={(e) => setEmail(e.target.value)} />

            <label>Insert your password:</label>
            <input type="password"
                value={password}
                id="box"
                className={bonusPassword()}
                onChange={(e) => setPassword(e.target.value)} />
            <div className={showHideSignupForm()}>
                <p className={bonusPassword() === 'weak' ? 'weak' : 'hide'}>Your password security is weak.</p>
                <p className={bonusPassword() === 'medium' ? 'medium' : 'hide'}>Your password security is medium.</p>
                <p className={bonusPassword() === 'strong' ? 'strong' : 'hide'}>Your password security is strong</p>
            </div>


            <button type="submit" className={showHideLoginSignupMessage()} onClick={handleLoginButtonClick}> Log In </button>
            {/* y añadimos el mensaje de "Don´t you have an account?" como un enlace ("<a> </a>") */}
            <a href="" className={showHideLoginSignupMessage()} onClick={handleNeedSignUpChange}> Don't you have an account? </a>


            {/* Bonus 1: alternar entre Login o  Signup: */}
            {/* este div, que contiene el resto del formulario (la parte del "Sign Up") se mostrará u ocultará en función del valor de la variable "needSignUp" */}
            <div className={showHideSignupForm()}>

                <label>Confirm your password: </label>
                <input type="password"
                    id="box"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)} />

                <label>Select your country:</label>
                <select value={country} id="box" onChange={handleChangeCountry}>
                    {countriesList(countries)}
                </select>

                <label>Insert your birthdate: </label>
                <input type="date" value={birthdate} id="box" onChange={(e) => setBirthdate(e.target.value)} />
                <br />
                               
                <label>Select your gender:</label>
                <div className="gender-select">
                <label className="gender-select">
                    Male
                    <input
                        type="radio"
                        name="gender"
                        value="Male"
                        checked={gender === "Male"}
                        onChange={onOptionChangeGender}
                    />
                </label>

                <label className="gender-select">
                    Female
                    <input
                        type="radio"
                        name="gender"
                        value="Female"
                        checked={gender === "Female"}
                        onChange={onOptionChangeGender}
                    />
                </label>

                <label className="gender-select">
                    Undisclosed
                    <input
                        type="radio"
                        name="gender"
                        value="Undisclosed"
                        checked={gender === "Undisclosed"}
                        onChange={onOptionChangeGender}
                    />
                </label>
                </div>
                
                <br />
                <label>
                    <input type="checkbox" checked={termsChecked} onChange={(e) => setTermsChecked(e.target.checked)} />
                    Agree to terms and conditions:
                </label>
                <label>
                    <input type="checkbox" checked={mailingChecked} onChange={(e) => setMailingChecked(e.target.checked)} />
                    Agree to join our Mailing List:
                </label>
                <button type="submit" onClick={validateForm}>Sign up</button>
                {/* y este enlace permitirá al usuario volver a la pantalla de "Log In" (ocultar "signup-form"), ya que al clicar sobre él cambiaremos el valor de "needSignUp" a false: */}
                <a href="" onClick={handleNeedSignUpChange}> Already have an account? </a>
            </div>
        </form>
    )
}

const element = <SignupForm />
root.render(element)