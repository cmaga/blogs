import _ from 'lodash';
import jsonPlaceholder from '../apis/jsonPlaceholder';

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());
  //
  //const userIds =_.uniq(_.map(getState().posts, 'userId'));
  //userIds.forEach(id => dispatch(fetchUser(id)));

  //the above but with the lodash chain function
    _.chain(getState().posts)
        .map('userId')
        .uniq()
        .forEach(id => dispatch(fetchUser(id)))
        .value();
};

export const fetchPosts = () => async dispatch => {
        const response = await jsonPlaceholder.get('/posts');
        dispatch({ type: 'FETCH_POSTS', payload: response.data })
    };
export const fetchUser = (id) => async dispatch => {
    const response = await jsonPlaceholder.get(`/users/${id}`);

    dispatch({ type: 'FETCH_USER', payload: response.data});
};

//the above is equiv to this:
//export const fetchPosts = () => {
//    return async function(dispatch, getState){
//        const response = await jsonPlaceholder.get('/posts');
//        dispatch({type: 'FETCH_POSTS', payload: response})
//    };
//};



// you also may want to just used promises and remove the async and await
//it wouldn't work because actions get consumed faster then the api takes to return data
//So by the time the reducers run the data has not arrived and there is no way to delay reducers
// the correct way to do this is to create async action creators and that is done with middleware in this case
//we are using redux thunk
//The point of redux thunk is to manually dispatch an action..