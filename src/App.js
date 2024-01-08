import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ParticlesBg from 'particles-bg'
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Loader from './components/loader/loader';


const initState = {
  input: '',
  imageUrl: '',
  route: "",
  rememberMe: false,
  loading: true,
  user: {
    id: 0,
    name: '',
    email: '',
    password: '',
    entries: 0,
    createdAt: new Date()
  },
  box: {

  },

}
class App extends Component {
  constructor() {
    super()
    this.state = initState;
  }

  onInputChange = (event) => {

    this.setState({
      input: event.target.value
    })
  }



  loadUser = (data) => {
    this.setState({
      user: data
    })
  }

  onSubmit = () => {
    this.setState({
      imageUrl: this.state.input
    })

    console.log('MY ID IS ', this.state.user.id)


    fetch('https://smartbrain-express.onrender.com/face-detection', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'IMAGE_URL': this.state.input

      })
    }).then(resp => resp.json())
      .then(result => {
        this.displayFaceBox(this.calculateFaceLocation(result))
        fetch('https://smartbrain-express.onrender.com/image', {
          method: 'put',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'id': this.state.user.id
          })
        }).then(resp => resp.json())
          .then(data => this.setState(
            Object.assign(this.state.user, { entries: data })
          ))
          .catch(console.log)
      })
      .catch(console.log)


  }

  componentDidMount() {

    setTimeout(() => {
      if (localStorage.getItem('data') != null) {


        const data = localStorage.getItem('data')
        var user = JSON.parse(data);

        if (user.id) {
          this.loadUser(user)
          this.onRouteChange('home')
        }

      } else {
        this.onRouteChange('signIn')
      }


      this.setState({
        loading: false,
      })
    }, 3000);


  }



  onRouteChange = (newRoute) => {
    if (newRoute === 'signOut') {
      this.setState(initState)
    }
    this.setState({
      route: newRoute,
    })
    console.log(this.state.route)
  }

  handleSession = () => {

    this.setState({
      rememberMe: !this.state.rememberMe,
    })

  }

  logout = () => {
    localStorage.clear()
    setTimeout(() => {
      this.onRouteChange('register')
    }, 2000);

  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('imgDiv')
    const width = Number(image.width)
    const height = Number(image.height)

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    console.log(box)
    this.setState({
      box: box
    })
  }



  render() {
    const { route, loading } = this.state;

    return (
      <div className='App'>


        <ParticlesBg color='#ffffff' num={90} type="cobweb" bg={true} className="particles" />
        {
          loading || route === "" ? <Loader /> : <div>

            <Navigation onRouteChange={this.onRouteChange} isUserSigned={route === "home" ? true : false} logout={this.logout} />
            {


              route === "signIn" ?
                <SignIn onRouteChange={this.onRouteChange}
                  loadUser={this.loadUser}
                  rememberMeVal={this.state.rememberMe}
                  rememberMeFun={this.handleSession} />
                :
                route === "register" ?
                  <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} rememberMeVal={this.state.rememberMe}
                    rememberMeFun={this.handleSession} /> :
                  <div>
                    <Logo />
                    <Rank user={this.state.user} />
                    <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit} />
                    <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
                  </div>
            }
          </div>
        }
      </div>
    );
  }
}



export default App;
