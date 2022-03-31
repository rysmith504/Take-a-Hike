// Import Dependencies
import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
// import { useEffect, useState } from 'react';

// Import Components
// import Login from './Login.jsx';
import TrailProfile from "./TrailProfile.jsx";
import Quartermaster from "./Quartermaster.jsx"
// import Trails from "./Trails.jsx"
import TrailsList from "./TrailsList.jsx"
import TrailsListEntry from "./TrailsListEntry.jsx"
import UserProfile from "./UserProfile.jsx"
import BirdingCheckList from "./BirdingCheckList.jsx";
// import TrailFeathers from './TrailFeathers.jsx';
// import TrailCard from './TrailCard.jsx'; // COMMENTED OUT BY RENE



class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      view: 'trailsList',
    }
  this.changeView = this.changeView.bind(this);
  this.renderView = this.renderView.bind(this);
  }

  // componentDidMount() {
  //   axios.get('/')
  //     .then(( responseObj) => {
  //       this.setState({ trailsArr: responseObj.data });
  //     })
  //     .catch((err) => console.log(err));
  // },

  changeView(view) {
    this.setState({ view })
  }

  renderView() {
    const { view } = this.state;
    if (view === 'trailsList') {
      return <TrailsList trailsArr={this.state.trailsArr} />
    } else if (view === 'quartermaster') {
      return <Quartermaster/>
    } else if (view === 'birdingCheckList') {
      return <BirdingCheckList/>
    }
  }

  render() {
    const { view } = this.state;

    return (
      <div>
      <div className='nav'>
        <span className='logo' onClick={() => this.changeView('trailsList')}>
          TrailFeathers     
        </span>
        <span
          className={view === 'trailsList' ? 'nav-selected' : 'nav-unselected'}
          onClick={() => this.changeView('trailsList')}>
          Trails List     
        </span>
        <span
          className={view === 'quartermaster' ? 'nav-selected' : 'nav-unselected'}
          onClick={() => this.changeView('quartermaster')}>
          Quartermaster     
        </span>
        <span
          className={view === 'birdingCheckList' ? 'nav-selected' : 'nav-unselected'}
          onClick={() => this.changeView('birdingCheckList')}>
          Birding Checklist
        </span>
      </div>
      <div className='main'>{this.renderView()}</div>
    </div>
    );
  }
}

// Export Component
export default App;





// <div>
// <h1 className="Header" alignment="center">
//   Take a Hike in Louisiana
// </h1>
// <h2>All parks within 500 miles radius</h2>
// {/* <Login/> */}
// {/* <UserProfile/> */}
// <TrailsList />
// {/* <Trails />
// <TrailFeathers /> */}
// {/* <BirdingCheckList /> */}
// <Quartermaster/>
// <TrailProfile />
// {/* <Link to="/login">Login</Link> */}
// {/* <Routes>
//   <Route path="/" element={<TrailsList />} />
//   <Route path="login" element={<Login />} />
//   <Route path="profile" element={<UserProfile />} />
//   <Route path="trail/:id" element={<TrailProfile />} />
// </Routes> */}
// </div>





// function App() {
//   return (
//     <Router>
//       <div className="container">
//       <Navbar />
//       <br/>
//       <Route path="/" exact component={TrailsList} />
//       <Route path="/quartermaster" component={Quartermaster} />
//       <Route path="/birding-checkList" component={BirdingCheckList} />
//       <Route path="/user-profile" component={UserProfile} />
//       </div>
//     </Router>
//   );
// }