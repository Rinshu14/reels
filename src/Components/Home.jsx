
import { useContext, useEffect, useState } from "react"
import { Redirect } from "react-router-dom"
import { authContext } from "../AuthProvider"
import { auth, firestore } from "../firebase"
import { storage } from "../firebase"
import "./Home.css";
import VideoCard from "./VideoCard"

let Home = () => {
    let userDetails = useContext(authContext);//using authcontext context which is created in authProvider that have UserDeatils if user is looged in otherwise it is null
    let [posts, setposts] = useState([])//creating a state named post which is array of object that contains all details about a post ex-name who posted ,url etc
    
    useEffect(() => {
        let unsub = firestore.collection("posts").onSnapshot((querySnapshot) => {//this is listner that is attached to the post collection so when ever we add a comment in it will reflect here and it will change the state
            //posts and state change cause rerender and in that rerender 
            let docarr = querySnapshot.docs;
            let postsarr = [];//postarr is a array of object in which a object have all the data of a document in the collection and the id of that document
            for (let i = 0; i < docarr.length; i++) {
                postsarr.push({
                    id: docarr[i].id,
                    ...docarr[i].data(),
                })
            }
            setposts(postsarr);
          
        })
        return () => {
            unsub();
        }
    },[])

    return (
        <>

            {userDetails ? "" : <Redirect to="/Login" />}

            {/* if userDetails is not null means user is logged in than remain in home if userDetails is null that user is not loggedin than redirect him to login page */}
            {/* Redirect is tag of react-router-dom library  */}

            <div className="video-container">
                {posts.map((el) => {
                 
                    
                    return <VideoCard key={el.id} data={el} />
                })}
            </div>

            <button className="home-logout-btn" onClick={() => { auth.signOut() }}>Log out</button>
            
            <input type="file" className="input-file" onClick={(e) => {
                e.currentTarget.value = null;
            }} onChange={(e) => {//this function will execute only if the value of input get change but if a user upload a same video again than there is no change in value because previous filename =current filename so we are setting its value null on click 

                let videoObj = e.currentTarget.files[0];//it will have a array of all files that we uploaded but in this case we are uploading only a single video it will be always on 1 index that is  a object that contains all info about the file
                let { name, size, type } = videoObj;
                size = size / 1000000;
                if (size > 10) {
                    alert("file size limit exceed");
                    return;
                }
                type = type.split("/")[0];

                if (type != "video") {
                    alert("upload a video");
                    return;
                }
                let uploadTask = storage.ref(`/posts/${userDetails.uid}/${Date.now() + "-" + name}`).put(videoObj);//ref function takes location file to store if given location does not exists yhan creates it and put function upload that data there
                //uploadTask is a event that is returned by upperline
                uploadTask.on("state_changed", null, null, () => {//it will take 3 argument function from them third function will execute after the file upload
                    uploadTask.snapshot.ref.getDownloadURL()//this line will return a promise which is resolved with the url of uploaded file and we can use this url to use the file anywhere which is uploaded at server 
                        .then((url) =>{
                            firestore.collection("posts").add({ name: userDetails.displayName, url, likes: [], comments: [] })//we are adding a document  in posts collection that contains the details of newly added video
                        })
                })
            }} />
        </>

    )
}
export default Home;