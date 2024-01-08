import React from "react";

class SignIn extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            "emailSignIn": "",
            "passwordSignIn": ""
        }
    }
    onEmailChange = (event) => {
        this.setState({
            "emailSignIn": event.target.value
        })
    }

    onPassChange = (event) => {
        this.setState({
            "passwordSignIn": event.target.value
        })
    }

    onSubmit = () => {
        const { onRouteChange, loadUser, rememberMeVal } = this.props;


        fetch("https://smartbrain-express.onrender.com/signin", {
            method: "post",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST,PATCH,OPTIONS'
            },
            body: JSON.stringify({
                'email': this.state.emailSignIn,
                'password': this.state.passwordSignIn
            })
        }).then(res => res.json())
            .then(data => {
                if (data.id) {
                    if (rememberMeVal) {
                        localStorage.setItem('data', JSON.stringify(data))
                    }
                    loadUser(data)
                    onRouteChange("home")
                }
            })
    }
    render() {
        const { onRouteChange, rememberMeVal, rememberMeFun } = this.props;
        return (
            <article className="br2 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">

                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address" id="email-address" />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input onChange={this.onPassChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password" />
                        </div>
                        <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox" onChange={() => rememberMeFun()} value={rememberMeVal} /> Remember me</label>
                    </fieldset>
                    <div className="">
                        <input onClick={() => this.onSubmit()} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" />
                    </div>
                    <div className="lh-copy mt3">
                        <p className="f6 black ">Don't have an account?</p>
                        <p onClick={() => onRouteChange('register')} className="f6 link dim white pointer">Register</p>


                    </div>

                </main>
            </article>
        )
    }
}
export default SignIn