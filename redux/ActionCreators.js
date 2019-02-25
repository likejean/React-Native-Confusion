import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';


//COMMENTS

export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl + 'comments')
    .then(responce => {
        if (responce.ok){
            return responce;        
        }
        else {
            var error = new Error('Error ' + responce.status + ': ' + responce.statusText);
            error.responce = responce;
            throw error;
        }
    },
    error => {
        var errMess = new Error(error.message);
        throw errMess;    
    })
    .then(responce => responce.json())
    .then(comments => dispatch(addComments(comments)))
    .catch(error => dispatch(commentsFailed(error.message)))
}

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});



//DISHES



export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading());
    return fetch(baseUrl + 'dishes')
    .then(responce => {
        if (responce.ok){
            return responce;        
        }
        else {
            var error = new Error('Error ' + responce.status + ': ' + responce.statusText);
            error.responce = responce;
            throw error;
        }
    },
    error => {
        var errMess = new Error(error.message);
        throw errMess;    
    })
    .then(responce => responce.json())
    .then(dishes => dispatch(addDishes(dishes)))
    .catch(error => dispatch(dishesFailed(error.message)))
}

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});



//PROMOTIONS



export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading());
    return fetch(baseUrl + 'promotions')
    .then(responce => {
        if (responce.ok){
            return responce;        
        }
        else {
            var error = new Error('Error ' + responce.status + ': ' + responce.statusText);
            error.responce = responce;
            throw error;
        }
    },
    error => {
        var errMess = new Error(error.message);
        throw errMess;    
    })
    .then(responce => responce.json())
    .then(promotions => dispatch(addPromos(promotions)))
    .catch(error => dispatch(promosFailed(error.message)))
}

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});


//LEADERS


export const fetchLeaders = () => (dispatch) => {
    dispatch(leadersLoading());
    return fetch(baseUrl + 'leaders')
    .then(responce => {
        if (responce.ok){
            return responce;        
        }
        else {
            var error = new Error('Error ' + responce.status + ': ' + responce.statusText);
            error.responce = responce;
            throw error;
        }
    },
    error => {
        var errMess = new Error(error.message);
        throw errMess;    
    })
    .then(responce => responce.json())
    .then(leaders => dispatch(addLeaders(leaders)))
    .catch(error => dispatch(leadersFailed(error.message)))
}

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = (errmess) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errmess
});

export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
});