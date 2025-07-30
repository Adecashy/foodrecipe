import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { app } from "./firebase/firebaseConfig.js"
import { getElement } from "./functins/utils.js"

const auth = getAuth(app)

// ELEMENTS
const emailEl = getElement("#email")
const passwordEl = getElement("#password")
const signinBtnEl = getElement("#signin-btn")

// SIGN IN
const signin = async () => {
    if(!passwordEl.value || !emailEl.value){
        alert("All fields are required!")
        return
    }
    signinBtnEl.innerHTML = '<p>Authenticating..</p>'
    signinBtnEl.disabled = true
    try {
        const userCredential = await signInWithEmailAndPassword(auth, emailEl.value, passwordEl.value)
        if(userCredential.user){
            window.location.href = "./dashboard.html"
        }
    } catch (error) {
        console.log(error)
    } finally{
        signinBtnEl.innerHTML = `<span>Sign In</span>
                                <img src="./images/Arrow-Right.png" alt="" width="20px">`
        signinBtnEl.disabled = false
    }
}

signinBtnEl.addEventListener("click", signin)