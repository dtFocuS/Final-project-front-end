import React, { Component } from 'react';
import MapView, { CalloutSubview, Marker, Callout } from 'react-native-maps'
//import { Marker, Callout } from 'react-native-maps';
import { StyleSheet, View, Text, TouchableHighlight, Image } from 'react-native';
import { Input, Button, Card, Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconBadge from 'react-native-icon-badge';
import SmallProfilePic from './SmallProfilePic';

const NGROK_URL = "http://86d4632b.ngrok.io";
const URL = 'http://localhost:3000';

class MyParticipationMarker extends Component {

    state = {
        otherUser: null
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
    }
    

    render() {
        const verified_icon = 'https://www.pinclipart.com/picdir/middle/59-595548_1495368559287-copy-instagram-verified-badge-png-clipart.png';
        //const { otherUsers, activity } = this.props
        // let otherUser = null
        // if (this.props.otherUsers) {
        //     otherUser = this.props.otherUsers.filter(user => user.id === this.props.activity.user_id)
        // }


        return (
            <Marker
                coordinate={this.props.coordinate}
                pinColor={'blue'}
            >
                <Callout onPress={this.handlePress}>
                    <View style={ { width: 165} }>
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
                                    <Text style={{ paddingLeft: 10, paddingTop: 10 }}>{this.state.otherUser.user.username}</Text>
                                    : <Text style={{ paddingLeft: 10, paddingTop: 10 }}>Hello</Text>
                            }

                        </View>

                        <Text style={{ paddingTop: 10 }}>{this.props.activity.description}</Text>


                    </View>

                    

                </Callout>

                {/* <View style={styles.marker}>
                    <Text>{this.props.activity.name}</Text>
                </View> */}
            </Marker>

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