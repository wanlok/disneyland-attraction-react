import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import queryString from 'query-string';
import { error_attraction, get_attraction, getAttraction, createAttraction, updateAttraction, deleteAttraction } from '../actions/attractionAction';
import { getLocations } from '../actions/locationAction';
import logo from '../logo.webp';

class Maintain extends Component {

  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.getAttraction(this.props.match.params.id);
    }
    this.props.getLocations();
  }

  isValidTime(time) {
    var valid = true;
    if (time == null || time.length !== 4) {
      valid = false;
    } else {
      if (/^\d+$/.test(time)) {
        var i = parseInt(time);
        if (i < 0 || i > 2359) {
          valid = false;
        }
      } else {
        valid = false;
      }
    }
    if (!valid) {
      console.log('time not ok');
    }
    return valid;
  }

  validate(attraction) {
    var valid = true;

    if (attraction.name == null || attraction.name.length === 0) {
      console.log('name not ok');
      valid = false;
    }

    if (attraction.description == null || attraction.description.length === 0) {
      console.log('description not ok');
      valid = false;
    }

    valid = this.isValidTime(attraction.start_hour);
    valid = this.isValidTime(attraction.end_hour);

    if (valid && parseInt(attraction.start_hour) >= parseInt(attraction.end_hour)) {
      valid = false;
    }

    if (attraction.availability == null || (attraction.availability !== 'Y' && attraction.availability !== 'N')) {
      console.log('availability not ok');
      valid = false;
    }

    if (attraction.location_id == null) {
      console.log('location_id not ok');
      valid = false;
    }

    return valid;
  }

  handleNameChange(e) {
    const { attraction } = this.props.attractionReducer;
    attraction.name = e.target.value;
    this.props.change(attraction);
  }

  handleDescriptionChange(e) {
    const { attraction } = this.props.attractionReducer;
    attraction.description = e.target.value;
    this.props.change(attraction);
  }

  handleHeightChange(e) {
    const { attraction } = this.props.attractionReducer;
    attraction.height = e.target.value;
    this.props.change(attraction);
  }

  handleStartHourChange(e) {
    const { attraction } = this.props.attractionReducer;
    attraction.start_hour = e.target.value;
    this.props.change(attraction);
  }

  handleEndHourChange(e) {
    const { attraction } = this.props.attractionReducer;
    attraction.end_hour = e.target.value;
    this.props.change(attraction);
  }

  handleAvailabilityChange(e) {
    const { attraction } = this.props.attractionReducer;
    attraction.availability = e.target.value;
    this.props.change(attraction);
  }
  
  handleLocationChange(e) {
    const { attraction } = this.props.attractionReducer;
    attraction.location_id = parseInt(e.target.value);
    this.props.change(attraction);
  }

  handleSubmit(e) {
    const { attraction } = this.props.attractionReducer;
    const { locations } = this.props.locationReducer;
    const { error } = this.props;

    error(false);

    if (attraction.location_id == null && locations.length > 0) {
      attraction.location_id = locations[0].location_id;
      this.props.change(attraction);
    }

    var attractionDTO = {
      name: attraction.name,
      description: attraction.description,
      height: attraction.height != null && attraction.height.length > 0 ? attraction.height : null,
      start_hour: attraction.start_hour,
      end_hour: attraction.end_hour,
      availability: attraction.availability,
      location_id: attraction.location_id
    }

    if (this.validate(attractionDTO)) {
      if (attraction.hasOwnProperty("attraction_id")) {
        attractionDTO.attraction_id = attraction.attraction_id;
        this.props.modify(attractionDTO, this.imageRef);
      } else {
        this.props.create(attractionDTO, this.imageRef);
      }
    } else {
      error(true);
    }
  }

  handleDelete(e) {
    const { attraction } = this.props.attractionReducer;
    if (attraction.hasOwnProperty("attraction_id")) {
      this.props.remove(attraction);      
    }
  }
  
  render() {
    const { attractionReducer, locationReducer } = this.props;
    const { attraction } = attractionReducer;
    const { locations } = locationReducer;
    if (attractionReducer.isLoading || locationReducer.isLoading) {
      return <div>Loading...</div>
    } else if (!this.props.uiReducer.isBack) {
      return (
        <div className="container">
          <a href="/">
            <img className='logo' src={logo} alt="logo" />
          </a>
          <h1>{ this.props.match.params.id ? 'Maintain' : 'Create' } Attraction</h1>
          <form>
            <table>
              <tbody>
                { 
                  attractionReducer.isError &&
                  <tr className={'error'}>
                    <td colSpan="2">
                      Error. Please check
                    </td>
                  </tr>
                }
                <tr>
                  <td>Name *</td>
                  <td><input type="text" value={attraction.name || ''} onChange={this.handleNameChange.bind(this)} /></td>
                </tr>
                <tr>
                  <td>Description *</td>
                  <td><input type="text" value={attraction.description || ''} onChange={this.handleDescriptionChange.bind(this)} /></td>
                </tr>
                <tr>
                  <td>Height</td>
                  <td><input type="text" value={attraction.height || ''} onChange={this.handleHeightChange.bind(this)} /></td>
                </tr>
                <tr>
                  <td>Start Hour *</td>
                  <td>
                    <input type="text" value={attraction.start_hour || ''} onChange={this.handleStartHourChange.bind(this)} maxLength="4" />
                    <span className={'format'}>Format: HHMM</span>
                  </td>
                </tr>
                <tr>
                  <td>End Hour *</td>
                  <td>
                    <input type="text" value={attraction.end_hour || ''} onChange={this.handleEndHourChange.bind(this)} maxLength="4" />
                    <span className={'format'}>Format: HHMM</span>
                  </td>
                </tr>
                <tr>
                  <td>Availability *</td>
                  <td>
                    <input type="radio" name="availability" value="Y" checked={attraction.availability === 'Y'} onChange={this.handleAvailabilityChange.bind(this)} /> Yes
                    <input type="radio" name="availability" value="N" checked={attraction.availability === 'N'} onChange={this.handleAvailabilityChange.bind(this)} /> No
                  </td>
                </tr>
                <tr>
                  <td>Area *</td>
                  <td>
                    <select value={attraction.location_id} onChange={this.handleLocationChange.bind(this)}>
                      {
                        locations.map((location, i) => {
                          return <option value={location.location_id} key={i}>{location.name}</option>
                        })
                      }
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>Image</td>
                  <td>
                    <img src={attraction.image_url} alt="" />
                    <input type="file" ref={(ref)=>{this.imageRef = ref;}} />
                  </td>
                </tr>
                <tr>
                  <td colSpan="2" className={'control'}>
                    <input type="button" className={'button'} value="Submit" onClick={this.handleSubmit.bind(this)} />
                    {
                      this.props.match.params.id && <input type="button" className={'button left-spacing'} value="Delete" onClick={this.handleDelete.bind(this)} />
                    }
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      )
    } else {
      var params = queryString.parse(this.props.location.search);
      return <Redirect to={params.area === 'true' ? '/?area=true' : ''} />
    }
  }
}

const mapStateToProps = state => {
  return {
    uiReducer: state.uiReducer,
    attractionReducer: state.attractionReducer,
    locationReducer: state.locationReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    create: (attraction, imageRef) => {
      dispatch(createAttraction(attraction, imageRef));
    },
    modify: (attraction, imageRef) => {
      dispatch(updateAttraction(attraction, imageRef));
    },
    getAttraction: (attractionId) => {
      dispatch(getAttraction(attractionId));
    },
    remove: (attraction) => {
      dispatch(deleteAttraction(attraction));
    },
    change: (attraction) => {
      dispatch(get_attraction(attraction));
    },
    error: (status) => {
      dispatch(error_attraction(status));
    },
    getLocations: () => {
      dispatch(getLocations());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Maintain);