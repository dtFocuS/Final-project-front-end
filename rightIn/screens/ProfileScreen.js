import React, { Component } from 'react';
import MapView, { CalloutSubview, Marker, Callout } from 'react-native-maps'
//import { Marker, Callout } from 'react-native-maps';
import { StyleSheet, View, Text, TouchableHighlight, Image, AsyncStorage, ScrollView } from 'react-native';
import { Input, Button, Card, Avatar, Overlay, Badge, ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconBadge from 'react-native-icon-badge';
import { withNavigation } from 'react-navigation';
import CustomHeader from '../components/CustomHeader'
//import { ListItem } from 'native-base';


class ProfileScreen extends Component {
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => {
            return <Icon name={'user'} size={40} style={{ color: tintColor }} />

        }
    }

    // logout = () => {
    //     //this.clearToken();
    //     this.props.navigation.navigate('Welcome')
    // }

    clearToken = async () => {
        try {
            await AsyncStorage.clear();
            this.props.navigation.navigate('Welcome')
            
        } catch (error) {
            console.log(error.message)
        }
    };

    // _signOutAsync = async () => {
    //     await AsyncStorage.clear();
    //     this.props.navigation.navigate('Welcome');
    // };


    render() {
        //const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <CustomHeader tab={'Profile'} user={this.props.screenProps.user} />
                <ScrollView >

                    <View style={{ flex: 1 }} >
                        <Avatar
                            containerStyle={{ marginLeft: 'auto', marginRight: 'auto', marginTop: 10 }}
                            showEditButton
                            rounded
                            size={150}
                            source={{ uri: this.props.screenProps.user.image }}
                        />
                        <Card
                            title={this.props.screenProps.user.username}
                        >
                            <Text style={styles.text}>{this.props.screenProps.address}</Text>

                        </Card>
                        <Card
                            title="My Activities"
                        >
                            {
                                this.props.screenProps.myActivities.map(activity => {
                                    return (
                                        <ListItem
                                            key={activity.id}
                                            title={activity.name}

                                        />
                                    )
                                })
                            }

                        </Card>
                        <Card
                            title="Joined Activities"
                        >
                            {
                                this.props.screenProps.joinedActivities.map(activity => {
                                    return (
                                        // <ListItem
                                        //     key={activity.id}
                                        //     title={activity.name}

                                        // />
                                        <View key={activity.id}>
                                            <Text>
                                                {activity.name}

                                            </Text>
                                            <Text>
                                                {activity.address}
                                            </Text>

                                        </View>
                                    )
                                })
                            }

                        </Card>
                        <Button
                            // containerStyle={styles.button}
                            title="Log out"
                            type='clear'
                            onPress={this.clearToken}
                            titleStyle={{ color: 'red' }} />


                    </View>
                </ScrollView>

            </View>
            
                

                
                

            
            
        )
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //alignItems: 'center',
        //justifyContent: 'center',
        //backgroundColor: '#ecf0f1',
    },
    input: {
        width: 200,
        height: 44,
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 10,
    },
    button: {
        position: 'absolute',
        marginRight: 'auto',
        marginLeft: 'auto',
        
    },
    text: {
        marginRight: 'auto',
        marginLeft: 'auto',
    }
});

export default withNavigation(ProfileScreen);