

		var dataLineA = document.getElementById("dataLineA").getContext('2d');	
		var dataLineA_Chart = new Chart(dataLineA, 
			{
				type: 'line',
				data: {
					labels: dLA_Chart_XData,
					datasets: [
					{
						type: 'line',
						label: 'Alacsony meghibásodási esély',//'mainprob',
						backgroundColor: mainProbColor[1],
						borderColor: mainProbColor[1],
						fill: false,
						data: dLA_realProb,
						borderWidth: 5,					
					},
					{
						type: 'line',
						label: 'Magas meghibásodási esély',//'crashProb',
						backgroundColor: mainProbColor[2],
						borderColor: mainProbColor[2],
						fill: false,
						data: dLA_crashProb,
						borderWidth: 5,
					},
					{
						label: 'Élettartam görbe',
						backgroundColor: "#7D3C98",
						borderColor: "#7D3C98",
						fill: false,
						data: dLA_mainProb,
					}
					/*
					,
					{
						label: '',//'Bejáratódási szakasz',
						backgroundColor: '#7FB3D5',
						borderColor: "#7FB3D5",
						fill: false,
						borderDash: [3,9],
						pointRadius: 0,		
						data: dLA_burnIn,
					}, {
						label: '',//'Állandó (véletlenszerű) szakasz',
						backgroundColor: "#76D7C4",
						borderColor: "#76D7C4",
						fill: false,
						borderDash: [3,9],
						pointRadius: 0,						
						data: dLA_constant,
					}, {
						label: '',//'Elhasználódási szakasz',
						backgroundColor: "#EDBB99",
						borderColor: "#EDBB99",
						borderDash: [3,9],
						pointRadius: 0,					
						fill: false,
						data: dLA_wearOut,
					}*/
					]
				},
				options: {
					responsive: true,
					maintainAspectRatio: false,
					legend: {
						labels: {
						 usePointStyle: true  //<-- set this
						}						
					},
					title: {
						display: true,
						text: dLA_Title,
						fontColor: '#333',
						fontSize: 20,
						fontFamily: 'Arial',
						fontStyle: 'normal',
						padding: 5,					
					},
					scales: {
						xAxes: [{
							display: true,
							scaleLabel: {
								display: true,
								labelString: dLA_Chart_XLabel,
								fontSize: 14,
								fontFamily: 'Arial',
								fontColor: "#333",
								fontStyle: 'normal',
							}
						}],
						yAxes: [{
							display: true,
							//type: 'logarithmic',
							scaleLabel: {
								display: true,
								labelString: dLA_Chart_YLabel,
								fontSize: 14,
								fontFamily: 'Arial',
								fontColor: "#333",
								fontStyle: 'normal',
								
							},
								ticks: {
								suggestedMin: 0,
								suggestedMax: 100,
								stepSize: 10,
								//min: -1,
								//max: 1,
							},
							gridLines: {
								display: true ,
								color: "#ccc"
							}

						}]
					}
				}
			}
		);
		