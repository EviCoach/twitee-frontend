import { useContext, useEffect, useState } from "react";
import NewPost from "../post/NewPost";
import PostItem from "../post/PostItem";
import "./Posts.css";
import axios from "axios";
import { UserContext } from "../../UserContext";

const mainAxios = axios.create({
    baseURL: 'http://localhost:5000/'
});

export default function Twits() {
    const { user } = useContext(UserContext);
    const [posts, setPosts] = useState([]);
    const [shouldRun, setShouldRun] = useState(true)

    const refreshPostsAndComments = async () => {
        mainAxios.get("/api/posts", {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
            .then(response => {
                console.log("Response from getting posts: ", response);
                const postsArr = response.data.data;
                console.log("data:::::", postsArr);

                setPosts(postsArr);

            }).catch(err => {
                console.log(err);
            })
        // const postsArr = response.data.data;

        // return postsArr;
    }


    const getPostsWithComments = async () => {
        mainAxios.get("/api/posts", {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
            .then(response => {
                console.log("Response from getting posts: ", response);
                const postsArr = response.data.data;
                console.log("data:::::", postsArr);
                if (shouldRun) {
                    setPosts(postsArr)
                    setShouldRun(false);
                }
            }).catch(err => {
                console.log(err);
            })
        // const postsArr = response.data.data;

        // return postsArr;
    }

    const addPost = (payload) => {
        mainAxios.post("/api/posts", payload, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        }).then(response => {
            refreshPostsAndComments();
        }).catch(err => {
            console.log("Error adding new post");
        })
    }
    const deletePost = (payload) => {
        console.log("deleting post");
        mainAxios.delete(`/api/posts/${payload.id}`, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        }).then(response => {
            refreshPostsAndComments();
            console.log("Deleting post response", response)
        }).catch(err => {
            console.log("Error deleting post", err);
        });
    }


    useEffect(() => {
        getPostsWithComments();
    }, [])
    return (
        <div id="Posts">
            <NewPost addPost={addPost} />
            {posts.map((post, index) => {
                return <PostItem
                    key={post.id.toString()}
                    post={post}
                    updateUI={refreshPostsAndComments}
                    deletePost={deletePost} />
            })}
        </div>
    )
}