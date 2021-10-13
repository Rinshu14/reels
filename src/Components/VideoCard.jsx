import react, { useEffect } from "react";
import { useState, useContext } from "react";
import { authContext } from "../AuthProvider";
import { firestore } from "../firebase";
import "./VideoCard.css"
//the props that it recevied as data it is a object that contains the all the details about the post as well as id of the document that stores that details in the post collection and it will also contain the newly adeed comment
let VideoCard = (props) => {

    let [playing, setPlaying] = useState(false);//to identify video is playing or not
    let [commentBox, setCommentBox] = useState(false);//to identify coomentbox is open or not
    let userDetails = useContext(authContext);
    let [currUserComment, setCurrUserComment] = useState("");
    let [comments, setComments] = useState({});
    let currUserLike = props.data.likes.includes(userDetails.uid);
    useEffect(() => {
        let f = async () => {
            let commentsArr = props.data.comments;

            let arr = [];
            for (let i = 0; i < commentsArr.length; i++) {

                let commentDoc = await firestore.collection("comment").doc(commentsArr[i]).get();

                arr.push(commentDoc.data());

            }
            setComments(arr);
        }
        f();
    }, [props])

    return (<>
        <div className="video-card">
            <p className="video-card-username">{props.data.name}</p>
            <span className="video-card-music" >
                <span class="material-icons  ">music_note</span>
                <marquee className="video-card-songname">song name</marquee>
            </span>
            <span class="material-icons video-card-comment" onClick={() => {
                if (commentBox) {//setting commentbox true or false
                    setCommentBox(false);
                }
                else {
                    setCommentBox(true);
                }
            }}>maps_ugc</span>

            <span class="material-icons video-card-like" onClick={() => {
                let likesArr = props.data.likes;
                if (currUserLike) 
                {
                    likesArr = likesArr.filter((el) => el != userDetails.uid)
                }
                else {
                    likesArr.push(userDetails.uid);
                }
                firestore.collection("posts").doc(props.data.id).update({ likes: likesArr })

            }}>{currUserLike ? "favorite" : "favorite_border"}</span>

            {commentBox ? (//if comment box is open show this means value of commentbox is true 
                <div className="video-card-comment-box">
                    <div className="actual-comment">
                        {comments.map((el) => {

                            return (
                                <div className="post-user-comment">

                                    <img src={el.photo} />
                                    <div>
                                        <h5>{el.name}</h5>
                                        <p>{el.comment}</p>
                                    </div>
                                </div>
                            )
                        })}

                    </div>
                    <div className="comment-form">
                        <input type="text" className="input-comment" value={currUserComment} onChange={(e) => {
                            setCurrUserComment(e.currentTarget.value);

                        }} />
                        <button onClick={async () => {
                            //by this line we are adding the comment which is in state in the comment collection by making a object
                            let docRef = await firestore.collection("comment").add({
                                comment: currUserComment,
                                name: userDetails.displayName,
                                photo: userDetails.photoURL
                            })

                            setCurrUserComment(""); //after adding comment in collection just empty the state
                            //getting the document in which we added the current comment by its docRef
                            let doc = await docRef.get();
                            //getting id of that document to add in the posts collectio
                            let commentDocId = doc.id;

                            //getting the document of the current post which is the post on which we commented now
                            let postDoc = firestore.collection("posts").doc(props.data.id).get();
                            let postCommentArr = (await postDoc).data().comments;

                            postCommentArr.push(commentDocId);//adding the id of the current comment document in the postCommentArr

                            //updating the comment array in the document of current post
                            await firestore.collection("posts").doc(props.data.id).update({
                                comments: postCommentArr
                            })



                        }}>post</button>

                    </div>
                </div>) : ("")}

            <video className="video-card-video" onClick={(e) => {
                if (playing) {
                    e.currentTarget.pause();
                    setPlaying(false);
                }
                else {
                    e.currentTarget.play();
                    setPlaying(true);
                }
            }} >
                <source src={props.data.url}></source>
            </video>


        </div>
    </>
    )
}
export default VideoCard;