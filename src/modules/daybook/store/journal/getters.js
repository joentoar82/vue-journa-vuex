
// export const myGettres = (state) => {

// }

export const getEntriesByTerm = ( state ) => ( term ) => {

    if( term.length === 0 ) return state.entries

    return state.entries.filter( entry => entry.text.toLowerCase().includes( term.toLocaleLowerCase() ) )
}

export const getEntryById = ( state ) => ( id = '' ) => {
    // console.log(id);
    const entry = state.entries.find(element => element.id === id)
    if ( !entry ) return
    return {...entry}
}