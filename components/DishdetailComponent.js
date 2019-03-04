import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, FlatList, Button, Modal } from 'react-native';
import { Card, Icon, Input, Rating } from 'react-native-elements';
import StarRating from 'react-native-star-rating';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';


const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
}


const mapDispatchToProps = dispatch => ({
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
    postFavorite: (dishId) => dispatch(postFavorite(dishId))
    
});


function RenderDish(props) {    
    const { dish, toggleModal } = props;
    if (dish != null) {
        return(
            <Card
                featuredTitle={dish.name}                
                image={{uri: baseUrl + dish.image}}>
                <Text style={{margin: 10}}>
                    {dish.description}
                </Text>
                <View style={styles.formRow}>
                    <Icon                        
                        raised
                        reverse
                        name={ props.favorite ? 'heart' : 'heart-o'}
                        type='font-awesome'
                        color='#f50'                        
                        onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                    />                
                    <Icon                        
                        raised
                        reverse
                        name={ 'pencil' }
                        type='font-awesome'
                        color='#512DA8'                        
                        onPress={() => toggleModal()}                         
                    />
                </View>                   
            </Card>
        );
    }
    else {
        return(<View></View>);
    }
}

function RenderComments(props) {
    const comments = props.comments;
    const renderCommentItem = ({ item, index }) => {
        return(
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>            
                <StarRating
                    starSize={20}
                    disabled={false}
                    maxStars={5} 
                    fullStarColor={'gold'}  
                    emptyStarColor={'gold'}                  
                    rating={item.rating}              
                />                
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(item.date)))}</Text>
            </View>
        );
    }

    return(
        <Card title='Comments'>
            <FlatList
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()}
            />
        </Card>
    )
}

class DishDetail extends Component {

    constructor(props){
        super(props);
        this.state = {
            modalVisible: false,
            rating: 0,
            author: '',
            comment: ''
        };
        this.toggleModal = this.toggleModal.bind(this);
    }
    _isMounted = false; 
    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    toggleModal() {
        if(this._isMounted){
            this.setState({modalVisible: !this.state.modalVisible});
        }
    }

    handleComments = (dishId, rating, author, comment) => {        
        this.toggleModal();
        this.props.postComment(dishId, rating, author, comment);
    }

    resetForm() {
        if(this._isMounted){
            this.setState({
                modalVisible: false,
                rating: 0,
                author: '',
                comment: ''
            });
        }        
    }

    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

   

    static navigationOptions = {
        title: 'Dishdetail'
    };

    render(){
        const dishId = this.props.navigation.getParam('dishId',''); 
        console.log(this.state)       
        return(
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]}
                    favorite={this.props.favorites.some(el => el === dishId)}
                    toggleModal={this.toggleModal}                    
                    onPress={() => this.markFavorite(dishId)} 
                />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />

                <Modal animationType = {"slide"} transparent = {false}
                    visible = {this.state.modalVisible}                    
                    onRequestClose = {() => {this.toggleModal(); this.resetForm();}}>
                    <View style = {styles.modal}> 
                        <Rating 
                            showRating fractions = {1} 
                            startingValue = {0}
                            size = {5} 
                            onFinishRating = {rating => this.setState({rating: rating})}                       
                        />
                        <Input                                                     
                            placeholder='Your Name'                            
                            leftIcon={{ type: 'font-awesome', name: 'user', margin:5 }}
                            onChangeText = {author => this.setState({author: author})}
                        />
                        
                        <Input                            
                            placeholder='Leave Your Feedback'
                            leftIcon={{ type: 'font-awesome', name: 'comment',  margin:5 }}
                            onChangeText = {comment => this.setState({comment: comment})}
                        />
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={() => {this.toggleModal(); this.resetForm();}}
                        >
                            <Text style={{color: 'white'}}> CANCEL </Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity
                            style={styles.submitButton}
                            onPress={() => this.handleComments(dishId, this.state.rating, this.state.author, this.state.comment)}
                        >
                            <Text style={{color: 'white'}}> SUBMIT </Text>
                        </TouchableOpacity>                        
                    </View>
                </Modal>
            </ScrollView>           
        );
    }    
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    textInput: {
        height: 40,
        width: 200,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderColor: 'gray',
        borderWidth: 1,
    },
    modalText: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10
    },
    cancelButton: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        margin: 15
    },
    submitButton: {
        alignItems: 'center',
        backgroundColor: '#512DA8',
        padding: 10,
        margin: 15
    }
});



export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);