export default function formatItem(item){
    
    if (typeof(item) === 'string' && item !== undefined){
        const newCategoryArr = item.split(',')

        const formattedString =  newCategoryArr.map(c => {
            const cStr = c.trim()
            return  cStr.trim().charAt(0).toUpperCase() + cStr.slice(1)
        }).join(', ')

        return formattedString
    }else if(Array.isArray(item)){

        const formattedString =  item.map(c => {
            return  c.charAt(0).toUpperCase() + c.slice(1)
        }).join(', ')

        return formattedString
    }
}