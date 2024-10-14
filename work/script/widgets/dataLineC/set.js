/* dataLineC sets */
/* -------------- */

/* Common Datas */

	/* Chart Title */

		var dLC_Title = 'Y-tengely hibavalószínüség';
		
	/* Chart Label of X-Axis */
		
		var dLC_Chart_XLabel = 'Időtartam [KW]'; 	
		
	/* Chart Label of Y-Axis */

		var dLC_Chart_YLabel = 'Hiba valószínűség [%]'; 
		
/* User defined Datas */		
/* use: dLC_ prefix   */

	var mainProbColor = ['#27AE60', '#F1C40F', '#E74C3C'];
	var home_data = JSON.parse(home_data_json);
	var 
		realProbA = 18,
		realProbB = 28;	
		crashProbA = 36;
		crashProbB = 38;

	var dLC_Chart_XData = [];
	var i = 0;
	while (i < 52) {			
		var week = (result[1]+i-realProbA <= 0) ? result[1]+i-realProbA+52 : result[1]+i-realProbA ;
		dLC_Chart_XData[i] = 'KW'+((week > 52) ? week-52 : week);
		i++;
	}

	var dLC_burnIn = [];
	var i = 0, temp = 4.3;
	while (i < 52) {
		dLC_burnIn[i] = Math.exp(temp)+1.73;
		temp -= 0.0865+((52-i)*0.01); // 0.0865 - 1.1865
		i++;
	}
	
	var dLC_constant = [];
	var i = 0, temp = 0;
	while (i < 52) {
		dLC_constant[i] = 4.57;
		i++;
	}	
	
	var dLC_wearOut = [];
	var i = 0, temp = 0;
	while (i < 52) {
		dLC_wearOut[i] = Math.pow(temp,6.2)+1.22;
		temp += 0.0405;
		i++;
	}
	
	var dLC_mainProb = [];
	var i = 0, temp = 0;
	while (i < 52) {
		dLC_mainProb[i] = dLC_burnIn[i]+dLC_constant[i]+dLC_wearOut[i];
		i++;
	}	

	var dLC_realProb = [];
	var i = 0, temp = 0;
	while (i < 52) {
		dLC_realProb[i] = (i >= realProbA && i <= realProbB) ? dLC_burnIn[i]+dLC_constant[i]+dLC_wearOut[i] : NaN;
		i++;
	}			
	
	var dLC_crashProb = [];
	var i = 0, temp = 0;
	while (i < 52) {
		dLC_crashProb[i] = (i >= crashProbA && i <= crashProbB) ? dLC_burnIn[i]+dLC_constant[i]+dLC_wearOut[i] : NaN;
		i++;
	}					
