

		var dataLineC = document.getElementById("dataLineC").getContext('2d');	
		var dataLineC_Chart = new Chart(dataLineC, 
			{
				type: 'line',
				data: {
					labels: dLC_Chart_XData,
					datasets: [
					{
						type: 'line',
						label: 'Alacsony meghibásodási esély',//'mainprob',
						backgroundColor: mainProbColor[1],
						borderColor: mainProbColor[1],
						fill: false,
						data: dLC_realProb,
						borderWidth: 5,					
					},
					{
						type: 'line',
						label: 'Magas meghibásodási esély',//'crashProb',
						backgroundColor: mainProbColor[2],
						borderColor: mainProbColor[2],
						fill: false,
						data: dLC_crashProb,
						borderWidth: 5,
					},
					{
						label: 'Élettartam görbe',
						backgroundColor: "#7D3C98",
						borderColor: "#7D3C98",
						fill: false,
						data: dLC_mainProb,
					}]
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
						text: dLC_Title,
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
								labelString: dLC_Chart_XLabel,
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
								labelString: dLC_Chart_YLabel,
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
		