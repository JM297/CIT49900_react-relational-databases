export const setToggle = () =>{
    return{
        type:"SET_TOGGLE"
    }
};
export const changeCountry = country =>{
    return{
        type:"CHANGE_COUNTRY",
        country: country
    }
};
export const changeSort = (prop,val) =>{
    return{
        type:"CHANGE_SORT",
        val: val,
        prop:prop
    }
};
export const initCollection = (value)=>{
    return{
        type:"INIT_COLLECTION",
        value: value
    }
};
export const checkChange = ()=>{
    return{
        type:"CHECK_CHANGE"
    }
};