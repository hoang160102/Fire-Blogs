import firebaseApp from "@/firebase/firebaseInits";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
} from "firebase/firestore";
import router from "@/router";
export const state = {
  currentUser: [],
  listUsers: [],
};
export const mutations = {
  addUser(state, data) {
    state.listUsers.push(data)
  }
};

export const actions = {
  async register({ commit }, newUser) {
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, newUser.email, newUser.password);
    const db = getFirestore(firebaseApp);
    const createUser = await addDoc(collection(db, "users"), {
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      username: newUser.username,
      password: newUser.password,
    });
    router.push({ name: "Login" });
    const docSnap = await getDoc(createUser)
    if (docSnap.exists()) {
      const realData = docSnap.data()
      commit("addUSer", realData)
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
    console.log("Document written with ID: ", createUser.id);
  },
};
