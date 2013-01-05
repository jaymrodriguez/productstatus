
      // Callback that creates and populates a data table,
      // instantiates the pie chart, passes in the data and
      // draws it.

        // Create the data table.
        var homeData = new google.visualization.DataTable();
        homeData.addColumn('string', 'Behavior');
        homeData.addColumn('number', 'Number');


    homeConfig = {
      'type': 'AreaChart',
      'query': {
        'ids': TABLE_ID,
        'metrics': 'ga:visits',
        'dimensions': 'ga:date',
      },
      'chartOptions': {
        height:200,
      }
    }
    
    homeSegment = {
     'divContainer': 'home',
     'query': {
        'metrics': 'ga:bounces,ga:visits',
        'segment': 'dynamic::ga:landingPagePath==/welcome'
      },
      'chartOptions': {
        title: 'Visits to Home Page'
      },
      'onSuccess': function(response) {
        homeVisits = response.totalsForAllResults['ga:visits'];
        console.log(homeVisits);
        homeBounces = response.totalsForAllResults['ga:bounces'];
        console.log(homeBounces);
          // Continue rendering the chart as normal.
          // Note: this points to the instance of the Chart object from which the
          //       onSuccess function is called.
          this.defaultOnSuccess(response);
        }
    };

    homeToWizardSegment = {
     'divContainer': 'homeToWizard',
     'query': {
        'segment': 'dynamic::ga:landingPagePath==/;ga:pagePath=@/find,ga:pagePath=@/search'
      },
      'chartOptions': {
        title: 'Homepage visits to Wizard',
      },
      'onSuccess': function(response) {
       homeToWizardVisits = response.totalsForAllResults['ga:visits'];
       console.log(homeToWizardVisits);
          // Continue rendering the chart as normal.
          // Note: this points to the instance of the Chart object from which the
          //       onSuccess function is called.
          this.defaultOnSuccess(response);
        }
    };

    homeToWizardAndProfileSegment = {
        'divContainer': 'homeToWizardAndProfile',
        'query': {
            'segment': 'dynamic::ga:landingPagePath==/;ga:pagePath=@/virtual/wizard,ga:eventAction==clickGetResults;ga:eventAction==View'
        },
        'chartOptions': {
          title: 'Homepage visits to Wizard and Profile',
        },
      'onSuccess': function(response) {
         homeToWizardAndProfileVisits = response.totalsForAllResults['ga:visits'];
         console.log(homeToWizardAndProfileVisits);
          // Continue rendering the chart as normal.
          // Note: this points to the instance of the Chart object from which the
          //       onSuccess function is called.
          this.defaultOnSuccess(response);
          
        }
        };
        

    
    
    
    
    home = new gadash.Chart(homeConfig).set(baseConfig)
                        .set(homeSegment).render();
    homeToWizard = new gadash.Chart(homeConfig).set(baseConfig)
                        .set(homeToWizardSegment).render();
    homeToWizard = new gadash.Chart(homeConfig).set(baseConfig)
                        .set(homeToWizardAndProfileSegment).render();
    
    homeData.addRows([
          ['Landing Visits', 3225],
          ['Landing Bounces',1488],
          ['Landing to Wizard',843],
          ['Wizard to Profile',91]
        ]);
    
    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('homeBreakdown'));
        chart.draw(homeData, breakdownOptions);
    



