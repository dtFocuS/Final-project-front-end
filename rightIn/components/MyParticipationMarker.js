import React, { Component } from 'react';
import MapView, { CalloutSubview, Marker, Callout } from 'react-native-maps'
//import { Marker, Callout } from 'react-native-maps';
import { StyleSheet, View, Text, TouchableHighlight, Image } from 'react-native';
import { Input, Button, Card, Avatar, Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconBadge from 'react-native-icon-badge';
import SmallProfilePic from './SmallProfilePic';
import OthersActivityDetail from './OthersActivityDetail';

const NGROK_URL = "http://04c049da.ngrok.io";
const URL = 'http://localhost:3000';

class MyParticipationMarker extends Component {

    state = {
        otherUser: null,
        selectedParticipants: [],
        isVisible: false
    }

    loadUser = () => {
        fetch(NGROK_URL + "/api/v1/users/" + this.props.otherUserId)
        .then(resp => resp.json())
        .then(json => {
            this.setState({
                otherUser: json
            })
        })
    }

    componentDidMount() {
        this.loadUser();
        this.loadParticipants()
    }
    
    loadParticipants = () => {
        fetch(NGROK_URL + '/api/v1/participants/' + this.props.activity.id)
        .then(resp => resp.json())
        .then(json => {
            this.setState({
                selectedParticipants: json
            })

        })
    }

    handlePress = () => {
        this.setState({
            isVisible: true
        })
    }

    render() {
        const verified_icon = 'https://www.pinclipart.com/picdir/middle/59-595548_1495368559287-copy-instagram-verified-badge-png-clipart.png';
        //const { otherUsers, activity } = this.props
        // let otherUser = null
        // if (this.props.otherUsers) {
        //     otherUser = this.props.otherUsers.filter(user => user.id === this.props.activity.user_id)
        // }


        return (
            <View>
                <Marker
                    coordinate={this.props.coordinate}
                    pinColor={'blue'}
                >
                    <Callout onPress={this.handlePress}>
                        <View style={{ width: 165 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View>
                                    {
                                        this.state.otherUser ?
                                            <Image
                                                source={{ uri: this.state.otherUser.user.image }}
                                                style={styles.image}
                                            />
                                            :
                                            <Image
                                                source={{ uri: 'https://images.pexels.com/photos/2670269/pexels-photo-2670269.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' }}
                                                style={styles.image}
                                            />
                                    }
                                    {/* {
                                this.props.user.verified ?
                                    <Image
                                        source={{ uri: verified_icon }}
                                        style={{ width: 20, height: 20, borderRadius: 10, position: 'absolute', bottom: -5, right: -5 }}
                                    />
                                    : null
                            } */}

                                </View>
                                {
                                    this.state.otherUser ?
                                        <Text style={{ paddingLeft: 10, paddingTop: 10, fontWeight: 'bold' }}>{this.state.otherUser.user.username}</Text>
                                        : <Text style={{ paddingLeft: 10, paddingTop: 10 }}>Hello</Text>
                                }

                            </View>
                            <SmallProfilePic participants={this.state.selectedParticipants} />

                            <Text style={{ paddingTop: 10, marginLeft: 'auto', marginRight: 'auto' }}>{this.props.activity.description}</Text>
                            <Button
                                type='clear'
                                title={'View Details'}
                                // buttonStyle={{ backgroundColor: 'blue'}}
                                titleStyle={{ fontFamily: 'Lobster', fontWeight: 'bold' }}
                            ></Button>


                        </View>



                    </Callout>
                    

                    {/* <View style={styles.marker}>
                    <Text>{this.props.activity.name}</Text>
                </View> */}
                </Marker>
                <Overlay
                    isVisible={this.state.isVisible}
                    onBackdropPress={() => this.setState({ isVisible: false })}
                >
                    {

                    }
                    <OthersActivityDetail user={this.state.otherUser} activity={this.props.activity} participants={this.state.selectedParticipants} joined={true} />
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

export default MyParticipationMarker;