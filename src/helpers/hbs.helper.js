module.exports = {
    selected: function(currentValue, optionValue) {
        return currentValue == optionValue ? 'selected' : ''
    },
    multiply: function(price, quantity){
        return price * quantity
    }
}