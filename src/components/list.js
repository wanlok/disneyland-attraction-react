import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { getAttractions, getAttractionsByLocations } from '../actions/attractionAction';
import logo from '../logo.webp';

class App extends Component {

  componentDidMount() {
    var params = queryString.parse(this.props.location.search);
    if (params.area === 'true') {
      this.props.getAttractionsByLocations();
    } else {
      this.props.getAttractions();
    }
  }

  parseOperatingHours(attraction) {
    var operatingHours = null;
    const { start_hour, end_hour } = attraction;
    if (start_hour != null && start_hour.length === 4 && end_hour != null && end_hour.length === 4) {
      var startHour = start_hour.substring(0, 2) + ':' + start_hour.substring(2, 4) ;
      var endHour = end_hour.substring(0, 2) + ':' + end_hour.substring(2, 4);
      operatingHours = startHour + ' - ' + endHour;
    }
    return operatingHours;
  }

  parseAttraction(attraction, i, params) {
    return <a className={'attraction'} key={i} href={`/${attraction.attraction_id}${params}`}>
      <span className={attraction.availability === 'Y' ? 'availability-available' : 'availability-not-available'} />
      <span className={'image'} style={{backgroundImage: 'url(' + attraction.image_url +')'}} />
      <span>
        <span className={'name'}>{attraction.name}</span>
        <span className={'description'}>{attraction.description}</span>
        <span className={'height'}>
          <span>Height Requirements</span>
          <span className={attraction.height != null ? 'height-available' : 'height-not-available'}>
            {attraction.height == null ? 'Not Available' : attraction.height}
          </span>
        </span>
        <span className={'operating-hours'}>
          <span>Operating Hours</span>
          <span>{this.parseOperatingHours(attraction)}</span>
        </span>
      </span>
    </a>
  }

  parseAttractionsByLocations() {
    const { attractionReducer } = this.props;
    const { attractionsByLocations } = attractionReducer;
    return (
      <div>
        <a className={'button'} href={"/"}>List All Attractions</a>
        <a className={'button left-spacing active'} href={"/?area=true"}>List All Attractions By Areas</a>
        <a className={'right button'} href={"/create"}>Create Attraction</a>
        { attractionReducer.isLoading ? <div>Loading...</div> :
          attractionsByLocations.map((location, i) => {
            if (location.attractions.length > 0) {
              return <div key={i}>
                <div className={'location'}>{location.location_name}</div>
                <div>
                  {location.attractions.map((attraction, j) => {
                    return this.parseAttraction(attraction, j, "?area=true");
                  })}
                </div>
              </div>
            } else {
              return <Fragment key={i} />
            }
          })
        }
      </div>
    )
  }

  parseAttractions() {
    const { attractionReducer } = this.props;
    const { attractions } = attractionReducer;
    return (
      <div>
        <a className={'button active'} href={"/"}>List All Attractions</a>
        <a className={'button left-spacing'} href={"/?area=true"}>List All Attractions By Areas</a>
        <a className={'right button'} href={"/create"}>Create Attraction</a>
        { attractionReducer.isLoading ? <div>Loading...</div> :
          attractions.map((attraction, i) => {
            return this.parseAttraction(attraction, i, "");
          })
        }
      </div>
    )
  }

  render() {
    var params = queryString.parse(this.props.location.search);
    return (
      <div className="container">
        <a href="/">
          <img className='logo' src={logo} alt="logo" />
        </a>
        {
          params.area === 'true' ? this.parseAttractionsByLocations() : this.parseAttractions()
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    attractionReducer: state.attractionReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAttractions: () => {
      dispatch(getAttractions());
    },
    getAttractionsByLocations: () => {
      dispatch(getAttractionsByLocations());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);