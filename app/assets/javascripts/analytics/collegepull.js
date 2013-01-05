function pullCollegeLanding() {
	console.log('start college');
	var startDate = document.getElementById('start-date').value;
	var endDate = document.getElementById('end-date').value;
	console.log(startDate);

	// CollegeData.title = 'College';
	var CollegeLandingVisits = gapi.client.analytics.data.ga.get({
		'ids': 'ga:55161573',
		'start-date': startDate,
		'end-date': endDate,
		'metrics': 'ga:visits',
		'dimensions': 'ga:date',
		'segment': 'dynamic::ga:landingPagePath==/find/college;ga:eventAction!=View',
		'sort': '-ga:date',
		'max-results': 180
		});
	var CollegeLandingBounces = gapi.client.analytics.data.ga.get({
		'ids': 'ga:55161573',
		'start-date': startDate,
		'end-date': endDate,
		'metrics': 'ga:bounces',
		'dimensions': 'ga:date',
		'segment': 'dynamic::ga:landingPagePath==/find/college',
		'sort': '-ga:date',
		'max-results': 180
		});

	var CollegeLandingProfiles = gapi.client.analytics.data.ga.get({
		'ids': 'ga:55161573',
		'start-date': startDate,
		'end-date': endDate,
		'metrics': 'ga:visits',
		'dimensions': 'ga:date',
		'segment': 'dynamic::ga:landingPagePath==/find/college;ga:eventAction==View',
		'sort': '-ga:date',
		'max-results': 180
		});

	var CollegeBatch = gapi.client.newRpcBatch();
	CollegeBatch.add(CollegeLandingBounces, { 'id': 'College Landing Bounces' });
	CollegeBatch.add(CollegeLandingVisits, {'id': 'College Landing Visits to Other Pages'});
	CollegeBatch.add(CollegeLandingProfiles	, {'id': 'College Wizard & Profile'});
	CollegeBatch.execute(collegeCallback);

}

function collegeCallback(resp, rawResp) {

	var data = buildDataFromResponse(resp);
	
	nv.addGraph(function() {
		var chart = nv.models.stackedAreaChart().x(function(d) { return d[0] }).y(function(d) { return d[1] }).clipEdge(false);
			chart.xAxis.tickFormat(function(d) { return d3.time.format('%x')(new Date(d)) });
			chart.yAxis.tickFormat(d3.format(',.2f'));
			d3.select('#college')
			.datum(data)
			.transition().duration(500).call(chart);
		nv.utils.windowResize(chart.update);
	  return chart;
	});
}