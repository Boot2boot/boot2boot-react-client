import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'
import EventCreate from '../EventCreate/EventCreate'
import EventIndex from '../EventIndex/EventIndex'
import EventShow from '../EventShow/EventShow'
import EventUpdate from '../EventUpdate/EventUpdate'
import EventRSVP from '../EventRSVP/EventRSVP'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  msgAlert = ({ heading, message, variant }) => {
    this.setState({ msgAlerts: [...this.state.msgAlerts, { heading, message, variant }] })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map((msgAlert, index) => (
          <AutoDismissAlert
            key={index}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
          />
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
        </main>
        <div>
          <Route exact path="/create" user={user} render={() => (
            <EventCreate user={user} msgAlert={this.msgAlert}/>
          )}/>
        </div>
        <div>
          <Route exact path="/" user={user} render={() => (
            <EventIndex user={user}/>
          )}/>
        </div>
        <div>
          <Route path="/events/:id" user={user} render={props => (
            <EventShow user={user} msgAlert={this.msgAlert} match={props.match}/>
          )}/>
        </div>
        <div>
          <Route path="/events/:id" user={user} render={props => (
            <EventUpdate user={user} match={props.match}/>
          )}/>
        </div>
        <div>
          <Route path="/events/:id/rsvps" user={user} render={props => (
            <EventRSVP user={user} msgAlert={this.msgAlert} match={props.match}/>
          )}/>
        </div>
      </Fragment>
    )
  }
}

export default App
