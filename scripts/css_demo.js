document.addEventListener('DOMContentLoaded', function() {
    // square bracket CSS selector allows matching elements by any (custom) attribute
    const elementsToLocalize = document.querySelectorAll('[i16n]');
    elementsToLocalize.forEach(el => el.innerHTML = 'test');
});