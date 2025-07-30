import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDoc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
import { app } from "./firebase/firebaseConfig.js"
import { getElement } from "./functins/utils.js"

const auth = getAuth(app)
const DB = getFirestore(app)
const userColRef = collection(DB, "users")
let currentUser ;

const nameEl = getElement("#name")
const descriptionEl = getElement("#description")
const durationEl = getElement("#duration")

onAuthStateChanged(auth, (user)=>{
    if(user){
        currentUser = user
    }
})

// ADD RECIE
const addRecie = async ()=>{
    if(!currentUser){
        alert("Yu are nt authenticated")
        return
    }
    try {
        const user = await getDoc(userColRef, currentUser.uid)
        const newRecie = {
            name: nameEl.value,
            description: descriptionEl.value,
            duration: durationEl.value,
            chef: user.name
        }
        
    } catch (error) {
        
    }
}