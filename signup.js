import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { getFirestore, collection, addDoc, doc, setDoc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
import { app } from "./firebase/firebaseConfig.js"
import { getElement } from "./functins/utils.js"

const auth = getAuth(app)
const DB = getFirestore(app)
const userColRef = collection(DB, "users")

// ELEMENTS
const nameEl = getElement("#name")
const emailEl = getElement("#email")
const passwordEl = getElement("#password")
const confirmPasswordEl = getElement("#confirm-password")
const signupBtnEl = getElement("#signup-btn")


// SIGN U
const signup = async () => {
    if(passwordEl.value !== confirmPasswordEl.value){
        alert("passwords d0 n0t match")
        return
    }
    signupBtnEl.innerHTML = '<p>Authenticating..</p>'
    signupBtnEl.disabled = true
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, emailEl.value, passwordEl.value)
        if(userCredential.user){
            const newUser = {
                name: nameEl.value,
                email: emailEl.value,
                image: `https://avatar.iran.liara.run/username?username=${nameEl.value}`
            }
            console.log()

            const userDocRef = doc(userColRef, userCredential.user.uid)
            await setDoc(userDocRef, newUser)
            sendEmailVerification(userCredential.user)
            window.location.href = "./signin.html"
        }
    } catch (error) {
        console.log(error)
    } finally{
        signupBtnEl.innerHTML = `<span>Sign Up</span>
                                <img src="./images/Arrow-Right.png" alt="" width="20px">`
        signupBtnEl.disabled = false
    }
}

signupBtnEl.addEventListener("click", signup)