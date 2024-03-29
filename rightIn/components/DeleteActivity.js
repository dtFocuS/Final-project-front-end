import React, { Component } from 'react';
import MapView, { CalloutSubview, Marker, Callout } from 'react-native-maps'
//import { Marker, Callout } from 'react-native-maps';
import { StyleSheet, View, TextInput, TouchableHighlight, Image, Text } from 'react-native';
import { Input, Button, Card, Avatar, Overlay } from 'react-native-elements';
import { Container, Header, Content, Form, Item, Label, Body, Title, Textarea } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconBadge from 'react-native-icon-badge';


class DeleteActivity extends Component {

    handleDelete = () => {
        this.props.secModalClose();
        this.props.deleteActivity(this.props.activity)
    }



    render() {
        return(
            <View style={{ flex: 1 }}>
                <Container>
                    <Header style={{ height: 60, fontFamily: 'Lobster' }}>
                        <Title style={{ fontFamily: 'Lobster', color: 'tomato', fontSize: 30 }}>
                            Delete Activity
                        </Title>

                    </Header>
                    <Content >
                        <View style={{flex: 1}}>
                            <Text style={styles.message} >Do you want to delete {this.props.activity.name} ?</Text>
                        </View>
                        
                        {/* <Form>
                            <Item stackedLabel>
                                <Label>Name</Label>
                                <Input 
                                    value={this.state.name}
                                    onChangeText={(name) => this.setState({ name })}
                                    style={styles.input}
                                />
                            </Item>
                            <Item stackedLabel>
                                <Label>Description</Label>
                                <Textarea 
                                    rowSpan={4} 
                                    value={this.state.description}  
                                
                                />
                            </Item>
                        </Form> */}
                        {/* <TextInput
                            value={this.props.activity.name}
                            onChangeText={(name) => this.setState({ name })}
                            selectionColor={'tomato'}
                            placeholder={'Name'}
                            style={styles.input}
                            // onFocus={this.handleFocus}
                            // onBlur={this.handleBlur}
                            borderBottomColor={'grey'}

                        />
                        <TextInput
                            multiline={true}
                            value={this.props.activity.description}
                            onChangeText={(description) => this.setState({ description })}
                            selectionColor={'tomato'}
                            placeholder={'Description'}
                            style={styles.input}
                            // onFocus={this.handleFocus}
                            // onBlur={this.handleBlur}
                            borderBottomColor={'grey'}

                        /> */}
                        <Button
                            fontFamily='Lobster'
                            onPress={this.handleDelete}
                            buttonStyle={styles.button}
                            titleStyle={{ fontFamily: 'Lobster' }}
                            title="Delete"
                        />


                    </Content>

                </Container>





            </View>


        )
    }




}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //alignItems: 'center',
        //justifyContent: 'center'
    },
    input: {
        width: 240,
        height: 70,
        marginRight: 'auto',
        marginLeft: 'auto',
        paddingLeft: 10,
        borderBottomWidth: 0.5,
        // borderColor: 'black',
        //borderBottomColor: 'gray',
        marginBottom: 10,
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
        marginTop: 50
    },
    message:{
        width:240,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 20
    }
});

export default DeleteActivity;