import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { getFirestore, collection, addDoc, doc, setDoc, getDoc, getDocs } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
import { app } from "./firebase/firebaseConfig.js"
import { getElement } from "./functins/utils.js"

const auth = getAuth(app)
const DB = getFirestore(app)
const userColRef = collection(DB, "users")
const recipeColRef = collection(DB, "recipes")
let currentUser;

// ELEMENTS
const nameEl = getElement("#user-name")
const recipeCardsEl = getElement("#recipe-cards")
const userImageEl = getElement("#user-image")

onAuthStateChanged(auth, (user) => {
    if (user) {
        currentUser = user
        dislayUser()
    }
})

const dislayUser = async () => {
    try {
        const docRef = doc(userColRef, currentUser.uid)
        const docSnasht = await getDoc(docRef)
        const user = docSnasht.data()

        console.log(user);

        nameEl.innerHTML = user.name.split(" ")[1]
        userImageEl.src = user.image
    } catch (error) {
        console.log(error)
    }
}

const fetchRecies = async () => {
    try {
        const querySnasht = await getDocs(recipeColRef)
        querySnasht.forEach(ele => {
            const recipe = ele.data()
            console.log(recipe);
            
            recipeCardsEl.innerHTML += `
                 <div class="card">
                <div class="food-details-con">
                    <div class="food-con">
                        <img src="./images/food-1.png" alt="" width="90px">
                    </div>
                    <div class="food-title" id="recipe-name">
                        ${recipe.name}
                    </div>
                    <div class="time-taken">
                        <span id="recipe-dura">${recipe.duration} mins</span>
                        <span id="recipe-chef">${recipe.chef}</span>
                    </div>
                    <div class="bookmark">
                        <img src="./images/Inactive.png" alt="" width="16px">
                    </div>
                </div>
            `
        })
    } catch (error) {
        console.log(error)
    }
}

fetchRecies()