
	var totalCurrentSignal = document.getElementById("totalCurrentSignal").getContext('2d');
	var totalCurrentSignal_Char = new Chart(totalCurrentSignal, {
		type: 'line',
		data: {
			labels: tCS_Chart_XData,
			datasets: [{
				label: 'Összesített áramfelvétel',
				backgroundColor: color(1),
				borderColor: color(1),
				fill: false,
				data: tCS_Chart_YData,
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
				text: tCS_Title,
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
						labelString: tCS_Chart_XLabel,
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
						labelString: tCS_Chart_YLabel,
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
	
