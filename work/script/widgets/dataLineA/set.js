/* dataLineA sets */
/* -------------- */

/* Common Datas */

	/* Chart Title */

		var dLA_Title = 'X1-tengely hibavalószínűség';
		
	/* Chart Label of X-Axis */
		
		var dLA_Chart_XLabel = 'Időtartam [KW]'; 	
		
	/* Chart Label of Y-Axis */

		var dLA_Chart_YLabel = 'Hiba valószínűség [%]'; 
		
/* User defined Datas */		
/* use: dLA_ prefix   */

	var mainProbColor = ['#27AE60', '#F1C40F', '#E74C3C'];
	var home_data = JSON.parse(home_data_json);
	var 
		realProbA = home_data[0].realProbA,
		realProbB = home_data[0].realProbB;	
		crashProbA = home_data[1].crashProbA;
		crashProbB = home_data[1].crashProbB;

	var dLA_Chart_XData = [];
	var i = 0;
	while (i < 52) {			
		var week = (result[1]+i-realProbA <= 0) ? result[1]+i-realProbA+52 : result[1]+i-realProbA ;
		dLA_Chart_XData[i] = 'KW'+((week > 52) ? week-52 : week);
		i++;
	}

	var dLA_burnIn = [];
	var i = 0, temp = 4.3;
	while (i < 52) {
		dLA_burnIn[i] = Math.exp(temp)+1.73;
		temp -= 0.0865+((52-i)*0.01); // 0.0865 - 1.1865
		i++;
	}
	
	var dLA_constant = [];
	var i = 0, temp = 0;
	while (i < 52) {
		dLA_constant[i] = 4.57;
		i++;
	}	
	
	var dLA_wearOut = [];
	var i = 0, temp = 0;
	while (i < 52) {
		dLA_wearOut[i] = Math.pow(temp,6.2)+1.22;
		temp += 0.0405;
		i++;
	}
	
	var dLA_mainProb = [];
	var i = 0, temp = 0;
	while (i < 52) {
		dLA_mainProb[i] = dLA_burnIn[i]+dLA_constant[i]+dLA_wearOut[i];
		i++;
	}	

	var dLA_realProb = [];
	var i = 0, temp = 0;
	while (i < 52) {
		dLA_realProb[i] = (i >= realProbA && i <= realProbB) ? dLA_burnIn[i]+dLA_constant[i]+dLA_wearOut[i] : NaN;
		i++;
	}			
	
	var dLA_crashProb = [];
	var i = 0, temp = 0;
	while (i < 52) {
		dLA_crashProb[i] = (i >= crashProbA && i <= crashProbB) ? dLA_burnIn[i]+dLA_constant[i]+dLA_wearOut[i] : NaN;
		i++;
	}					
