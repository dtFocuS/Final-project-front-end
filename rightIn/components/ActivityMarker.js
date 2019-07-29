import React, { Component } from 'react';
import MapView, { CalloutSubview, Marker, Callout } from 'react-native-maps'
//import { Marker, Callout } from 'react-native-maps';
import { StyleSheet, View, Text, TouchableHighlight, Image } from 'react-native';
import { Input, Button, Card, Avatar, Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconBadge from 'react-native-icon-badge';
import OthersActivityDetail from './OthersActivityDetail';
//import climb from '../assets/climb';

const NGROK_URL = "http://3d4aa7dd.ngrok.io";
const URL = 'http://localhost:3000';

class ActivityMarker extends Component {

    state = {
        isClicked: false,
        joined: false,
        user: null,
        verified: null,
        isVisible: false
    }

    handlePress = () => {
        this.setState({
            joined: true
        })
        this.props.handleJoin(this.props.activity);
    }

    componentDidMount() {
        this.loadOwner();
    }

    loadOwner = () => {
        fetch(NGROK_URL + '/api/v1/users/' + this.props.activity.user_id)
        .then(resp => resp.json())
        .then(user => {
            this.setState({
                user: user
            })
        })
    }

    handleOverlay = () => {
        this.setState({
            isVisible: true
        })
    }

    // checkVerified = () => {
    //     this.setState({
    //         verified: this.state.user.user.verified
    //     })
    // }

    render() {
        const verified_icon = 'https://www.pinclipart.com/picdir/middle/59-595548_1495368559287-copy-instagram-verified-badge-png-clipart.png';
        
        //const { otherUsers, activity } = this.props
        // let otherUser = null
        // if (this.props.otherUsers) {
        //     otherUser = this.props.otherUsers.filter(user => user.id === this.props.activity.user_id)
        // }
        

        return(
            <View>
                <Marker
                    coordinate={this.props.coordinate}
                    pinColor={this.state.joined ? 'blue' : "red"}
                >
                    <Callout onPress={this.handleOverlay}>
                        <View style={{ flexDirection: 'row' }}>
                            <View>
                                {
                                    this.state.user ?
                                        <Image
                                            source={{ uri: this.state.user.user.image }}
                                            style={styles.image}
                                        />
                                        :
                                        <Image
                                            source={{ uri: 'https://images.pexels.com/photos/2670269/pexels-photo-2670269.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' }}
                                            style={styles.image}
                                        />
                                }
                                {/* {
                                this.state.verified?
                                    <Image
                                        source={{ uri: verified_icon }}
                                        style={{ width: 20, height: 20, borderRadius: 10, position: 'absolute', bottom: -5, right: -5 }}
                                    />
                                    : null
                            } */}

                            </View>
                            {
                                this.state.user ?
                                    <Text style={{ paddingLeft: 10, paddingTop: 10 }}>{this.state.user.user.username}</Text>
                                    : <Text style={{ paddingLeft: 10, paddingTop: 10 }}>Hello</Text>
                            }

                        </View>

                        <Text style={{ paddingTop: 10 }}>{this.props.activity.description}</Text>
                        {
                            this.state.joined ? null :
                                <CalloutSubview>
                                    <Button
                                        type='clear'
                                        title={'rightIn'}
                                        onPress={this.handlePress}
                                        titleStyle={{ fontFamily: 'Lobster', fontWeight: 'bold' }}
                                        buttonStyle={{ width: 66, marginLeft: 'auto', marginRight: 'auto', height: 40 }}
                                    ></Button>
                                </CalloutSubview>
                        }

                    </Callout>

                    {/* <View style={styles.marker}>
                    <Text>{this.props.activity.name}</Text>
                </View> */}
                </Marker>
                <Overlay
                    isVisible={this.state.isVisible}
                    onBackdropPress={() => this.setState({ isVisible: false })}
                >
                    <OthersActivityDetail user={this.state.user} activity={this.props.activity} />
                    
                </Overlay>

            </View>
            

        );
    }


}

const styles = StyleSheet.create({

    marker: {
        backgroundColor: "pink",
        //padding: 5,
        borderRadius: 5
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 40 / 2,
        borderWidth: 2,
        borderColor: "gray"
    }
})

export default ActivityMarker;