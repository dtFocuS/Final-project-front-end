import React, { Component } from 'react';
import { Marker, Callout } from 'react-native-maps';
import { StyleSheet, View, Text, TouchableHighlight, Button } from 'react-native';



class ActivityMarker extends Component {

    handlePress = () => {
        console.log('clicked')
    }

    render() {

        return(
            <Marker
                coordinate={this.props.coordinate}
            >
                <Callout>
                    <TouchableHighlight onPress={this.handlePress}>
                        <View>
                            <Text>{this.props.activity.description}</Text>
                            <Button title={'hello'} onPress={this.handlePress} ></Button>
                        </View>

                    </TouchableHighlight>
                    
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