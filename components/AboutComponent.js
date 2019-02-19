import React, { Component } from 'react';
import { Text, ScrollView, FlatList, StyleSheet } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { LEADERS } from '../shared/leaders';

// https://github.com/react-native-training/react-native-fonts

function History() {
    return(        
        <Card title="Our History">
            <Text style={{fontFamily: 'Verdana'}}>
            {'\t'}Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.{'\n'}
            {'\n'}{'\t'}The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.
            </Text>
        </Card>
    );    
}
class About extends Component {

    constructor(props){
        super(props);
        this.state = {
            leaders: LEADERS
        };
    }
    
    static navigationOptions = {
        title: 'About Us'
    };

    render(){  
        
        const renderLeaderItem = ({item, index}) => {
            return (
                <ListItem
                    key={index}
                    title={<Text style={styles.baseText}>{item.name}{'\n'}</Text>}
                    subtitle={item.description}
                    leftAvatar={{ source: require('./images/alberto.png')}}                   
                />
            );
        }
        return(
            <ScrollView>
                <History />
                <Card title="Corporate Leadership">
                    <FlatList 
                        data={this.state.leaders}
                        renderItem={renderLeaderItem}
                        keyExtractor={item => item.id.toString()}
                    />
                </Card>
            </ScrollView>           
        );
    }    
}
const styles = StyleSheet.create({
    baseText: {
        fontFamily: 'HelveticaNeue-MediumItalic',
        fontSize: 17,
    }
});

export default About;