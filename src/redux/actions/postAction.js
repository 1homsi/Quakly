export const POST_REQUEST = 'POST_REQUEST';
export const POST_SUCCESS = 'POST_SUCCESS';
export const POST_FAIL = 'POST_FAIL';
export const POST_RESET = 'POST_RESET';

import { auth, db, storage, firebase } from '../../../firebase';

export const PostProduct = (Image, data) => async (dispatch) => {
    dispatch({
        type: POST_REQUEST,
    });
    try {
        const response = await fetch(Image.uri);
        const blob = await response.blob();
        var uploadTask = storage.ref().child(Image.name).put(blob, {
            contentType: 'image/jpg',
        });
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
            // (snapshot) => {
            // var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            // switch (snapshot.state) {
            // case firebase.storage.TaskState.PAUSED:
            // break;
            // case firebase.storage.TaskState.RUNNING:
            // break;
            // }
            // },
            (error) => {
                switch (error.code) {
                    case 'storage/unauthorized':
                        break;
                    case 'storage/canceled':
                        break;
                    case 'storage/unknown':
                        break;
                }
            },
            () => {
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    db.collection("Product").add({
                        title: data.title,
                        Name: data.Name,
                        PhoneNumber: data.PhoneNumber,
                        Description: data.Description,
                        Email: data.Email,
                        Location: data.Location,
                        FavoritedBy: "",
                        ProductTaken: false,
                        Image: downloadURL,
                        isMedicine: data.Switch,
                    });
                    dispatch({ type: POST_SUCCESS });
                });
            }
        );
    }
    catch (error) {
        console.log(error.message);
        dispatch({ type: POST_FAIL, payload: error.message });
    }
};