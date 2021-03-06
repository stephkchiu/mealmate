import React from 'react';
import Map from '../components/Map.jsx';
import ReceiverList from '../components/ReceiverList.jsx';

const ReceiverContainer = (props) => {
  return(
    <div id='receiver-container'>
      Hello {props.userId}
      <div id='receiver-components'>
        <Map/>
        <ReceiverList/>
      </div>
    </div>
  )
}

export default ReceiverContainer;