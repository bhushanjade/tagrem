
export function responseHandler(response, key) {
    if (response.status == 200 && response.ok) {
        return response.json().then(data => {
            if(data['_meta'].code != 200){
                errorHandler(data);
            }
            return data;
        })
    } else {
        errorHandler(response);
    }
}

export function errorHandler(error) {
    console.error('er', error["_meta"].message);
    throw error;

}
