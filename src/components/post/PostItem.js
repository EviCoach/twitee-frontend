import { useContext, useState } from "react";
import NewComment from "../comment/NewComment";
import "./PostItem.css";
import axios from "axios";
import { UserContext } from "../../UserContext";
const mainAxios = axios.create({
    baseURL: 'http://localhost:5000/'
});

export default function PostItem(props) {
    const [isCommenting, setIsCommenting] = useState(false);
    const { user } = useContext(UserContext);
    const toggleCommenting = (event) => {
        setIsCommenting(!isCommenting);
    }
    const deletePost = (event) => {
        event.preventDefault();
        const post = props.post;
        props.deletePost({id:post.id})
    }

    const addComment = (payload) => {

        payload.postId = props.post.id;
        console.log("Creating post payload", payload);

        mainAxios.post(`/api/comments/${payload.postId}`, payload)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        props.updateUI();
        
    }

    const toggleLike = async (event) => {
        event.preventDefault();
        console.log("Liking post")
        await mainAxios.post(`/api/posts/${props.post.id}/like`, {}, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        props.updateUI();
    }

    return (
        <div className="PostItem">
            <hr />
            <div id="PostBody">{props.post.body}</div>

            <div id="PostActions">
                <div className="PostAction">{props.post.likes.length} likes</div>
                <div className="PostAction" onClick={toggleLike}>like</div>
                <div className="PostAction" onClick={toggleCommenting}>comment</div>
                <div className="PostAction" onClick={deletePost}>delete</div>
            </div>
            {isCommenting ? <NewComment addComment={addComment}/> : <div></div>}
            <div className="PostComments">
                {props.post.comments.map((comment, index) => {
                    return <div key={comment.postId+index} className="PostComment">{comment.body}</div>
                })}
            </div>
        </div>
    )
}