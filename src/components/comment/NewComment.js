import { useContext, useState } from "react";
import "./NewComment.css";
import { UserContext } from "../../UserContext";


export default function NewComment(props) {
    const { user } = useContext(UserContext);
    const [body, setBody] = useState("")
    
    const createNewComment = async (event) => {
        event.preventDefault();
        const payload = { body, token: `Bearer ${user.token}` };
        props.addComment(payload)
        console.log("creating new comment", body)
    }

    return (<div className="new-post">

        <div id="NewPost">
            <textarea id="new-post-textarea" name="textValue"
                type="textarea"
                placeholder="You can comment on this post"
                value={body}
                onChange={e => setBody(e.target.value)} />
            <button onClick={createNewComment}>Add comment</button>
        </div>
    </div>)
}