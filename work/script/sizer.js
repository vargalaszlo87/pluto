/*
 * sizing and resizing the html elements
 *
 */

const forbidden = {
    minWidth: 1024,
    minHeight: 768,
    size: function(width, height) {
        document.getElementsByTagName("BODY")[0].style.display = (width < forbidden.minWidth || height < forbidden.minHeight) ? "none" : "block";
    }
};

const sizer = {
    width: 0,
    height: 0,
    navHeight: 0,
    workPlaceHeight: 0,
    workPlaceHeightClass: "row-full",

    repeat: function(event, checkSizeCallback) {
        // check
        this.width = $(window).width();
        this.height = $(window).height();
        this.navHeight = $("#navigation").height();
        this.workPlaceHeight = this.height - this.navHeight;

        // recalc
        const temp = document.getElementsByClassName(this.workPlaceHeightClass);
        if (temp.length > 0) {
            temp[0].style.height = this.workPlaceHeight + "px";
        }
        checkSizeCallback(this.width, this.height);
    }
};

$(window).on('load', (event) => {
    sizer.repeat(event, forbidden.size);
});

$(window).on('resize', (event) => {
    sizer.repeat(event, forbidden.size);
});