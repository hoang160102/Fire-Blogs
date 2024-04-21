import firebaseApp from "@/firebase/firebaseInits";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  setDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import router from "@/router";
export const state = {
  user: null,
  listUsers: [],
  errorMsg: "",
};
export const mutations = {
  addUser(state, data) {
    state.listUsers.push(data);
  },
  setError(state, msg) {
    state.errorMsg = msg;
  },
  currentUser(state, data) {
    state.user = data
    console.log(state.user)
  }
};

export const actions = {
  async register(_, newUser) {
    const auth = await getAuth();
    const db = await getFirestore(firebaseApp);
    const createUser = await createUserWithEmailAndPassword(
      auth,
      newUser.email,
      newUser.password
    );
    const result = await createUser;
    const database = collection(db, "users");
    await setDoc(doc(database, result.user.uid), {
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      username: newUser.username,
      password: newUser.password,
    });
    router.push({ name: "Login" });
  },
  async login({ commit }, user) {
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, user.email, user.password)
      .then(() => {
        setTimeout(() => {
          router.push({ name: "Home" });
        }, 1000)
      })
      .catch((err) => {
        if (err.code.includes("auth/")) {
          commit("setError", "Your email or password is not correct");
        }
      });
  },
  async resetPass({ commit }, data) {
    const auth = getAuth();
    await sendPasswordResetEmail(auth, data.email)
      .then(() => {})
      .catch((err) => {
        if (err.code.includes("auth/")) {
          commit("setError", "Error");
        }
      });
  },
  async getCurrentUser( {commit}) {
    const db = getFirestore(firebaseApp);
    const usersCol = collection(db, "users");
    const auth = getAuth();
    const currentId = auth.currentUser.uid;
    const userSnapshot = await getDocs(usersCol);
    const getUser = userSnapshot.docs.filter((doc) => {
      return doc.id === currentId;
    });
    const currentUser = {
      id: currentId,
      firstName: getUser[0].data().firstName,
      lastName: getUser[0].data().lastName,
      username: getUser[0].data().username,
      email: getUser[0].data().email,
      password: getUser[0].data().password,
    }
    commit('currentUser', currentUser)
  },
};

export const getters = {};
