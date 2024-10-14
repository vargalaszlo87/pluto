$(function () {

	const tabsPre = "content-";
	var tabs = ["home","electric","vibration","temperature","process"];
	
	// functions		
		function pageShow(p) {
			for (i = 0 ; i < tabs.length ; i++) {
				if (tabs[i] == p)
					$("#"+tabsPre + tabs[i]).show();
				else
					$("#"+tabsPre + tabs[i]).hide();
			}		
		}

	// default layer
	pageShow("home");

	// pre-setup
	preWindow();
	preButton();
	
	$(document).on("click",'[data-type="nav"]', function(e) {
		var id = $(this).attr("id");
		pageShow(id);
	});
});