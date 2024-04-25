import firebaseApp from "@/firebase/firebaseInits";
import { serverTimestamp, getFirestore} from "firebase/firestore"
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
    blogPost: []
}

export const mutations = {
  previewPost(state, data) {
    state.blogPost = data
    console.log(state.blogPost)
  }
}

export const actions = {
    async uploadPost() {
      await getFirestore(firebaseApp);
      const time = serverTimestamp()
      console.log(time)
    }
}