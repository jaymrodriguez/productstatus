      // Callback that creates and populates a data table,
      // instantiates the pie chart, passes in the data and
      // draws it.

        // Create the data table.
        var k12Data = new google.visualization.DataTable();
        k12Data.addColumn('string', 'Behavior');
        k12Data.addColumn('number', 'Number');


    k12Config = {
      'type': 'AreaChart',
      'query': {
        'ids': TABLE_ID,
        'metrics': 'ga:visits',
        'dimensions': 'ga:date',
      },
      'chartOptions': {
        height:200,
      },
      'onSuccess': function(response) {
        var totalVisits = response.totalsForAllResults['ga:visits'];
          // Continue rendering the chart as normal.
          // Note: this points to the instance of the Chart object from which the
          //       onSuccess function is called.
          this.defaultOnSuccess(response);
        }
    }
    
    k12Segment = {
     'divContainer': 'k12',
     'query': {
        'metrics': 'ga:bounces,ga:visits',
        'segment': 'dynamic::ga:landingPagePath==/k-12'
      },
      'chartOptions': {
        title: 'Visits to K12 Landing Page'
      },
      'onSuccess': function(response) {
        k12Visits = response.totalsForAllResults['ga:visits'];
        console.log(k12Visits);
        k12Bounces = response.totalsForAllResults['ga:bounces'];
        console.log(k12Bounces);
          // Continue rendering the chart as normal.
          // Note: this points to the instance of the Chart object from which the
          //       onSuccess function is called.
          this.defaultOnSuccess(response);
        }
    };

    k12ToWizardSegment = {
     'divContainer': 'k12ToWizard',
     'query': {
        'segment': 'dynamic::ga:landingPagePath==/k-12;ga:pagePath==/k-12/search'
      },
      'chartOptions': {
        title: 'K-12 visits to Wizard',
      },
      'onSuccess': function(response) {
       k12ToWizardVisits = response.totalsForAllResults['ga:visits'];
       console.log(k12ToWizardVisits);
          // Continue rendering the chart as normal.
          // Note: this points to the instance of the Chart object from which the
          //       onSuccess function is called.
          this.defaultOnSuccess(response);
        }
    };

    k12ToWizardAndProfileSegment = {
        'divContainer': 'k12ToWizardAndProfile',
        'query': {
            'segment': 'dynamic::ga:landingPagePath==/k-12;ga:pagePath==/k-12/search;ga:eventAction==View'
        },
        'chartOptions': {
          title: 'K-12 visits to Wizard and Profile',
        },
      'onSuccess': function(response) {
         k12ToWizardAndProfileVisits = response.totalsForAllResults['ga:visits'];
         console.log(k12ToWizardAndProfileVisits);
          // Continue rendering the chart as normal.
          // Note: this points to the instance of the Chart object from which the
          //       onSuccess function is called.
          this.defaultOnSuccess(response);
          
        }
        };
    
    
    var k12 = new gadash.Chart(k12Config).set(baseConfig)
                        .set(k12Segment).render();
    var k12ToWizard = new gadash.Chart(k12Config).set(baseConfig)
                        .set(k12ToWizardSegment).render();
    var k12ToWizard = new gadash.Chart(k12Config).set(baseConfig)
                        .set(k12ToWizardAndProfileSegment).render();
    k12Data.addRows([
          ['Landing Visits', 7397],
          ['Landing Bounces',3671],
          ['Landing to Wizard',2759],
          ['Wizard to Profile',1675]
        ]);
    
    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('k12Breakdown'));
        chart.draw(k12Data, breakdownOptions);
    
