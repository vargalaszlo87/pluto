/*
 * sizing and resizing the html elements
 *
 */

const forbidden = {
    minWidth: 102,
    minHeight: 76,
    size: function(width, height) {
        document.getElementsByTagName("BODY")[0].style.display = (width < forbidden.minWidth || height < forbidden.minHeight) ? "none" : "block";
    }
};

const sizer = {
    width: 0,
    height: 0,
    navHeight: 0,
    workSpaceHeight: 0,
    workSpaceHeightClass: "row-full",
	workSpaceDivId: "workSpaceDiv",
	workSpaceCanvasId: "workSpace",
    workSpaceCanvasDeactivateButtonId: "deactivateButton",
    workSpaceCanvasDeactivateButtonSize: 50,
	workSpaceCanvasPadding: 5,

    repeat: function(event, checkSizeCallback) {
        // check
        this.width = $(window).width();
        this.height = $(window).height();
        this.navHeight = $("#navigation").height();
        this.workSpaceHeight = this.height - this.navHeight;

        // recalc
        const temp = document.getElementsByClassName(this.workSpaceHeightClass);
        if (temp.length > 0) {
            temp[0].style.height = this.workSpaceHeight + "px";
        }
        checkSizeCallback(this.width, this.height);
		
		// workSpaceCanvas
		const temp_workSapce = document.getElementById(this.workSpaceCanvasId);
		temp_workSapce.style.width = document.getElementById(this.workSpaceDivId).offsetWidth - 2 * this.workSpaceCanvasPadding + "px";
		temp_workSapce.style.height = document.getElementById(this.workSpaceDivId).offsetHeight - 2 * this.workSpaceCanvasPadding + "px";
		
        // deactivateButton
        if (isButton) {
            const temp_deactivateButton = document.getElementById(this.workSpaceCanvasDeactivateButtonId);
            temp_deactivateButton.style.left = document.getElementById(this.workSpaceDivId).offsetWidth - this.workSpaceCanvasDeactivateButtonSize - this.workSpaceCanvasPadding + 'px';
            temp_deactivateButton.style.top = this.navHeight + this.workSpaceCanvasPadding + "px";

        }

	}
};

$(window).on('load', (event) => {
    sizer.repeat(event, forbidden.size);
});

$(window).on('resize', (event) => {
    sizer.repeat(event, forbidden.size);
});