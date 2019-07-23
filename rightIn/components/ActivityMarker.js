import React, { Component } from 'react';
import MapView, { CalloutSubview, Marker, Callout } from 'react-native-maps'
//import { Marker, Callout } from 'react-native-maps';
import { StyleSheet, View, Text, TouchableHighlight, Button, Image } from 'react-native';
//import climb from '../assets/climb';



class ActivityMarker extends Component {

    state = {
        isClicked: false
    }

    handlePress = () => {
        // this.setState({
        //     isClicked: !this.state.isClicked
        // })
        console.log('clicked')
    }

    render() {

        return(
            <Marker
                coordinate={this.props.coordinate}
                
            >
                <Callout onPress={this.handlePress}>
                    <View style={{ flexDirection: 'row'}}>
                        <Image
                            source={{ uri: 'https://images.pexels.com/photos/2662123/pexels-photo-2662123.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' }}
                            style={{ width: 40, height: 40, borderRadius: 20 }}
                        />
                        <Text style={{ paddingLeft: 10, paddingTop: 10}}>DanyChamp</Text>
                    </View>
                    
                    <Text>{this.props.activity.description}</Text>
                    <CalloutSubview>
                        <TouchableHighlight>
                            <Button title={'Join'} onPress={this.handlePress} ></Button>
                        </TouchableHighlight>
                    </CalloutSubview>
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
    }
})

export default ActivityMarker;