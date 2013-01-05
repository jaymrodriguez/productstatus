function pullHomepageLanding() {
	console.log('start home');
	var startDate = document.getElementById('start-date').value;
	var endDate = document.getElementById('end-date').value;

	// HomepageData.title = 'Homepage';
	var HomepageLandingVisits = gapi.client.analytics.data.ga.get({
		'ids': 'ga:55161573',
		'start-date': startDate,
		'end-date': endDate,
		'metrics': 'ga:visits',
		'dimensions': 'ga:date',
		'segment': 'dynamic::ga:landingPagePath==/;ga:pagePath!=/k-12/search,ga:pagePath!=@/find/;ga:eventAction!=View',
		'sort': '-ga:date',
		'max-results': 180
		});
	var HomepageLandingBounces = gapi.client.analytics.data.ga.get({
		'ids': 'ga:55161573',
		'start-date': startDate,
		'end-date': endDate,
		'metrics': 'ga:bounces',
		'dimensions': 'ga:date',
		'segment': 'dynamic::ga:landingPagePath==/,ga:landingPagePath==/welcome',
		'sort': '-ga:date',
		'max-results': 180
		});
	var HomepageLandingWizards = gapi.client.analytics.data.ga.get({
		'ids': 'ga:55161573',
		'start-date': startDate,
		'end-date': endDate,
		'metrics': 'ga:visits',
		'dimensions': 'ga:date',
		'segment': 'dynamic::ga:landingPagePath==/,ga:landingPagePath==/welcome;ga:pagePath==/k-12/search,ga:pagePath=@/find/;ga:eventAction!=View',
		'sort': '-ga:date',
		'max-results': 180
		});
	var HomepageLandingProfiles = gapi.client.analytics.data.ga.get({
		'ids': 'ga:55161573',
		'start-date': startDate,
		'end-date': endDate,
		'metrics': 'ga:visits',
		'dimensions': 'ga:date',
		'segment': 'dynamic::ga:landingPagePath==/;ga:pagePath=@/virtual/wizard,ga:eventAction==clickGetResults;ga:eventAction==View',
		'sort': '-ga:date',
		'max-results': 180
		});

	var HomepageBatch = gapi.client.newRpcBatch();
	HomepageBatch.add(HomepageLandingBounces, { 'id': 'Homepage Landing Bounces' });
	HomepageBatch.add(HomepageLandingVisits, {'id': 'Homepage Landing Visits to Other Pages'});
    HomepageBatch.add(HomepageLandingWizards, {'id': 'Homepage Visits to Wizard'});	
	HomepageBatch.add(HomepageLandingProfiles	, {'id': 'Homepage Wizard & Profile'});
	HomepageBatch.execute(HomepageCallback);

}

function HomepageCallback(resp, rawResp) {
	var data = buildDataFromResponse(resp);
	
	nv.addGraph(function() {
		var chart = nv.models.stackedAreaChart().x(function(d) { return d[0] }).y(function(d) { return d[1] }).clipEdge(false);
			chart.xAxis.tickFormat(function(d) { return d3.time.format('%x')(new Date(d)) });
			chart.yAxis.tickFormat(d3.format(',.2f'));
			d3.select('#homepage')
			.datum(data)
			.transition().duration(500).call(chart);
		nv.utils.windowResize(chart.update);
	  return chart;
	});
}