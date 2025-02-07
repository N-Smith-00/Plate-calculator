function toggle(element) {
    if (element.classList.contains('active-plate')) {
        element.classList.remove('active-plate');
    } else {
        element.classList.add('active-plate');
    }
}