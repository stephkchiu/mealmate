import React from 'react';
import SlideShow from '../components/Slideshow.jsx'
import HomeContainer from './HomeContainer.jsx'
import DonorMainPage from './DonorMainPage.jsx'
import ReceiverContainer from './ReceiverContainer.jsx';


class MainContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            //user states
            password : '',
            userType : '',
            userId : '',
            errorMessage : '',
            userOrganization: '',
            isLoggedInAsDonor: false,
            isLoggedInAsReceiver: false,
            //donor states
            newUserId : '',
            newPassword : '',
            newUserPhoneNumber: '',
            newUserOrganization: '',
            newUserAddress: '',
        }
        this.setSignupId = this.setSignupId.bind(this)
        this.setSignupPassword  = this.setSignupPassword.bind(this)
        this.setPhoneNumber = this.setPhoneNumber.bind(this)
        this.setSignupOrganization = this.setSignupOrganization.bind(this)
        this.setAddress = this.setAddress.bind(this)
        this.receiverSignupSubmit = this.receiverSignupSubmit.bind(this)
        this.donorSignupSubmit = this.donorSignupSubmit.bind(this)
        this.loginSubmit = this.loginSubmit.bind(this)
    }

    setSignupId(event) {
        this.setState({userId:event.target.value, newUserId:event.target.value})
    }
    setSignupPassword(event) {
        this.setState({password:event.target.value, newPassword:event.target.value})
    }
    setPhoneNumber(event) {
        this.setState({newUserPhoneNumber:event.target.value})
    }
    setSignupOrganization(event) {
        this.setState({newUserOrganization:event.target.value})
    }
    setAddress(event) {
        this.setState({newUserAddress:event.target.value})
    }
    receiverSignupSubmit() {
        console.log('receiverSignup works')
        const body = {
            newUserId : this.state.newUserId,
            newPassword : this.state.newPassword,
            newUserPhoneNumber : this.state.newUserPhoneNumber
        }
        fetch('/db/receiverSignUp', {
            method: 'POST', 
            body: JSON.stringify(body), 
            headers : {'Content-Type': 'application/json'}
        })
        .then(data => data.json())
        .then(result => {
            if (result === 'Receiver Created') {
                this.setState({userId:this.state.newUserId, isLoggedInAsReceiver:true})
            }
        })
        .catch(err => {
            console.log(err)
            this.setState({errorMessage: JSON.stringify(err)})
        })
    }
    donorSignupSubmit() {
        const body = {
            newUserId : this.state.newUserId,
            newPassword : this.state.newPassword,
            newUserPhoneNumber : this.state.newUserPhoneNumber,
            newUserOrganization : this.state.newUserOrganization,
            newUserAddress : this.state.newUserAddress
        }
        console.log('body11 in signupsubmti for donor', body)
        fetch('/db/donorSignUp', {
            method: 'POST', 
            body: JSON.stringify(body), 
            headers : {'Content-Type': 'application/json'}
        })
        .then(data => data.json())
        .then(result => {
           if (result === 'Donor Created') {
               this.setState({isLoggedInAsDonor:true, userId:this.state.newUserId, userOrganization:this.state.newUserOrganization})
           }
        })
        .catch(err => {
            console.log(err)
            this.setState({errorMessage: `${JSON.stringify(err)}`})
        })
    }
    loginSubmit() {
        const body = {
            userId : this.state.userId,
            password : this.state.password
        }
        console.log('body for loginsubmit', body)
        fetch('/db/userLogin', {
            method: 'POST', 
            body: JSON.stringify(body), 
            headers : {'Content-Type': 'application/json'}
        })
        .then(data => data.json())
        .then(result => {         
            console.log('result in loginSubmit =>', result)
            if (Object.keys(result).length === 3) {
                console.log('user is reciever')
                this.setState({isLoggedInAsReceiver:true, userId:result.username})
            } else {
                this.setState({isLoggedInAsDonor:true, userId:result.username, userOrganization:result.name})
            }

        })
        .catch(err => {
            console.log(err)
            this.setState({errorMessage: `${JSON.stringify(err)}`})
        })
    }

    render() {
        let mainRendered;
        if (this.state.isLoggedInAsDonor) {
            mainRendered = 
                <div id='donor-main-page'>
                    <DonorMainPage userId={this.state.userId} errorMessage={this.state.errorMessage} userOrganization={this.state.userOrganization}/>
                </div>

        } else if (this.state.isLoggedInAsReceiver) {
            mainRendered = 
                    <ReceiverContainer userId={this.state.userId} errorMessage={this.state.errorMessage}/>
        } else {
            mainRendered =
                <div>
                    <SlideShow/>
                    <HomeContainer 
                    password={this.state.password} userType={this.state.userType} userId={this.state.userId}
                    isLoggedInAsDonor={this.state.isLoggedInAsDonor} isLoggedInAsReceiver={this.state.isLoggedInAsReceiver}
                    newUserId={this.state.newUserId} newPassword={this.state.newPassword} errorMessage={this.state.errorMessage}
                    newUserPhoneNumber={this.state.newUserPhoneNumber} newUserOrganization={this.state.newUserOrganization} 
                    newUserAddress={this.state.newUserAddress} setSignupId={this.setSignupId} setSignupPassword={this.setSignupPassword}
                    setPhoneNumber={this.setPhoneNumber} setSignupOrganization={this.setSignupOrganization} 
                    setAddress={this.setAddress} receiverSignupSubmit={this.receiverSignupSubmit}
                    donorSignupSubmit={this.donorSignupSubmit}
                    loginSubmit={this.loginSubmit}
                    />
                </div>
        }
        return(
            <div>
                {mainRendered}
            </div>
        )
    }
}
    //donor states
export default MainContainer;