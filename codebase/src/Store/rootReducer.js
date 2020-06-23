import * as constants from '../Constants';


// initial root store of the app
const initialstore = {
        src: null,
        outputimages: [{
                name: 'horizontal',
                height: constants.OUTPUT_HORIZONTAL_HEIGHT,
                width: constants.OUTPUT_HORIZONTAL_WIDTH,
                src: null,
                initial:false,
                crop: {
                    unit: 'px',
                    x: Math.max(0, ((+constants.IMAGE_WIDTH) - (+constants.OUTPUT_HORIZONTAL_WIDTH)) / 2),
                    y: Math.max(0, ((+constants.IMAGE_HEIGHT) - (+constants.OUTPUT_HORIZONTAL_HEIGHT)) / 2),
                    width: +constants.OUTPUT_HORIZONTAL_WIDTH,
                    height: +constants.OUTPUT_HORIZONTAL_HEIGHT,
                }
            },
            {
                name: 'vertical',
                height: constants.OUTPUT_VERTICAL_HEIGHT,
                width: constants.OUTPUT_VERTICAL_WIDTH,
                src: null,
                initial:false,
                crop: {
                    unit: 'px',
                    width: constants.OUTPUT_VERTICAL_WIDTH,
                    height: constants.OUTPUT_VERTICAL_WIDTH,
                    x: Math.max(0, ((+constants.IMAGE_WIDTH) - (+constants.OUTPUT_VERTICAL_WIDTH)) / 2),
                    y: Math.max(0, ((+constants.IMAGE_HEIGHT) - (+constants.OUTPUT_VERTICAL_HEIGHT)) / 2),   
                }
            }, {
                name: 'horizontal small',
                height: constants.OUTPUT_HORIZONTAL_SMALL_HEIGHT,
                width: constants.OUTPUT_HORIZONTAL_SMALL_WIDTH,
                src: null,
                initial:false,
                crop: {
                    unit: 'px',
                    width: constants.OUTPUT_HORIZONTAL_SMALL_WIDTH,
                    height: constants.OUTPUT_HORIZONTAL_SMALL_HEIGHT,
                    x: Math.max(0, ((+constants.IMAGE_WIDTH) - (+constants.OUTPUT_HORIZONTAL_SMALL_WIDTH)) / 2),
                    y: Math.max(0, ((+constants.IMAGE_HEIGHT) - (+constants.OUTPUT_HORIZONTAL_SMALL_HEIGHT)) / 2),   
                }
            },
            {
                name: 'gallery',
                height: constants.OUTPUT_GALLERY_HEIGHT,
                width: constants.OUTPUT_GALLERY_WIDTH,
                src: null,
                initial:false,
                crop: {
                    unit: 'px',
                    width: constants.OUTPUT_GALLERY_WIDTH,
                    height: constants.OUTPUT_GALLERY_HEIGHT,
                    x: Math.max(0, ((+constants.IMAGE_WIDTH) - (+constants.OUTPUT_GALLERY_WIDTH)) / 2),
                    y: Math.max(0, ((+constants.IMAGE_HEIGHT) - (+constants.OUTPUT_GALLERY_HEIGHT)) / 2),   
                }
            }
        ]
    }

    
// method to update source
    const updateSrc = (arr, name, src) => {
        let updatedarr = [...arr];
        let index = updatedarr.findIndex(el => el.name === name);
        updatedarr[index]['src'] = src;
        return updatedarr;
    }

    // method to update crop
    const updateCrop = (arr,name,crop)=>{
        let updatedarr = [...arr];
        let index = updatedarr.findIndex(el => el.name === name);
        updatedarr[index]['crop'] = crop;
        return updatedarr;
    }

    // method to update initial crop
    const updateInitial = (arr,name,initial)=>{
        let updatedarr = [...arr];
        let index = updatedarr.findIndex(el => el.name === name);
        updatedarr[index]['initial'] = initial;
        return updatedarr;
    }


    // reducer of the redux store
export const rootReducer = (store = initialstore, action) => {
    switch (action.type) {
        case constants.SET_SRC:
            return {
                ...store, src: action.src
            };
        case constants.SET_OUTPUTSRC:
            return {
                ...store, outputimages: updateSrc(initialstore.outputimages, action.name, action.src)
            }
        case constants.SET_CROP:
            return {
                ...store, outputimages: updateCrop(initialstore.outputimages,action.name,action.crop)
            }
        case constants.SET_INITIAL:
            return{
                ...store, outputimages:updateInitial(initialstore.outputimages,action.name,action.initial)
            }
            default:
                return store;
    }
}

//