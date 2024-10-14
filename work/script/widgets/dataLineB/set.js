/* dataLineB sets */
/* -------------- */

/* Common Datas */

	/* Chart Title */

		var dLB_Title = 'Z1-tengely hibavalószínüség';
		
	/* Chart Label of X-Axis */
		
		var dLB_Chart_XLabel = 'Időtartam [KW]'; 	
		
	/* Chart Label of Y-Axis */

		var dLB_Chart_YLabel = 'Hiba valószínűség [%]'; 
		
/* User defined Datas */		
/* use: dLB_ prefix   */

	var mainProbColor = ['#27AE60', '#F1C40F', '#E74C3C'];
	var home_data = JSON.parse(home_data_json);
	var 
		realProbA = 8,
		realProbB = 13;	
		crashProbA = 34;
		crashProbB = 38;

	var dLB_Chart_XData = [];
	var i = 0;
	while (i < 52) {			
		var week = (result[1]+i-realProbA <= 0) ? result[1]+i-realProbA+52 : result[1]+i-realProbA ;
		dLB_Chart_XData[i] = 'KW'+((week > 52) ? week-52 : week);
		i++;
	}

	var dLB_burnIn = [];
	var i = 0, temp = 4.3;
	while (i < 52) {
		dLB_burnIn[i] = Math.exp(temp)+1.73;
		temp -= 0.0865+((52-i)*0.01); // 0.0865 - 1.1865
		i++;
	}
	
	var dLB_constant = [];
	var i = 0, temp = 0;
	while (i < 52) {
		dLB_constant[i] = 4.57;
		i++;
	}	
	
	var dLB_wearOut = [];
	var i = 0, temp = 0;
	while (i < 52) {
		dLB_wearOut[i] = Math.pow(temp,6.2)+1.22;
		temp += 0.0405;
		i++;
	}
	
	var dLB_mainProb = [];
	var i = 0, temp = 0;
	while (i < 52) {
		dLB_mainProb[i] = dLB_burnIn[i]+dLB_constant[i]+dLB_wearOut[i];
		i++;
	}	

	var dLB_realProb = [];
	var i = 0, temp = 0;
	while (i < 52) {
		dLB_realProb[i] = (i >= realProbA && i <= realProbB) ? dLB_burnIn[i]+dLB_constant[i]+dLB_wearOut[i] : NaN;
		i++;
	}			
	
	var dLB_crashProb = [];
	var i = 0, temp = 0;
	while (i < 52) {
		dLB_crashProb[i] = (i >= crashProbA && i <= crashProbB) ? dLB_burnIn[i]+dLB_constant[i]+dLB_wearOut[i] : NaN;
		i++;
	}					
