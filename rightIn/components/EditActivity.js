import React, { Component } from 'react';
import MapView, { CalloutSubview, Marker, Callout } from 'react-native-maps'
//import { Marker, Callout } from 'react-native-maps';
import { StyleSheet, View, Text, TouchableHighlight, Image } from 'react-native';
import { Button, Card, Avatar, Overlay } from 'react-native-elements';
import { Container, Header, Content, Form, Item, Input, Label, Body, Title } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconBadge from 'react-native-icon-badge';


class EditActivity extends Component {


    

    render() {
        return(
            <View style={{ flex: 1}}>
                <Container>
                    <Header style={{ height: 10}}>
                        
                        <Text>Edit Activity</Text>
                       
                    </Header>
                    <Content>
                        <Form>
                            <Item inlineLabel>
                                <Label>Username</Label>
                                <Input />
                            </Item>
                            <Item inlineLabel last>
                                <Label>Password</Label>
                                <Input />
                            </Item>
                        </Form>
                    </Content>
                </Container>

        
                

            
            </View>


        );
    }



}

export default EditActivity;