import { useContext, useState } from "react";
import "./NewPost.css";
import axios from "axios";
import { UserContext } from "../../UserContext";
const mainAxios = axios.create({
    baseURL: 'http://localhost:5000/'
});

const createPost = async (payload) => {
    console.log("Creating post payload", payload);
    
    mainAxios.post('/api/posts', payload)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}
export default function NewPost(props) {
    const { user } = useContext(UserContext);
    const [body, setBody] = useState("")
    const createNewPost = async (event) => {
        event.preventDefault();
        const payload = { body, userId: user.id, token: `Bearer ${user.token}` };
        console.log("Creating post with payload:::", payload);
        props.addPost(payload)
        // await createPost({ body, userId: user.userId ,token:`Bearer ${user.token}`})
    }

    return (<div className="new-post">
        <div id="NewPost">
            <div>New post</div>
            <textarea id="new-post-textarea" name="textValue"
                type="textarea"
                placeholder="What do you have in mind"
                value={body}
                onChange={e => setBody(e.target.value)} />
            <button onClick={createNewPost}>Twit post</button>
        </div>
    </div>)
}