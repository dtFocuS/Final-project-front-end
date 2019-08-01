import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableHighlight, Image } from 'react-native';
import { Input, Button, Card, Avatar, Overlay, Badge } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconBadge from 'react-native-icon-badge';
import EditActivity from './EditActivity';
import { withNavigation } from 'react-navigation';
import { DrawerActions } from 'react-navigation';

import Modal from 'react-native-modal';





class ActivityDetial extends Component {

    
    state = {
        isVisible: false
    }

    handleEdit = () => {
        
        this.props.handleClose(); 
        this.props.handleModal(this.props.activity);
        // this.setState({
        //     isVisible:true
        // })
        // this.props.navigation.dispatch(DrawerActions.openDrawer());
        // this.props.navigation.openDrawer(this.props.activity)
        //this.props.navigation.navigate('DrawerOpen');
        
    }

    handleDelete = () => {
        this.props.handleClose();
        // this.props.deleteActivity(this.props.activity);
        this.props.handleDeletePrompt(this.props.activity);
        
    }

    render() {
        const { user, activity } = this.props;
        return(
            <View style={{ flex:1 }}>
                <View style={styles.container}>
                    <View style={styles.contentContainer}>
                        <Card title={activity.name}>
                            
                            <Text style={{ paddingTop: 10, marginLeft: 'auto', marginRight: 'auto' }}>{activity.address}</Text>
                            
                            <Text style={{ paddingTop: 10, marginLeft: 'auto', marginRight: 'auto', marginTop: 10}}>
                                {activity.description}
                            </Text>
                            

                        </Card>
                        <Button
                            // icon={<Icon name='code' color='#ffffff' />}
                            backgroundColor='#03A9F4'
                            buttonStyle={styles.button}
                            titleStyle={{ fontFamily: 'Lobster' }}
                            onPress={this.handleEdit}
                            title='Edit Activity' />
                        <View style={styles.delete}>
                            <Button
                                // backgroundColor='#03A9F4'
                                titleStyle={{ color: 'red' }}
                                type='clear'
                                onPress={this.handleDelete}
                                title='Delete Activity' />
                                
                        </View>


                    </View>
                    {/* <Modal

                    animationIn={'slideInUp'}
                    animationOut={'slideOutDown'}
                    animationInTiming={500}
                    onBackdropPress={() => this.setState({ isVisible: false })}
                    style={styles.modal}
                    backdropOpacity={0.10}
                    isVisible={this.state.isVisible}

                ><EditActivity /></Modal> */}

                </View>
                {/* <Modal

                    animationIn={'slideInUp'}
                    animationOut={'slideOutDown'}
                    animationInTiming={500}
                    onBackdropPress={() => this.setState({ isVisible: false })}
                    style={styles.modal}
                    backdropOpacity={0.10}
                    isVisible={this.state.isVisible}

                ><EditActivity /></Modal> */}

            </View>
            
                
                
                
       
            

        );

    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    delete: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute', //Here is the trick
        bottom: 0, //Here is the trick
    },
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
    }
})

export default withNavigation(ActivityDetial);