
	var mcsaPhasePark = document.getElementById("mcsaPhasePark").getContext('2d');
	var mcsaPhasePark_Char = new Chart(mcsaPhasePark, {
		type: 'bar',
		data: {
			labels: mCPark_Chart_XData,
			datasets: [{
				label: 'Park vektor',
				backgroundColor: color(1),
				borderColor: color(1),
				fill: false,
				data: mCPark_Chart_YData,
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
				text: mCPark_Title,
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
						labelString: mCPark_Chart_XLabel,
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
						labelString: mCPark_Chart_YLabel,
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
	
