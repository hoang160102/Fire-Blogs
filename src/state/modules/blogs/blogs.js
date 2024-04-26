import firebaseApp from "@/firebase/firebaseInits";
import { Timestamp, getFirestore, addDoc, collection, getDocs } from "firebase/firestore"
import { getAuth } from "firebase/auth";
export const state = {
    sampleBlogCard: [
        {
          blogTitle: "Blog Card #1",
          blogCoverPhoto: "stock-1",
          blogDate: "May 1, 2024",
        },
        {
          blogTitle: "Blog Card #2",
          blogCoverPhoto: "stock-2",
          blogDate: "May 2, 2024",
        },
        {
          blogTitle: "Blog Card #3",
          blogCoverPhoto: "stock-3",
          blogDate: "May 3, 2024",
        },
        {
          blogTitle: "Blog Card #4",
          blogCoverPhoto: "stock-4",
          blogDate: "May 4, 2024",
        },
      ],
    blogPost: [],
    blogs: []
}

export const mutations = {
  previewPost(state, data) {
    state.blogPost = data
  },
  allBlogs(state, data) {
    state.blogs = data
  }
}

export const actions = {
    async uploadPost(_, data) {
      const db = getFirestore(firebaseApp)
      const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      let date = Timestamp.fromDate(new Date()).toDate().getDate()
      let month = months[Timestamp.fromDate(new Date()).toDate().getMonth()]
      let year = Timestamp.fromDate(new Date()).toDate().getFullYear()
      // const blog = {
      //   blogTitle: data.blogTitle,
      //   blogImg: data.linkImg,
      //   blogHTML: data.blogHTML,
      //   createdAt: `${month} ${date}, ${year}`
      // }
      const database = collection(db, "blogs")
      console.log(data.linkImg)
      await addDoc(database, {
        blogId: database.id,
        blogTitle: data.blogTitle,
        blogImg: data.linkImg,
        blogHTML: data.blogHTML,
        author: getAuth().currentUser.uid,
        createdAt: `${month} ${date}, ${year}`,
      });
    },
    async getAllBlogs( { commit } ) {
      const arr = []
      const db = getFirestore(firebaseApp)
      const dbBlog = collection(db, "blogs")
      const getBlogs = await getDocs(dbBlog)
      getBlogs.forEach((doc) => {
        arr.push(doc.data())
      })
      commit("allBlogs", arr)
      console.log(arr)
    }
}

export const getters = {
  blogPostsFeed(state) {
    return state.blogs.slice(0, 2);
  },
  blogPostsCards(state) {
    return state.blogs.slice(2, 6);
  },
}