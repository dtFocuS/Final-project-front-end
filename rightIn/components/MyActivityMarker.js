import React, { Component } from 'react';
import MapView, { CalloutSubview, Marker, Callout } from 'react-native-maps'
//import { Marker, Callout } from 'react-native-maps';
import { StyleSheet, View, Text, TouchableHighlight, Image } from 'react-native';
import { Input, Button, Card, Avatar, Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconBadge from 'react-native-icon-badge';
import EditActivity from './EditActivity';
import ActivityDetail from './ActivityDetail';


class MyActivityMarker extends Component {
    state = {
        isClicked: false,
        isVisible: false,
        clickDelete: false,
        clickEdit: false
    }

    // handlePress = () => {
    //     this.setState({
    //         isVisible: true
    //     })
    //     // this.props.handleDelete(this.props.activity);

    // }

    handleOverlay = () => {
        this.setState({
            isVisible: true
        }, () => {console.log(this.state.isVisible)})
    }

    render() {
        //const verified_icon = 'https://www.pinclipart.com/picdir/middle/59-595548_1495368559287-copy-instagram-verified-badge-png-clipart.png';
        //const otherUser = this.props.otherUsers.filter(user => user.id === this.props.activity.user_id)
        const { user, activity } = this.props

        return (
            <View>
                <Marker
                    coordinate={this.props.coordinate}
                    pinColor={'#7332a8'}
                >
                    <Callout onPress={this.handleOverlay}>
                        <View style={{ flexDirection: 'row' }}>
                            <View>
                                <Image
                                    source={{ uri: user.image }}
                                    style={styles.image}
                                />
                                {/* {
                                    user.verified ?
                                        <Image
                                            source={{ uri: verified_icon }}
                                            style={{ width: 20, height: 20, borderRadius: 10, position: 'absolute', bottom: -5, right: -5 }}
                                        />
                                        : null
                                } */}

                            </View>
                            <Text style={{ paddingLeft: 10, paddingTop: 10 }}>{user.username}</Text>
                        </View>

                        <Text style={{ paddingTop: 10 }}>{this.props.activity.description}</Text>
                        {/* <CalloutSubview onPress={this.handleOverlay}>
                            <TouchableHighlight onPress={this.handleOverlay}>
                                <Button
                                    type='clear'
                                    title={'View Details'}
                                    onPress={this.handleOverlay}
                                    // buttonStyle={{ backgroundColor: 'blue'}}
                                    titleStyle={{ fontFamily: 'Lobster', fontWeight: 'bold' }}
                                ></Button>
                            </TouchableHighlight>
                        </CalloutSubview> */}
                        <TouchableHighlight onPress={this.handleOverlay}>
                            <Button
                                type='clear'
                                title={'View Details'}
                                onPress={this.handleOverlay}
                                // buttonStyle={{ backgroundColor: 'blue'}}
                                titleStyle={{ fontFamily: 'Lobster', fontWeight: 'bold' }}
                            ></Button>
                        </TouchableHighlight>
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
                    <ActivityDetail user={user} activity={activity} />
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



export default MyActivityMarker;