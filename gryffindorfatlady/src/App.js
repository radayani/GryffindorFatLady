import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Timer from 'react-timer-component';
import PropTypes from 'prop-types';
//import Delay from 'react-delay';
import Paper from 'material-ui/Paper';

const style = {
  width:"50%",
  marginTop: 105,
  marginLeft:15,
  marginRight:105,
  paddingLeft:20,
  paddingRight:20
};
const Message =() => {
	const {msg} = {
		msg:"Scan below to provide your valuable feedback for Garage. Dozing off in..."
		};
	return(
	<h1 style={{fontFamily:"Comic Sans Ms", fontSize:"55px"}}>{`${msg}`}</h1>
  );
	  }
          
const Countdown = (props, context) => {
  const d = new Date(context.remaining);
  const { seconds} = {
    seconds: d.getUTCSeconds(),
  };
  return (
    <h1 style={{fontFamily:"Comic Sans Ms", fontSize:"100px"}}>{`${seconds}`}</h1>
  );
};
 
Countdown.contextTypes = {
  remaining: PropTypes.number,
};
class App extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      snoringURL: 'http://fbcodes.com/animated-emoticons/yawning.mp4',
      yawningURL: 'yawning.mp4',
      heythereURL : 'hey-there-good-buddy.mp4',
      areyouthereURL :'hello-are-you-there.mp4',
      imhoURL : 'IMHO.mp4',
      inRange:null, 
      secondsElapsed:0, 
      firstBoringVideo:false, 
      firstChirpyHi:false,
      renderNextVideo : false
  }
  }

  tick() {
    this.setState({secondsElapsed: this.state.secondsElapsed + 1});
    fetch(`/checkFile`).then(res=> res.json()).then(inRange => this.setState({inRange}));
  }
  componentDidMount() {
    this.interval = setInterval(this.tick.bind(this), 1000);
  }
  componentWillUnmount() {  // unsubscribing the request
    clearInterval(this.interval);  
  }

  changeFirstBoringVideoToTrue(){
    this.setState({
      firstBoringVideo:true,
      firstChirpyHi:false
    })
  }

  changeFirstChirpyHiToTrue(){
    this.setState({
      firstChirpyHi:true,
      firstBoringVideo:false
    })
  }

  changeToFalse(){
    this.setState({
      firstChirpyHi:false,
      firstBoringVideo:false, 
      inRange:false
    })
  }

  render() {
    return (

      <div className="App" style={{backgroundColor: "#FCFCFC"}}>
       {!this.state.inRange && this.state.firstBoringVideo == false &&
        <div><MuiThemeProvider>
        <video id="background-video1" autoPlay width="70%" onEnded={this.changeFirstBoringVideoToTrue.bind(this)}  margin-left="0">
          <source src="http://localhost:3000/video?vidName=yawning" type="video/mp4" />
          Your Video content unavailable
          {/* {this.setState({firstBoringVideo:true})} */}
        </video>
        </MuiThemeProvider> 
        </div>
        }
        {!this.state.inRange && this.state.firstBoringVideo == true &&

        <div>
          <video id="background-video" autoPlay loop width="70%"  margin-left="0">
            <source src="http://localhost:3000/video?vidName=snoring" type="video/mp4" />
            Your Video content unavailable
          </video>
        </div>
        }
        {this.state.inRange && this.state.firstChirpyHi == false &&
          <div>
          <video id="background-video" autoPlay width="80%" onEnded={this.changeFirstChirpyHiToTrue.bind(this)} >
            <source src="http://localhost:3000/video?vidName=heytheregoodbuddy" type="video/mp4" />
            Your Video content unavailable
          </video>
          </div>
        }
        {this.state.inRange && this.state.firstChirpyHi == true &&
          <div style={{display:'flex'}}>
          <img src="writing.gif" width="50%" height="50%" align="left" />
          <br/>
          <MuiThemeProvider>
          <Paper style={style} zDepth={5} >
          <Message/>
            <Timer remaining={60000} afterComplete={this.changeToFalse.bind(this)}>
              <Countdown/>
            </Timer>
          <img src="qr.png" width="60%" height="70%" />
          </Paper>
          </MuiThemeProvider>
          </div>
        }
    </div>
    );
  }
}

export default App;
