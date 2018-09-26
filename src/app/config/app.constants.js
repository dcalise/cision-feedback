const AppConstants = {
    appName: 'Miso',
    githubURL: 'https://github.com/dcalise/miso',
    adminEmail: 'calise@gmail.com',
    strings: {
        account: {
            countries: [
                'USA',
                'Canada',
                'Other'
            ],
            accountTypes: [
                'Current customer',
                'Lost customer',
                'Prospect in-cycle',
                'Prospect loss'
            ],
            currentPlatforms: [
                'ProdFake',
                'NewFake',
                'FakeProd',
                'FPR',
                'Other (Please Specify in Notes)'
            ],
            prospectPlatforms: [
                'CompetitorProduct',
                'ProdComp',
                'NotOurProduct',
                'Other (Please Specify in Notes)'
            ],
            currentRelationships: [
                'Legacy GAP. Customer will not upgrade to C3 without this feature',
                'Competitive GAP. Customer will not upgrade to C3 without this feature',
                'Customer AT RISK because this feature is not available',
                'Customer CHURNED because this feature was not available',
                'None of the above'
            ],
            prospectRelationships: [
                'Competitive GAP. Prospect will not sign up to C3 without this feature',
                'Prospect LOST because this feature is not available',
                'None of the above'
            ]
        },
        feature: {
            status: [
                'Received',
                'Under Review',
                'Moved to Backlog',
                'Released',
                'Closed'
            ]
        },
        profile: {
            departments: [
                'Global Insights',
                'Client Development',
                'Client services',
                'Digital Content Support',
                'Marketing',
                'New Business',
                'Product',
                'Product Marketing',
                'Research',
                'Other'
            ]
        }
    }
};

export default AppConstants;
