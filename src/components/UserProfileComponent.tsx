import { Button, Container, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useState, useEffect } from "react";
import { Principal } from "../dtos/principal";

interface IUserProfile{
    currentUser: Principal | undefined,
    setCurrentUser: (nextUser: Principal | undefined) => void
}

const useStyles = makeStyles({
    profileContainer: {
        textAlign: 'center',
        justifyContent: 'center', 
        marginTop: '3rem',
    
    }
});

function UserProfileComponent(props: IUserProfile){

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const classes = useStyles();

    useEffect(() => {
        getUsers();
    }, [])

    async function getUsers() {
        props.currentUser?
        await fetch(`http://localhost:5000/user/${props.currentUser.id}`)

            .then((result) => {
                return result.json()
            }).then((resp) => {

                setFirstName(resp.firstName)
                setLastName(resp.lastName)
                setEmail(resp.email)
                setUsername(resp.username)
                setPassword(resp.password)
                
            })
            : console.log('test');
    }   

    return (
        <>
            <div id="edit-profile" className={classes.profileContainer} >
                <h1>Update your profile</h1>

                <div>
                    
                    <div>
                    <label>First Name: </label>
                    <input type="text" value={firstName} onChange={e=>setFirstName(e.target.value)}></input>
                    <button>Save</button>
                    </div>

                    <div>
                    <label>Last Name: </label>
                    <input type="text" value={lastName} onChange={e=>setLastName(e.target.value)}></input>
                    <button >Save</button>
                    </div>

                    <div>
                    <label>Email: </label>
                    <input type="text" value={email} onChange={e=>setEmail(e.target.value)}></input>
                    <button >Save</button>
                    </div>

                    <div>
                    <label>Username: </label>
                    <input type="text" value={username} onChange={e=>setUsername(e.target.value)}></input>
                    <button >Save</button>
                    </div>

                    <div>
                    <label>Password: </label>
                    <input type="text" value={password} onChange={e=>setPassword(e.target.value)}></input>
                    <button >Save</button>
                    </div>

                </div>

            </div>
        
        </>
    );

}
export default UserProfileComponent;
