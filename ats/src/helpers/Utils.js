const {REACT_APP_API_URL} = process.env;


class Utils {
    static calculateDiscount (discounts, scount) {
        const sortedDiscounts = discounts.sort((a, b) => b.sqanak - a.sqanak);
        const discountEntry = sortedDiscounts.find(d => d.sqanak === scount);
        if (discountEntry) {
            return discountEntry.discount;
        }
        const nearestSmallerDiscount = sortedDiscounts.find(d => d.sqanak < scount);
        return nearestSmallerDiscount ? nearestSmallerDiscount.discount : 0;
    };
    static sortParams(apiData) {
        const bodyArray = [];
        const queryArray = [];

        for (const item of apiData) {
            if (item.type === 'body') {
                bodyArray.push(item);
            } else if (item.type === 'query') {
                queryArray.push(item);
            }
        }

        return [bodyArray,queryArray]
    }
    static shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    static sumDiscount(arrayOfObjects) {
        let sum = 0
        arrayOfObjects.map(el => {
            sum += +el.discounted
        })
        return sum
    }
    static lang() {
        let lang = ''
        if(+localStorage.getItem('atsLang') === 3){
            lang = 'hy'
        }else if(+localStorage.getItem('atsLang') === 2){
            lang = 'ru'
        }else{
            lang = 'en'
        }
        return lang
    }
}

export default Utils;

