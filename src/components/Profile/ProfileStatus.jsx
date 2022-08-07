import React from "react";
import profile from './Profile.module.scss'

class ProfileStatus extends React.Component {
    state = {
        editMode: false
    }

    clickEditStatus(){
        this.setState({
            editMode: true
        })
    }

    NotclickEditStatus(){
        this.setState({
            editMode: false
        })
    }

    render() {
        return (
            <p><span> О себе: </span>
                {!this.state.editMode ? <div onDoubleClick={this.clickEditStatus.bind(this)}>
                    <br /> {this.props.status}
                </div> :
                    <div>
                        <br /> <input className={profile.inputStatus} autoFocus onBlur={this.NotclickEditStatus.bind(this)} type="text" value={this.props.status} />
                    </div>}
            </p>
        )
    }
}

export default ProfileStatus