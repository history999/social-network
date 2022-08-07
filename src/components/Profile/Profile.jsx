import React from "react";
import profile from "./Profile.module.scss"
import profileImg from "../../img/profile.png"
import ProfileStatus from './ProfileStatus';

const Profile = (props) => {


    let postElement = React.createRef()
    
    let addpost = () => {
        console.log(postElement.current.value)
        props.clickAddPost(postElement.current.value)
        postElement.current.value = ''
    }
    
    

    return (
        <div>
            <div className={profile.profile}>
                <div className={profile.info}>
                    <img src={profileImg} alt="" />
                    <div>
                        <h2>{console.log(props.profile)}</h2>
                        <ProfileStatus status={props.status} />
                    </div>
                </div>
                <div className={profile.buttons}>
                    <div>Публикаций:0</div>
                    <div>Подписчики</div>
                    <div>Подписки</div>
                </div>
            </div>

            <div className={profile.posts}>
                <div className={profile.addPost}>
                    <img src={profileImg} alt="" />
                    <input  type="text" placeholder="Enter your post" ref={postElement}/>
                    <button onClick={ addpost }>ADD POST</button>
                </div>
            </div>
            {/* props.posts.length === 0 ? <div>Posts not found</div> :  */}
            { props.posts.map( p => <div key={p.id}>{p.message}</div> ) }
            
            
        </div>
    )
}

export default Profile