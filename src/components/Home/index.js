import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'

import './index.css'

const Home = props => {
  const token = Cookies.get('jwt_token')
  if (token === undefined) {
    return <Redirect to="/ebank/login" />
  }

  const logOutRemove = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }

  return (
    <div className="home-container">
      <nav className="header-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          alt="website logo"
          className="website-logo"
        />
        <button type="button" onClick={logOutRemove} className="remove-logout">
          Logout
        </button>
      </nav>
      <div className="atm-container">
        <h1 className="your-heading">Your Flexibility, Our Excellence</h1>
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
          alt="digital card"
          className="digital-card"
        />
      </div>
    </div>
  )
}

export default Home
