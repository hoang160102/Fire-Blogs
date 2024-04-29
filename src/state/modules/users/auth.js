import firebaseApp from "@/firebase/firebaseInits";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  setDoc,
  doc,
  updateDoc,
  getDocs,
 
} from "firebase/firestore";
import router from "@/router";
export const state = {
  user: null,
  listUsers: [],
  errorMsg: "",
};
export const mutations = {
  allUsers(state, data) {
    state.listUsers = data;
  },
  setError(state, msg) {
    state.errorMsg = msg;
  },
  currentUser(state, data) {
    state.user = data;
  },
  logoutUser(state) {
    state.user = null;
  },
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
      id: result.user.uid
    });
    router.push({ name: "Login" });
  },
  async login({ commit }, user) {
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, user.email, user.password)
      .then(() => {
        setTimeout(() => {
          router.push({ name: "Home" });
        }, 1000);
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
    const userSnapshot = await getDocs(usersCol);
    try {
      const auth = getAuth();
      const currentId = auth.currentUser.uid;
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
    }
    catch(err) {
      return err
    }
  },
  async updateAccount(_, user) {
    const db = getFirestore(firebaseApp)
    const auth = getAuth()
    const getUserFromDatabase = doc(db, "users", auth.currentUser.uid)
    await updateDoc(getUserFromDatabase, {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username
    })
  },
  async logout({ commit }) {
    const auth = getAuth();
    signOut(auth).then(() => {
      commit("logoutUser");
      router.push({ name: "Login" });
    });
  },
  async getAllUsers( { commit }) {
    const arr = [];
    const db = await getFirestore(firebaseApp);
    const dbUser = await collection(db, "users");
    const getUsers = await getDocs(dbUser);
    getUsers.forEach((doc) => {
      arr.push(doc.data());
    });
    commit("allUsers", arr);
  },
  // getAuthor( {state, commit }, id) {

  // }
};

export const getters = {};
