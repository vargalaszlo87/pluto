/*
 * sizing and resizing the html elements
 *
*/ 

const sizer = { 
	width: 0,
	height: 0,
	navHeight: 0,
	workPlaceHeight: 0,
	workPlaceHeightClass: "row-full",
	
	repeat: function(event) {
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
		console.log(this.workPlaceHeight);		
	}
};
				
$(window).on('load', (event) => {
	sizer.repeat(event);
});

$(window).on('resize', (event) => {
	sizer.repeat(event);
});
			