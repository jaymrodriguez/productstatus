function pullk12Landing() {
	var startDate = document.getElementById('start-date').value;
	var endDate = document.getElementById('end-date').value;

	// k12Data.title = 'K-12';
	var k12LandingVisits = gapi.client.analytics.data.ga.get({
		'ids': 'ga:55161573',
		'start-date': startDate,
		'end-date': endDate,
		'metrics': 'ga:visits',
		'dimensions': 'ga:date',
		'segment': 'dynamic::ga:landingPagePath==/k-12;ga:pagePath!=/k-12/search;ga:eventAction!=View',
		'sort': '-ga:date',
		'max-results': 180
		});
	var k12LandingBounces = gapi.client.analytics.data.ga.get({
		'ids': 'ga:55161573',
		'start-date': startDate,
		'end-date': endDate,
		'metrics': 'ga:bounces',
		'dimensions': 'ga:date',
		'segment': 'dynamic::ga:landingPagePath==/k-12',
		'sort': '-ga:date',
		'max-results': 180
		});
	var k12LandingWizards = gapi.client.analytics.data.ga.get({
		'ids': 'ga:55161573',
		'start-date': startDate,
		'end-date': endDate,
		'metrics': 'ga:visits',
		'dimensions': 'ga:date',
		'segment': 'dynamic::ga:landingPagePath==/k-12;ga:pagePath==/k-12/search;ga:eventAction!=View',
		'sort': '-ga:date',
		'max-results': 180
		});
	var k12LandingProfiles = gapi.client.analytics.data.ga.get({
		'ids': 'ga:55161573',
		'start-date': startDate,
		'end-date': endDate,
		'metrics': 'ga:visits',
		'dimensions': 'ga:date',
		'segment': 'dynamic::ga:landingPagePath==/k-12;ga:pagePath==/k-12/search;ga:eventAction==View',
		'sort': '-ga:date',
		'max-results': 180
		});

	var k12Batch = gapi.client.newRpcBatch();
	k12Batch.add(k12LandingBounces, { 'id': 'K-12 Landing Bounces' });
	k12Batch.add(k12LandingVisits, {'id': 'K-12 Landing Visits to Other Pages'});
    k12Batch.add(k12LandingWizards, {'id': 'K-12 Visits to Wizard'});	
	k12Batch.add(k12LandingProfiles	, {'id': 'K-12 Wizard & Profile'});
	k12Batch.execute(k12Callback);

}

function k12Callback(resp, rawResp) {

	var data = buildDataFromResponse(resp);
	
	nv.addGraph(function() {
		var chart = nv.models.stackedAreaChart().x(function(d) { return d[0] }).y(function(d) { return d[1] }).clipEdge(false);
			chart.xAxis.tickFormat(function(d) { return d3.time.format('%x')(new Date(d)) });
			chart.yAxis.tickFormat(d3.format(',.2f'));
			d3.select('#k12')
			.datum(data)
			.transition().duration(500).call(chart);
		nv.utils.windowResize(chart.update);
	  return chart;
	});
}