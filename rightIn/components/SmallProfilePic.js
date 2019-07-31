import React, { Component } from 'react';
import { Input, Button, Card, Avatar, Overlay, Badge } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, View, Text, TouchableHighlight, Image } from 'react-native';

class SmallProfilePic extends Component {

    render() {
        return(
            <View style={styles.participants}>
                <Icon
                    name='users'
                    size={18}
                    style={{ color: 'tomato' }}
                ></Icon>
                <Badge
                    value={this.props.participants.length}
                    containerStyle={{ position: 'absolute', top: 3, left: 18 }}
                >
                </Badge>

            </View>

        );
    }


}

const styles = StyleSheet.create({
    participants: {
        position: 'absolute',
        // // marginRight: -10,
        // marginLeft: 130
        top: 27,
        right: 15
    },
})

export default SmallProfilePic;