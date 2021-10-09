import react from "react";
import { useState } from "react";
import "./VideoCard.css"
let VideoCard = () => {
    let [playing, setPlaying] = useState(false);
    let [commentBox, setCommentBox] = useState(false);
    console.log(playing);
    return (<>
        <div className="video-card">
            <p className="video-card-username">user name</p>
            <span className="video-card-music" >
                <span class="material-icons  ">music_note</span>
                <marquee className="video-card-songname">song name</marquee>
            </span>
            <span class="material-icons video-card-comment" onClick={() => {
                if (commentBox) {
                    setCommentBox(false);
                }
                else {
                    setCommentBox(true);
                }
            }}>maps_ugc</span>
            <span class="material-icons video-card-like">favorite_border</span>

            {commentBox ? (
                <div className="video-card-comment-box">
                    <div className="actual-comment">
                        <div className="post-user-comment">

                            <img src="data:image/jpeg;base64,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"/>

                            <div>
                                <h4>username</h4>
                                <p>actual comment</p>
                            </div>
                        </div>
                    </div>
                    <div className="comment-form">
                        <input type="text" />
                        <button>post</button>
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
                <source src="https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4"></source>
            </video>


        </div>
    </>
    )
}
export default VideoCard;