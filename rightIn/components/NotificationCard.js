import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableHighlight, Image } from 'react-native';
import { Input, Button, Card, Avatar } from 'react-native-elements';


class NotificationCard extends Component {

    

    render(){
        const verified_icon = 'https://www.pinclipart.com/picdir/middle/59-595548_1495368559287-copy-instagram-verified-badge-png-clipart.png';
        const user = this.props.otherUsers.filter(user => user.id === this.props.notification.user_id)
        const activity = this.props.allActivities.filter(activity => activity.id === this.props.notification.activity_id)
        return(
            <View style={ {flex: 1}}>
                <Card
                    title={activity[0].name}
                    titleStyle={{fontFamily: "Acme"}}
                >
                    <View>
                        <Avatar
                            rounded
                            size='medium'
                            source={{ uri: user[0].image }}
                        ></Avatar>
                        {
                            user[0].verified ? <Image
                                source={{ uri: verified_icon }}
                                style={styles.verified}
                            /> : null
                        }
                        
                        <Text style={styles.sentence}>{user[0].username} is interested in joining!</Text>
                    </View>
                    
                    

                </Card>
            </View>

        );
    }

}

const styles = StyleSheet.create({
    sentence: {
        position: 'absolute',
        //fontWeight: 'bold',
        marginLeft: 60, 
        marginTop: 20
    },
    verified: {
        width: 20, 
        height: 20, 
        borderRadius: 10, 
        position: 'absolute', 
        marginTop: 35, 
        marginLeft: 30
    }
})

export default NotificationCard;