import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {userId: '', pin: '', errorMsg: '', errorLogin: false}

  onSubmitLogin = JwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', JwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  onFailureLogin = errorMsg => {
    this.setState({errorMsg, errorLogin: true})
  }

  onSubmitUser = async event => {
    event.preventDefault()
    const {userId, pin} = this.state
    const userDetails = {user_id: userId, pin}
    console.log(userDetails)
    const imageApi = 'https://apis.ccbp.in/ebank/login'
    const option = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const fetchData = await fetch(imageApi, option)
    const data = await fetchData.json()
    if (fetchData.ok === true) {
      this.onSubmitLogin(data.jwt_token)
    } else {
      console.log(data)
      this.onFailureLogin(data.error_msg)
    }
  }

  onChangeUserPin = event => {
    this.setState({pin: event.target.value})
  }

  onChangeUserId = event => {
    this.setState({userId: event.target.value})
  }

  render() {
    const {userId, pin, errorLogin, errorMsg} = this.state
    const JwtToken = Cookies.get('jwt_token')
    if (JwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="bg-container">
        <div className="card-container">
          <div className="website-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
            />
          </div>
          <form className="card-form-container" onSubmit={this.onSubmitUser}>
            <h1>Welcome Back!</h1>
            <div className="label-container">
              <label htmlFor="userId" className="label-user">
                User ID
              </label>
              <input
                type="text"
                placeholder="Enter User ID"
                id="userId"
                className="input-Element"
                onChange={this.onChangeUserId}
                value={userId}
              />
            </div>
            <div className="label-container">
              <label htmlFor="PIN" className="label-user">
                PIN
              </label>
              <input
                type="password"
                placeholder="Enter PIN"
                id="PIN"
                className="input-Element"
                onChange={this.onChangeUserPin}
                value={pin}
              />
            </div>
            <button type="submit" className="login-bottom-Element">
              Login
            </button>
            {errorLogin && <p className="error-Element">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
