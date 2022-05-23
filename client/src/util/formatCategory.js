import formatItem from "./formatItem"

export default function formatCategory(category){
    if( category != null && category.length > 1 ){
        formatItem(category)
    }else if(category.length === 1 ){
        const categoryString = category[0]
        return formatItem(categoryString)
    }       
}
