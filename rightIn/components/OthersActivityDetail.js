import React, { Component } from 'react';
import { Input, Card, Button, Avatar, Overlay, Badge } from 'react-native-elements';
import { StyleSheet, View, Text, TouchableHighlight, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconBadge from 'react-native-icon-badge';
import { Toast } from 'native-base';


class OthersActivityDetail extends Component {

    

    // handleJoin = () => {
    //     this.props.handleClose();
    //     this.props.handleJoin(this.props.activity)
    // }

    // handleDelete = () => {
    //     this.props.handleClose();
    //     this.props.handleUnJoin(this.props.activity)

    // }


    render() {
        // const { handleClose, handleJoin } = this.props;
        const handleJoin = () => {
            this.props.handleClose();
            this.props.handleJoin(this.props.activity)
        }

        const handleDelete = () => {
            this.props.handleClose();
            this.props.handleUnJoin(this.props.activity)

        }
        return(

            <View>
                <Card
                    title={this.props.user.user.username}
                    image={ {uri: this.props.user.user.image } }
                >
                    <View style={styles.participants}>
                        <Icon
                            name='users'
                            size={25}
                            style={{ color: 'tomato'}}
                        ></Icon>
                        <Badge
                            value={this.props.participants.length}
                            containerStyle={{ position: 'absolute', top: 3, left: 18}}
                        >
                        </Badge>

                    </View>

                    
                    
                    <Text style={styles.title}>
                        {this.props.activity.name}
                    </Text>
                    <Text style={{ paddingTop: 10, marginLeft: 'auto', marginRight: 'auto' }}>{this.props.activity.address}</Text>
                    <Text style={styles.description}>
                        {this.props.activity.description}
                    </Text>
                    

                </Card>
                {
                    this.props.joined? 
                        <Button
                            ackgroundColor='#03A9F4'
                            buttonStyle={styles.button}
                            titleStyle={{ fontFamily: 'Lobster' }}
                            onPress={handleDelete}
                            title="rightOut"
                        />

                    :
                        <Button
                            // icon={<Icon name='code' color='#ffffff' />}
                            ackgroundColor='#03A9F4'
                            buttonStyle={styles.button}
                            titleStyle={{ fontFamily: 'Lobster' }}
                            onPress={handleJoin}
                            title='rightIn' />
                }
                
            </View>

        );
    }


}

const styles = StyleSheet.create({
    button: {
        borderRadius: 80,
        //backgroundColor: 'tomato',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        width: 180,
        alignSelf: 'center',
        marginTop: 20
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20
    },
    participants: {
        position: 'absolute',
        right: 10,
        top: 5
    },
    description: {
        top: 10,
        marginLeft: 'auto', 
        marginRight: 'auto'
    }
})

export default OthersActivityDetail;