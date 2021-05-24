export default [
    {
		name : 'POC Amplifon',
		data : {
			options : {
				apiBaseURL : 'https://b2wgindemous.herokuapp.com/b2wgin/api/20r3.0',
				organizationId : '00D09000005NeNFEA0',
				clientId : 'pr3s4l35_r31!2021',
				userLanguage	: 'en_US',
				GetStructure	: false,
				GetAllData		: false,
				itemsForPage	: 50,
				logLevel		: 'TRACE',
				engineVersion	: 'v2',
				catalogId		: 'a0R090000013YPgEAM',
				facts			: {
					configuration : {
						configurationdate 	: '20210413',
					},
					account : {
						industry : 'Healthcare'
					}
				},
				logsTracking : false
			}
		}
	},
	{
		name : 'NEXI UAT Perf',
		data : {
			options : {
				apiBaseURL : 'https://b2wingincoll3.herokuapp.com/b2wgin/api/20r1.1',
				organizationId : '00D1x00000019HjEAI',
				clientId : '82w61Nn3X17uaTP3rF1',
				userLanguage	: 'en_US',
				GetStructure	: false,
				GetAllData		: false,
				itemsForPage	: 50,
				logLevel		: 'TRACE',
				engineVersion	: 'v2',
				catalogId		: 'a0K0N00000GnkWiUAJ',
				facts: {
					"configuration": {
					  "configurationdate": "20200601",
					  "OB_EXCH_Commission__c": false,
					  "NE__EngineType__c": "b2wgin",
					  "NE__type__c": "",
					  "NE__order_date__c": "2020-06-01",
					  "NE__accountid__c": "0019E00000tpsXO",
					  "NE__servaccid__c": "0019E00000tpsXO",
					  "NE__configurationstatus__c": "In progress",
					  "NE__billaccid__c": "0019E00000tpsXO",
					  "NE__billingprofid__c": "a051l0000027a8wAAA",
					  "NE__CatalogId__c": "",
					  "NE__CommercialModelId__c": "",
					  "NE__OptyId__c": "",
					  "NE__Quote__c": "",
					  "RecordTypeId": "",
					  "NE__Version__c": 1,
					  "NE__One_Time_Fee_Total__c": null,
					  "NE__Recurring_Charge_Total__c": null,
					  "NE__TotalRecurringFrequency__c": "",
					  "NE__OrderStatus__c": "Pending",
					  "ob_gt__c": "Nexi",
					  "MCC": "5200",
					  "ob_business_model_acquiring__c": "Bancario",
					  "ob_business_model_pos__c": "Trilaterale Nuovo",
					  "ob_main_process": "Setup",
					  "ob_sub_process": "",
					  "OB_Abi__c": "03138",
					  "OB_Cab__c": "12300",
					  "OB_Other_Acquirer__c": "Amex;Diners;Aura;Agos;Pellegrini;QN",
					  "OB_Circuit__c": "Micropagamenti",
					  "OB_Service_Point_Type__c": "Fisico",
					  "OB_Apm_Circuit__c": "PayPal;Masterpass;Applepay;NexiPay;AmazonPay;GooglePay;Klarna Paga Ora;Wechat;Alipay;MyBank;Instant Payment",
					  "OB_VAS__c": "OneClick;Recurring;Incasso Differito;Sicurezza Transazione Statica;Servizio DCC;Servizo MCC;Get Your Bill;Market Place;SDK Mobile;Allineamento ABU e VAU;Tokenizzazione da POS",
					  "OB_Applicant_RAC_Code_SIA__c": "Banca",
					  "OB_Terminal_Id_Generator__c": "Nexi",
					  "OB_Predefault__c": "true",
					  "OB_Variation__c": "",
					  "OB_VariationPOS__c": "",
					  "OB_JCBUPIAlert__c": false,
					  "OB_PredefaultPOS__c": true,
					  "OB_AgreedChanges__c": false,
					  "OB_ApprovalLevel__c": "",
					  "OB_isSkipToIntBE": false,
					  "NE__Status__c": "Prospect",
					  "OB_isNexiAcquirer__c": true,
					  "OB_IsActiveOfferOnSp__c": false,
					  "OB_Active_Terminals__c": null,
					  "OB_Status__c": "Active",
					  "OB_Terminal_Id_Gateway__c": ""
					},
					"account": {
					  "accounttype": "",
					  "currentuserid": "0059E000005x2iF",
					  "industry": "",
					  "subsector": ""
					},
					"user": {
					  "profilename": "Nexi Partner User"
					},
					"servicepoint": {},
					"serviceaccount": {
					  "region": "",
					  "state": "",
					  "street": "",
					  "postalcode": "",
					  "city": "",
					  "country": ""
					},
					"billingaccount": {
					  "region": "",
					  "state": "",
					  "street": "",
					  "postalcode": "",
					  "city": "",
					  "country": ""
					},
					"sessionparameter": [
					  {
						"name": "logLevel",
						"value": "DEBUG"
					  },
					  {
						  "name": "isAgente",
						"value": false
					  }
					]
				},
				logsTracking : false
			}
		}
	},
	{
		name: 'Telco Wholesale',
		data: {
			options: {
				apiBaseURL		: 'https://b2wgindemo.herokuapp.com/b2wgin/api/20r3.0',
				serviceBaseURL	: 'https://b2wgindemo.herokuapp.com/b2wgin/services',
				organizationId	: '00D09000005NeLLEA0',
				clientId		: 'pr3s4l35_t21!2021',
				catalogId 		: '',
				userLanguage	: 'en_US',
				GetStructure	: false,
				GetAllData		: false,
				partialSession	: false,
				showTelcoSP 	: true,
				itemsForPage	: 50,
				logLevel		: 'TRACE',
				engineVersion	: 'v2',
				cart_administration: 
				{
					Options:
					{
						mapOfLwcConfigurationEngine:
						{
							defaultItemServicePointEligible: true
						}
					}
				},
				facts			: 
				{
					"account": [
						{
							"AccountRTAux": "Consumer",
							"accountname": "John Smith",
							"accounttype": "",
							"industry": "",
							"subsector": ""
						}
					],
					"servicepoint": [
						{
							"id": "a1W090000010xg7EAA",
							"name": "site 1",
							"rtypename": "Standard",
							"technical_coverage": "ADSL"
						}
					]			
				},
				logsTracking 	: false
			}
		}
	}
];