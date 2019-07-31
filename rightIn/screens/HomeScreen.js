import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Overlay, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MapView } from 'react-native-maps';
import Map from '../components/Map'
import CustomHeader from '../components/CustomHeader';
import MenuDrawer from 'react-native-side-drawer'
import Drawer from '../components/Drawer';
import Modal from 'react-native-modal';
import EditActivity from '../components/EditActivity';



class HomeScreen extends Component {
    static navigationOptions = {
        tabBarIcon: ({tintColor}) => {
            return <Ionicons name={'md-home'} size={40} style={{ color: tintColor}} />
            
        }
    }

    state = {
        // activites:[],
        open: false,
        isVisible: false,
        activity: null
    }

    // componentDidMount() {
    //     this.loadActivities();
    // }

    // loadActivities = () => {
    //     fetch('http://localhost:3000/api/v1/activities')
    //     .then(resp => resp.json())
    //     .then(json => {
    //         this.setState({
    //             activites: json
    //         })
    //     })
    // }

    handleOpen = () => {
        this.setState({
            open: !this.state.open
        })
    }

    // componentWillReceiveProps(nextProps) {
    //     if(nextProps) {
    //         console.log(this.props.navigation.getParam('user_id'))
    //     }
    // }

    handleModal = (activity) => {
        this.setState({
            activity: activity,
            isVisible: true,
        })
    }

    modalClose = () => {
        this.setState({
            isVisible: false
        })
    }
    

    render() {
        const {navigate} = this.props.navigation;
        return(
            // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                
            //     <Button
            //         title="Go to Profile"
            //         onPress={() => navigate('Profile', { name: 'Danny' })}
            //     />

            // </View>
            <View style={{flex: 1}}>
                {/* <MenuDrawer
                    open={this.state.open}
                    drawerContent={<Drawer />}
                    drawerPercentage={70}
                    animationTime={250}
                    overlay={true}
                    opacity={0.5}

                > */}



                    <View style={{ flex: 1 }}>
                        {/* <Drawer open={this.state.open}/> */}
                        <View style={styles.header}>
                            <CustomHeader tab={'Home'} onHandleDrawer={this.handleOpen} user={this.props.screenProps.user} />
                        </View>

                        <Map screenProps={this.props.screenProps} handleModal={this.handleModal}/>

                    </View>
                {/* </MenuDrawer> */}
                <Modal

                    animationIn={'slideInUp'}
                    animationOut={'slideOutDown'}
                    animationInTiming={500}
                    onBackdropPress={() => this.setState({ isVisible: false })}
                    style={styles.modal}
                    backdropOpacity={0.10}
                    isVisible={this.state.isVisible}

                ><EditActivity activity={this.state.activity} editActivity={this.props.screenProps.editActivity} modalClose={this.modalClose}/></Modal>

                

            </View>
            

            
            
            
        );
    }


}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        position: 'absolute',
        left: 0,
        top: 0,
        opacity: 0.5,
        backgroundColor: 'black',
        width: width
    },
    header: {
        //position: 'absolute',
        
        // flex: 1
    },
    modal: {
        backgroundColor: 'white',
        marginLeft: 60,
        marginRight: 60,
        marginBottom: 80,
        marginTop: 80,
        alignItems: undefined,
        justifyContent: undefined,
    }  
})

export default HomeScreen;