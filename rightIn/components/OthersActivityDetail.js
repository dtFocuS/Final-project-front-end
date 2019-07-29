import React, { Component } from 'react';
import { Input, Button, Card, Avatar, Overlay, Badge } from 'react-native-elements';
import { StyleSheet, View, Text, TouchableHighlight, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconBadge from 'react-native-icon-badge';


class OthersActivityDetail extends Component {

    render() {
        return(

            <View>
                <Card
                    title={this.props.activity.name}
                >
                    <Text>
                        {this.props.activity.description}
                    </Text>

                </Card>

            </View>

        );
    }


}

export default OthersActivityDetail;