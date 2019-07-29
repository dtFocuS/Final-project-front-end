import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableHighlight, Image } from 'react-native';
import { Input, Button, Card, Avatar, Overlay, Badge } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconBadge from 'react-native-icon-badge';
import EditActivity from './EditActivity'



class ActivityDetial extends Component {

    handleEdit = () => {

    }

    render() {
        const { user, activity } = this.props;
        return(
            
                <View style={styles.contentContainer}>
                    <Card title={activity.name}>
                        <Text>
                            {activity.description}
                        </Text>

                    </Card>
                    <Button
                        // icon={<Icon name='code' color='#ffffff' />}
                        backgroundColor='#03A9F4'
                        buttonStyle={styles.button}
                        titleStyle={{ fontFamily: 'Lobster'}}
                        onPress={this.handleEdit}
                        title='Edit Activity' />
                    <View style={styles.delete}>
                        <Button
                            // backgroundColor='#03A9F4'
                            titleStyle={{ color: 'red'}}
                            type='clear'
                            title='Delete Activity' />
                    </View>

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

export default ActivityDetial;