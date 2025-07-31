import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDoc, doc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
import { app } from "./firebase/firebaseConfig.js"
import { getElement } from "./functins/utils.js"

const auth = getAuth(app)
const DB = getFirestore(app)
const userColRef = collection(DB, "users")
const recipeColRef = collection(DB, "recipes")
let currentUser;

const nameEl = getElement("#name")
const descriptionEl = getElement("#description")
const durationEl = getElement("#duration")
const addRecipeBtnEl = getElement("#add-recipe-btn")
const formEl = getElement("#form-el")

onAuthStateChanged(auth, (user) => {
    if (user) {
        currentUser = user
        console.log(user)
    }
})

console.log(addRecipeBtnEl)

// ADD RECIE

const addRecie = async () => {
    
    if (!currentUser) {
        alert("Yu are nt authenticated")
        return
    }
    
    addRecipeBtnEl.innerHTML = "Adding..."
    addRecipeBtnEl.disabled = true
    try {
        const docRef = doc(userColRef, currentUser.uid)
        const userSnapShot = await getDoc(docRef)
        const user = userSnapShot.data()
     
        const newRecipe = {
            name: nameEl.value,
            duration: durationEl.value,
            description: descriptionEl.value,
            chef: user.name
        }
        const recipeDocRef = await addDoc(recipeColRef, newRecipe)
        nameEl.value = ""
        durationEl.value = ""
        descriptionEl.value = ""
    } catch (error) {
        console.log(error);

    } finally {
        console.log("D0NE!");
    }
}

formEl.addEventListener("submit", (e) => {
    e.preventDefault()
    addRecie()
})

// addRecipeBtnEl.addEventListener("click", addRecie)