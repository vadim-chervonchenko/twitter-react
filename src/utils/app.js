export const searchItems = ( items = [], search = '' ) => {
    if ( search.length === 0 ) {
        return items;
    }
    return items.filter( ( item ) => {
        return item.content.toLowerCase().indexOf( search.toLowerCase() ) > - 1;
    } );
};