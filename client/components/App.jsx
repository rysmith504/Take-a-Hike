// Import Dependencies
import React from "react";
import { Link, Outlet } from "react-router-dom";

const App = () => {

  return (
    <div>
      <h1 className="Header" alignment="center">
        Trail Feathers
      </h1>
      <nav
        style={{
          borderBottom: 'solid 1px',
          paddingBottom: '1rem',
        }}
      >
        <Link to="/login">Login</Link> |{' '}
        <Link to="/trailslist">Trails List</Link> |{' '}
        <Link to="/trailprofile">Trail Profile</Link> |{' '}
        <Link to="/quartermaster">Quartermaster</Link> |{' '}
        <Link to="/packinglist">Packing List</Link> |{' '}
        <Link to="/birdingchecklist">Birding Checklist</Link> |{' '}
        <Link to="/userprofile">User Profile</Link> |{' '}
      </nav>
      <Outlet />
    </div>
  );
};

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
    } else if (view === 'userProfile') {
      return <UserProfile/>
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
          __Trails List
        </span>
        <span
          className={view === 'quartermaster' ? 'nav-selected' : 'nav-unselected'}
          onClick={() => this.changeView('quartermaster')}>
          __Quartermaster
        </span>
        <span
          className={view === 'birdingCheckList' ? 'nav-selected' : 'nav-unselected'}
          onClick={() => this.changeView('birdingCheckList')}>
          __Birding Checklist
        </span>
        <span
          className={view === 'userProfile' ? 'nav-selected' : 'nav-unselected'}
          onClick={() => this.changeView('userProfile')}>
          __User Profile
        </span>
      </div>
      <div className='main'>{this.renderView()}</div>
    </div>
    );
  }
}

// Export Component
export default App;