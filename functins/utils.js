export const getElement = (selectr)=>{
    const ele = document.querySelector(selectr)
    if(!ele) {
        console.log(`Element nt fund ${selectr}`)
        return
    }
    return ele
}