
	var mcsaPhaseUVW = document.getElementById("mcsaPhaseUVW").getContext('2d');
	//frequency_brokenMotor_x.canvas.height = $('.frequency').height()/halfCanvasDivider;	
	//frequency_brokenMotor_data_x = [...frequency_data[0].FFTMagnitude];
	var mcsaPhaseUVW_Char = new Chart(mcsaPhaseUVW, {
		type: 'bar',
		data: {
			labels: mCUVW_Chart_XData,
			datasets: [{
				label: 'U fázis',
				backgroundColor: color(1),
				borderColor: color(1),
				fill: false,
				data: mCU_Chart_YData,
			},
			{
				label: 'V fázis',
				backgroundColor: color(2),
				borderColor: color(2),
				fill: false,
				data: mCV_Chart_YData,
			},
			{
				label: 'W fázis',
				backgroundColor: color(4),
				borderColor: color(4),
				fill: false,
				data: mCW_Chart_YData,
			}			
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
				text: mCUVW_Title,
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
						labelString: mCUVW_Chart_XLabel,
						fontSize: 14,
						fontFamily: 'Arial',
						fontColor: "#333",
						fontStyle: 'normal',
					},						
				}],
				yAxes: [{
					display: true,
					scaleLabel: {
						display: true,
						labelString: mCUVW_Chart_YLabel,
						fontSize: 14,
						fontFamily: 'Arial',
						fontColor: "#333",
						fontStyle: 'normal',
					},
					gridLines: {
					  display: true ,
					  color: "#ccc"
					}
				}],
			}
		}
	});		
	
