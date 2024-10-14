/* dataLineD sets */
/* -------------- */

/* Common Datas */

	/* Chart Title */

		var dLD_Title = 'Z-tengely hibavalószínüség';
		
	/* Chart Label of X-Axis */
		
		var dLD_Chart_XLabel = 'Időtartam [KW]'; 	
		
	/* Chart Label of Y-Axis */

		var dLD_Chart_YLabel = 'Hiba valószínűség [%]'; 
		
/* User defined Datas */		
/* use: dLD_ prefix   */

	var mainProbColor = ['#27AE60', '#F1C40F', '#E74C3C'];
	var home_data = JSON.parse(home_data_json);
	var 
		realProbA = 10,
		realProbB = 18;	
		crashProbA = 36;
		crashProbB = 38;

	var dLD_Chart_XData = [];
	var i = 0;
	while (i < 52) {			
		var week = (result[1]+i-realProbA <= 0) ? result[1]+i-realProbA+52 : result[1]+i-realProbA ;
		dLD_Chart_XData[i] = 'KW'+((week > 52) ? week-52 : week);
		i++;
	}

	var dLD_burnIn = [];
	var i = 0, temp = 4.3;
	while (i < 52) {
		dLD_burnIn[i] = Math.exp(temp)+1.73;
		temp -= 0.0865+((52-i)*0.01); // 0.0865 - 1.1865
		i++;
	}
	
	var dLD_constant = [];
	var i = 0, temp = 0;
	while (i < 52) {
		dLD_constant[i] = 4.57;
		i++;
	}	
	
	var dLD_wearOut = [];
	var i = 0, temp = 0;
	while (i < 52) {
		dLD_wearOut[i] = Math.pow(temp,6.2)+1.22;
		temp += 0.0405;
		i++;
	}
	
	var dLD_mainProb = [];
	var i = 0, temp = 0;
	while (i < 52) {
		dLD_mainProb[i] = dLD_burnIn[i]+dLD_constant[i]+dLD_wearOut[i];
		i++;
	}	

	var dLD_realProb = [];
	var i = 0, temp = 0;
	while (i < 52) {
		dLD_realProb[i] = (i >= realProbA && i <= realProbB) ? dLD_burnIn[i]+dLD_constant[i]+dLD_wearOut[i] : NaN;
		i++;
	}			
	
	var dLD_crashProb = [];
	var i = 0, temp = 0;
	while (i < 52) {
		dLD_crashProb[i] = (i >= crashProbA && i <= crashProbB) ? dLD_burnIn[i]+dLD_constant[i]+dLD_wearOut[i] : NaN;
		i++;
	}					
