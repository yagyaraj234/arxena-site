this; //-----------------------------------------------------------------------
// Setup
//-----------------------------------------------------------------------------

var myDiagram;
var delayTimer;
if (window.location.href.includes("localhost")) {
	var base_url = "http://localhost:5050";
} else {
	var base_url = "https://arxena.com";
}

$(document).ready(function () {
	console.log("document ready FUNCTION CALLED");
	console.log(
		"[ARXENA INFO] \nPlease check this article https://help.arxena.com or contact our support at help@arxena.com \n\n*Submit a ticket using the link below if you think this is a bug\n"
	);
	console.log("ready!");
	console.log(
		"LOAD TYPE:::!",
		document.getElementById("load_type").getAttribute("data-row")
	);
	new UtilityFunctions().setUPSessionStorageVariables();
	// resetLocalStorageCredentialsAndSetLogonStatus()
	new ProcessNodesStates().initializeSessionStorageforDropdowns();
	shift_key_pressed = false;
	$(document).on("keyup keydown", function (e) {
		shift_key_pressed = e.shiftKey;
	});
	mobile = false;
	var width = window.innerWidth > 0 ? window.innerWidth : screen.width;
	if (width < 480) {
		mobile = true;
	}
	document.title = "Arxena's Org Charts (Global) - Arxena";
	new UtilityFunctions().runNavigation();
	new UtilityFunctions().detectModalClosuresAndCloseItems();
});

class SessionStorageUpdates {


	updatePromptEnumTextareaList(){
		sessionStorage['prompt_enum_list'] = JSON.stringify($('#prompt_enum_textarea').textext()[0].tags()['_formData'])
	}



	updateFirstName(user_input) {
		console.log("updateFirstName FUNCTION CALLED");
		console.log("First name updated too ::", user_input.value);

		sessionStorage["first_name"] = user_input.value;
	}

	updateFullName(user_input) {
		console.log("updateFullName FUNCTION CALLED");
		console.log("Full name updated too ::", user_input.value);
		sessionStorage["full_name"] = user_input.value;
	}

	updateLastName(user_input) {
		console.log("updateLastName FUNCTION CALLED");
		console.log("Last name updated too ::", user_input.value);
		sessionStorage["last_name"] = user_input.value;
	}

	updatePassword(user_input) {
		console.log("updatePassword FUNCTION CALLED");
		console.log("Password updated too ::", user_input.value);
		sessionStorage["password"] = user_input.value;
	}

	updatePasswordConfimation(user_input) {
		console.log("updatePasswordConfimation FUNCTION CALLED");
		sessionStorage["confirm_password"] = user_input.value;
	}

	updateCompanyName(user_input) {
		console.log("updateCompanyName FUNCTION CALLED");
		sessionStorage["company_name"] = user_input.value;
	}

	updateEmail(user_input) {
		console.log("updateEmail FUNCTION CALLED");
		console.log("Email updated too ::", user_input.value);
		var value_entered_by_user = user_input.value;
		if (
			["gmail", "hotmail", "yahoo", "msn"].some((v) =>
				value_entered_by_user.includes(v)
			)
		) {
			try {
				document.getElementById("signup_error").innerHTML =
					'<br><span style="color:red">Please use a valid business email :-)</span>';
			} catch (error) {
				console.log("Error:", error);
			}

			try {
				document.getElementById("login_error").innerHTML =
					'<br><span style="color:red">Please use a valid business email :-)</span>';
				document.getElementById("login_error_mobi").innerHTML =
					'<br><span style="color:red">Please use a valid business email :-)</span>';
			} catch (error) {
				console.log("Error:", error);
			}
		}

		sessionStorage["email"] = value_entered_by_user;
	}
	updatePhone(user_input) {
		console.log("updatePhone FUNCTION CALLED");
		console.log("updatePhone updated too ::", user_input.value);
		sessionStorage["phone"] = user_input.value;
	}

	updateLinkedinLink(user_input) {
		console.log("updateLinkedinLink FUNCTION CALLED");
		sessionStorage["linkedin_link"] = user_input.value;
	}

	updateheadline(user_input) {
		console.log("updatePersonName FUNCTION CALLED");
		sessionStorage["new_block_headline"] = user_input.value;
	}

	updateCountry(user_input) {
		console.log("updateCountry FUNCTION CALLED");
		sessionStorage["new_block_country"] = user_input.value;
	}

	updatePersonName(user_input) {
		console.log("updatePersonName FUNCTION CALLED");
		sessionStorage["new_block_person_name"] = user_input.value;
	}

	updatePersonTitle(user_input) {
		console.log("updatePersonTitle FUNCTION CALLED");
		sessionStorage["new_block_person_title"] = user_input.value;
	}
}

class Pages {


	refreshUserfromBackend() {
		var height = ($(window).height() - 184).toString(); // -188
		var width = $(window).width();

		console.log("This is the refreshUserfromBackend");
		$.ajax({
			url: "/refresh_user",
			type: "POST",
			data: { user_id: localStorage["user_id"], params: params_obj },
		}).done(function (data) {
			var payment_plans = JSON.parse(sessionStorage["payment_plans"]);
			var geo = sessionStorage["geo_country_selected"];
			var paymentPlansGeoObj = new PaymentPlans().getPaymentPlansBasedonGeo(geo);

			var payment_geo_selected = sessionStorage["geo_country_selected"];
			console.log("AJAX to hit refresh_user ");
			console.log("This is the AJAX response ", data);
			if (typeof data != "string") {
				let plan_data = data["user"]["plan"];
				console.log("Plan data:", plan_data)
				if (plan_data["plan"] == "plan_0") {
					var current_plan_label =
						'<span style="font-size:11pt; background-color:rgb(91, 192, 222); color:white; border-radius:5px; padding:3px">Free</span>';
						var google_auth_status =
						'<span style="font-size:11pt; background-color:rgb(91, 192, 222); color:white; border-radius:5px; padding:3px">Unknown</span>';

					date_next_renewal = "-"; //plan_data['date_next_renewal']
					let api_key_section = "";
					credits_topup_section = "";
				} else if (plan_data["plan"] == "plan_1") {
					var current_plan_label =
						'<span style="font-size:11pt; background-color:rgb(91, 192, 222); color:white; border-radius:5px; padding:3px">Startup</span>';
						var google_auth_status =
						'<span style="font-size:11pt; background-color:rgb(91, 192, 222); color:white; border-radius:5px; padding:3px">Unknown</span>';

						var date_next_renewal = plan_data["date_next_renewal"];
					// api_key_section = document.getElementById("api_key_section_element").innerHTML.replace(/{api_key}/g, JSON.parse(localStorage['user'])['_id'])
					var credits_topup_section = document
						.getElementById("credits_topup_section_element")
						.innerHTML.replaceAll(
							"{credits_1}",
							paymentPlansGeoObj["credits_1_credits"]
						)
						.replaceAll("{credits_2}", paymentPlansGeoObj["credits_2_credits"])
						.replaceAll("{credits_3}", paymentPlansGeoObj["credits_3_credits"])
						.replaceAll("{credits_4}", paymentPlansGeoObj["credits_4_credits"])
						.replaceAll("{credits_5}", paymentPlansGeoObj["credits_5_credits"])
						.replaceAll(
							"{credits_1_price}",
							paymentPlansGeoObj["credits_1_price"]
						)
						.replaceAll(
							"{credits_2_price}",
							paymentPlansGeoObj["credits_2_price"]
						)
						.replaceAll(
							"{credits_3_price}",
							paymentPlansGeoObj["credits_3_price"]
						)
						.replaceAll(
							"{credits_4_price}",
							paymentPlansGeoObj["credits_4_price"]
						)
						.replaceAll(
							"{credits_5_price}",
							paymentPlansGeoObj["credits_5_price"]
						)
						.replaceAll(
							"{credits_symbol}",
							paymentPlansGeoObj["currency_symbol"]
						);
				} else if (plan_data["plan"] == "plan_2") {
					console.log("got plan 2 ")
					var current_plan_label =
						'<span style="font-size:11pt; background-color:rgb(91, 192, 222); color:white; border-radius:5px; padding:3px">Small Business</span>';
						var google_auth_status =
						'<span style="font-size:11pt; background-color:rgb(91, 192, 222); color:white; border-radius:5px; padding:3px">Unknown</span>';

						var date_next_renewal = plan_data["date_next_renewal"];
					try {
						// api_key_section = document.getElementById("api_key_section_element").innerHTML.replace(/{api_key}/g, JSON.parse(localStorage['user'])['_id'])
					} catch {
						// api_key_section = localStorage['user']
					}

					var credits_topup_section = document
						.getElementById("credits_topup_section_element")
						.innerHTML.replaceAll(
							"{credits_1}",
							paymentPlansGeoObj["credits_1_credits"]
						)
						.replaceAll("{credits_2}", paymentPlansGeoObj["credits_2_credits"])
						.replaceAll("{credits_3}", paymentPlansGeoObj["credits_3_credits"])
						.replaceAll("{credits_4}", paymentPlansGeoObj["credits_4_credits"])
						.replaceAll("{credits_5}", paymentPlansGeoObj["credits_5_credits"])
						.replaceAll(
							"{credits_1_price}",
							paymentPlansGeoObj["credits_1_price"]
						)
						.replaceAll(
							"{credits_2_price}",
							paymentPlansGeoObj["credits_2_price"]
						)
						.replaceAll(
							"{credits_3_price}",
							paymentPlansGeoObj["credits_3_price"]
						)
						.replaceAll(
							"{credits_4_price}",
							paymentPlansGeoObj["credits_4_price"]
						)
						.replaceAll(
							"{credits_5_price}",
							paymentPlansGeoObj["credits_5_price"]
						)
						.replaceAll(
							"{credits_symbol}",
							paymentPlansGeoObj["currency_symbol"]
						);
				} else if (plan_data["plan"] == "plan_3") {
					var current_plan_label =
						'<span style="font-size:11pt; background-color:rgb(91, 192, 222); color:white; border-radius:5px; padding:3px">' +
						"Enterprise" +
						"</span>";
						var google_auth_status =
						'<span style="font-size:11pt; background-color:rgb(91, 192, 222); color:white; border-radius:5px; padding:3px">Unknown</span>';

						var date_next_renewal = plan_data["date_next_renewal"];
					// api_key_section = document.getElementById("api_key_section_element").innerHTML.replace(/{api_key}/g, JSON.parse(localStorage['user'])['_id'])
					var credits_topup_section = document
						.getElementById("credits_topup_section_element")
						.innerHTML.replaceAll(
							"{credits_1}",
							paymentPlansGeoObj["credits_1_credits"]
						)
						.replaceAll("{credits_2}", paymentPlansGeoObj["credits_2_credits"])
						.replaceAll("{credits_3}", paymentPlansGeoObj["credits_3_credits"])
						.replaceAll("{credits_4}", paymentPlansGeoObj["credits_4_credits"])
						.replaceAll("{credits_5}", paymentPlansGeoObj["credits_5_credits"])
						.replaceAll(
							"{credits_1_price}",
							paymentPlansGeoObj["credits_1_price"]
						)
						.replaceAll(
							"{credits_2_price}",
							paymentPlansGeoObj["credits_2_price"]
						)
						.replaceAll(
							"{credits_3_price}",
							paymentPlansGeoObj["credits_3_price"]
						)
						.replaceAll(
							"{credits_4_price}",
							paymentPlansGeoObj["credits_4_price"]
						)
						.replaceAll(
							"{credits_5_price}",
							paymentPlansGeoObj["credits_5_price"]
						)
						.replaceAll(
							"{credits_symbol}",
							paymentPlansGeoObj["currency_symbol"]
						);
				} else {
					var current_plan_label =
						'<span style="font-size:11pt; background-color:rgb(91, 192, 222); color:white; border-radius:5px; padding:3px">' +
						"Custom Plan" +
						"</span>";
						var google_auth_status =
						'<span style="font-size:11pt; background-color:rgb(91, 192, 222); color:white; border-radius:5px; padding:3px">Unknown</span>';

						var date_next_renewal = plan_data["date_next_renewal"];
					// api_key_section = document.getElementById("api_key_section_element").innerHTML.replace(/{api_key}/g, JSON.parse(localStorage['user'])['_id'])
					var credits_topup_section = document
						.getElementById("credits_topup_section_element")
						.innerHTML.replaceAll(
							"{credits_1}",
							paymentPlansGeoObj["credits_1_credits"]
						)
						.replaceAll("{credits_2}", paymentPlansGeoObj["credits_2_credits"])
						.replaceAll("{credits_3}", paymentPlansGeoObj["credits_3_credits"])
						.replaceAll("{credits_4}", paymentPlansGeoObj["credits_4_credits"])
						.replaceAll("{credits_5}", paymentPlansGeoObj["credits_5_credits"])
						.replaceAll(
							"{credits_1_price}",
							paymentPlansGeoObj["credits_1_price"]
						)
						.replaceAll(
							"{credits_2_price}",
							paymentPlansGeoObj["credits_2_price"]
						)
						.replaceAll(
							"{credits_3_price}",
							paymentPlansGeoObj["credits_3_price"]
						)
						.replaceAll(
							"{credits_4_price}",
							paymentPlansGeoObj["credits_4_price"]
						)
						.replaceAll(
							"{credits_5_price}",
							paymentPlansGeoObj["credits_5_price"]
						)
						.replaceAll(
							"{credits_symbol}",
							paymentPlansGeoObj["currency_symbol"]
						);
				}

				let total_credits_avalable = plan_data["credits"];
				try {
					var num_people_referred = plan_data["people_referred"].length;
				} catch {
					var num_people_referred = 0;
				}

				var num_people_referred_label = "users referred";

				document.getElementById("all_content").innerHTML = document
					.getElementById("dashboard_page_element")
					.innerHTML.replace(/{screen_height}/g, height)
					.replace(/{email}/g, localStorage["email"])
					.replace(/{current_plan_label}/g, current_plan_label)
					.replace(/{google_auth_status}/g, google_auth_status)
					.replace(/{date_next_renewal}/g, date_next_renewal)
					.replace(/{total_credits_avalable}/g, total_credits_avalable)
					.replace(/{num_people_referred}/g, num_people_referred)
					.replace(/{num_people_referred_label}/g, num_people_referred_label)
					// .replace(/{api_key_section}/g, api_key_section)
					.replace(/{credits_topup_section}/g, credits_topup_section);

				document.getElementById("pricing_payment_section").innerHTML =
					document.getElementById("pricing_payment_data").innerHTML;
				new PaymentPlans().setDashboardPrices();
				initialiseFunctionRangeSliderValue();
				if (plan_data["plan"] == "plan_0") {
					document.getElementById("button_plan0").innerHTML =
						'<div class="small_button_white" style="display:inline-block; width:110px">Current plan</div><br><span style="cursor:pointer; color:grey" onclick="cancelPlan()">Cancel</span><br><br>';
				} else if (plan_data["plan"] == "plan_1") {
					document.getElementById("button_plan1").innerHTML =
						'<div class="small_button_white" style="display:inline-block; width:110px">Current plan</div><br><span style="cursor:pointer; color:grey" onclick="cancelPlan()">Cancel</span><br><br>';
				} else if (plan_data["plan"] == "plan_2") {
					document.getElementById("button_plan2").innerHTML =
						'<div class="small_button_white" style="display:inline-block; width:110px">Current plan</div><br><span style="cursor:pointer; color:grey" onclick="cancelPlan()">Cancel</span><br><br>';
				}
				new UtilityFunctions().activateToolTips();
				// $('[data-toggle="tooltip"]').tooltip({
				//         placement : 'top'
				//     });
			} else {
				new UtilityFunctions().clearStoragesandReload();
				new PageContents().changePage("/#");
			}
			console.log(data.user);
			localStorage["user"] = JSON.stringify(data.user);
			new PageContents().setLogonStatus();
		});
	}

	resetLocalStorageCredentialsAndSetLogonStatus() {
		localStorage["email"] = "";
		localStorage["full_name"] = "";
		localStorage["user_id"] = "";
		localStorage["user"] = "{}";
		new PageContents().setLogonStatus();
	}

	dashboardPage() {
		console.log("dashboardPage FUNCTION CALLED");
		var height = ($(window).height() - 61).toString();
		sessionStorage["plans_billing"] = "monthly";
		var params_obj = updateParamsObj();
		new Pages().refreshUserfromBackend();
		mixpanel.track("DashboardLoaded", {});
	}
	signupPage() {
		console.log("signupPage FUNCTION CALLED");
		sessionStorage["email"] = "";
		sessionStorage["password"] = "";
		sessionStorage["confirm_password"] = "";
		sessionStorage["use_case"] = "";
		sessionStorage["full_name"] = "";
		$("body").css("background-color", "rgb(36,116,204)");

		// this is the special signup page for Jens marketing

		document.getElementById("all_content").innerHTML =
			document.getElementById("new_signup_page").innerHTML;
		// var input = document.querySelector("#phone");
		new UtilityFunctions().setIntPhoneNumbers();
		new UtilityFunctions().activateToolTips();

		// if enter is pressed, then submit the form
		$(".enter_click").keydown(function (event) {
			var keyCode = event.keyCode ? event.keyCode : event.which;
			// console.log(keyCode)
			if (keyCode == 13) {
				new PageContents().signUp();
			}
		});
		$("#signup_button_desktop").attr("tabindex", -1).focus();
	}

	privacyPage() {
		console.log("privacyPage FUNCTION CALLED");
		$("body").css("background-color", "white");
		document.getElementById("all_content").innerHTML =
			document.getElementById("privacy_page").innerHTML;
	}

	eulaPage() {
		console.log("eulaPage FUNCTION CALLED");
		$("body").css("background-color", "white");
		document.getElementById("all_content").innerHTML =
			document.getElementById("eula_page").innerHTML;
	}

	apiPage() {
		console.log("apiPage FUNCTION CALLED");
		$("body").css("background-color", "white");
		document.getElementById("all_content").innerHTML =
			document.getElementById("api_docs_page").innerHTML;
	}
	pricingPage() {
		console.log("pricingPage FUNCTION CALLED");
		$("body").css("background-color", "white");
		document.getElementById("all_content").innerHTML =
			document.getElementById("pricing_page").innerHTML;
		document.getElementById("pricing_page_pricing_payment_section").innerHTML =
			document.getElementById("pricing_payment_data").innerHTML;
		new PaymentPlans().setDashboardPrices();
		initialiseFunctionRangeSliderValue();
		if (sessionStorage["logon"] == "false") {
			changeSelectPricingPlantoSignup();
		}
	}

	loginPage() {
		console.log("loginPage FUNCTION CALLED");

		console.log("Got to login page function");
		console.log("This is the count access ting");
		try {
			$(sign_up_modal).modal("hide");
		} catch (error) {
			console.log("Error:", error);
		}
		// console.log(localStorage);
		var params_obj = updateParamsObj();
		// This goes directly to the damn app page if there were tokens in the localstorage hive
		if (
			localStorage["email"] != "" &&
			localStorage["user_id"] != "" &&
			localStorage["email"] != undefined &&
			localStorage["user_id"] != undefined
		) {
			console.log("We are here boss for authentication");
			console.log("Çurrent paramsobj == ", sessionStorage["params_obj"]);
			$.ajax({
				url: "/auth/login",
				type: "POST",
				// headers: {'Cookie' : document.cookie },
				data: {
					email: localStorage["email"],
					user_id: localStorage["user_id"],
					params: params_obj,
					visitor_fp: sessionStorage["visitor_fp"],
				},
			}).done(function (data) {
				console.log("AJAX to hit /auth/login ");
				console.log("This is the AJAX response ", data);
				console.log("This is after login back login is okay");
				console.log(data);
				if (data.status == "login_ok") {
					console.log("login is okay");
					localStorage["email"] = data.user["email"];
					localStorage["user_id"] = data.user["_id"];
					console.log("This is data.user:::", data.user);
					localStorage["user"] = JSON.stringify(data.user);
					new PageContents().setLogonStatus();
					new ProcessNodesStates().initializeSessionStorageforDropdowns();
					// sessionStorage['logon'] = 'true'
					// drift_append_email()
					new PageContents().setMixPanelAliasUser();
					new PageContents().setMixPanelIdentifyUser();
					// new PageContents().changePage("/org-chart");

					// Changing the starting point to lists page
					new Pages().switchAllContentToSearchPage()
					// new PageContents().changePage("/lists");
					new PageContents().changePage("/lists");


				} else {
					new Pages().resetLocalStorageCredentialsAndSetLogonStatus();
					console.log("login is not  at all okay");
					// sessionStorage['email']=''
					// sessionStorage['password']=''
					// $("body").css("background-color","rgb(7,93,102)");
					document.getElementById("all_content").innerHTML =
						document.getElementById("new_login_page").innerHTML;
					// $('[data-toggle="tooltip"]').tooltip({
					// placement : 'top'
					// });
					new UtilityFunctions().activateToolTips();

					// if enter is pressed, then submit the form
					$(".enter_click").keydown(function (event) {
						var keyCode = event.keyCode ? event.keyCode : event.which;
						console.log(keyCode);
						if (keyCode == 13) {
							new PageContents().logIn();
						}
					});
					$("#login_button_desktop").attr("tabindex", -1).focus();
				}
			});
		} else {
			console.log("got here");
			console.log(
				" There are no tokens in the local storage hive, hence lloading the login"
			);
			new Pages().resetLocalStorageCredentialsAndSetLogonStatus();

			console.log("localstorage type things??");
			// sessionStorage['email']=''
			// sessionStorage['password']=''
			// $("body").css("background-color","rgb(36,116,204)");
			document.getElementById("all_content").innerHTML =
				document.getElementById("new_login_page").innerHTML;
			// $('[data-toggle="tooltip"]').tooltip({
			// placement : 'top'
			// });
			new UtilityFunctions().activateToolTips();

			// if enter is pressed, then submit the form
			$(".enter_click").keydown(function (event) {
				var keyCode = event.keyCode ? event.keyCode : event.which;
				console.log(keyCode);
				if (keyCode == 13) {
					new PageContents().logIn();
				}
			});
			$("#login_button_desktop").attr("tabindex", -1).focus();
		}
	}

	jobsPage() {
		console.log("jobsPage FUNCTION CALLED");
		var height = ($(window).height() - 122).toString();
		var height_for_onboarding_flow = ($(window).height() - 122 - 6).toString();
		var loader = '<div style="width:100%;text-align:center; padding:40px"><img style="width:30px" src="/static/img/new_loading2.gif"/><br><br><span style="font-size:10pt">Searching your data...</span></div>';
		document.getElementById("right_search_results_people_companies_orgcharts" ).innerHTML = loader;
		let customer_status =     JSON.parse(localStorage['user'])['plan']['customer_status']
		if (customer_status!='unpaid_customer'){
			document.getElementById("inside_panel_content_container").innerHTML = document.getElementById("inside_panel_content_account_element").innerHTML;
			document.getElementById("inside_panel_content_container_mobi").innerHTML = document.getElementById("inside_panel_content_account_element").innerHTML;
			console.log("got here for ajax call");
			document.getElementById("header_element").innerHTML = document.getElementById("org_chart_header_element").innerHTML;
			new ListPageElements().createAllJobsListings();
			document.getElementById( "left_panel_toggle_navigation_companies" ).style.fontWeight = "";
			document.getElementById( "left_panel_toggle_navigation_companies" ).style.textDecoration = "";
			document.getElementById( "left_panel_toggle_navigation_companies" ).style.textDecorationThickness = "";
			document.getElementById( "left_panel_toggle_navigation_people" ).style.fontWeight = "";
			document.getElementById( "left_panel_toggle_navigation_people" ).style.textDecoration = "";
			document.getElementById( "left_panel_toggle_navigation_people" ).style.textDecorationThickness = "";
			document.getElementById( "left_panel_toggle_navigation_orgcharts" ).style.fontWeight = "";
			document.getElementById( "left_panel_toggle_navigation_orgcharts" ).style.textDecoration = "";
			document.getElementById( "left_panel_toggle_navigation_orgcharts" ).style.textDecorationThickness = "";
			document.getElementById( "left_panel_toggle_navigation_lists" ).style.fontWeight = "900";
			document.getElementById( "left_panel_toggle_navigation_lists" ).style.textDecoration = "underline";
			document.getElementById( "left_panel_toggle_navigation_lists" ).style.textDecorationThickness = "3px";
			document.getElementById("linkedin_icon_header").innerHTML = "";
			// document.getElementById("toggle_navigation_companies_people").innerHTML= ""
			// document.getElementById("linkedin_icon_header").innerHTML= ""
			new LeftPanelDropdownFilters().loadFiltersPanel("jobs");
			new LeftPanelDropdownFilters().removeInputsinLeftPanel();
			new Pages().setLoginLogoutTopBar();
			document.getElementById("search_bar_search_center").style.display = "none";
			document.getElementById('right_panel_org_chart_people_companies').style.display="none"
		}

		else{
			document.getElementById('right_search_results_people_companies_orgcharts').innerHTML = document.getElementById("payment_page").innerHTML
		}

	}

	setLoginLogoutTopBar() {
		if ("email" in localStorage) {
			if (sessionStorage["logon"] == "true") {
				var loggedin = true;
				document.getElementById("elements_loggedin_logged_out").innerHTML =
					document
						.getElementById("loggedin_elements")
						.innerHTML.replace(/{email}/g, localStorage["email"]);
				document.getElementById("elements_loggedin_logged_out_mobi").innerHTML =
					document
						.getElementById("loggedin_elements_mobi")
						.innerHTML.replace(/{email}/g, localStorage["email"]);
			} else {
				var loggedin = false;
				document.getElementById("elements_loggedin_logged_out").innerHTML =
					document.getElementById("loggedout_elements").innerHTML;
				document.getElementById("elements_loggedin_logged_out_mobi").innerHTML =
					document.getElementById("loggedout_elements_mobi").innerHTML;
			}
		} else {
			var loggedin = false;
			document.getElementById("elements_loggedin_logged_out").innerHTML =
				document.getElementById("loggedout_elements").innerHTML;
			document.getElementById("elements_loggedin_logged_out_mobi").innerHTML =
				document.getElementById("loggedout_elements_mobi").innerHTML;
		}
	}

	setAllContentLoginLogout() {
		console.log("searchPage FUNCTION CALLED");
		var height = ($(window).height() - 122).toString();
		var height_for_onboarding_flow = ($(window).height() - 122 - 6).toString();
		document.getElementById("all_content").innerHTML = document
			.getElementById("search_page_element")
			.innerHTML.replace(/{screen_height}/g, height)
			.replace(/{email}/g, localStorage["email"])
			.replace(/{height_panel}/g, height)
			.replace(/{height_for_onboarding_flow}/g, height_for_onboarding_flow);
		this.setLoginLogoutTopBar();
		new PageContents().setTopBar();
		// Removing the org toggle navigation temporarily so that user doesn't have to see the people and company tabs
		document.getElementById("toggle_navigation_companies_people").innerHTML =
			document.getElementById(
				"toggle_navigation_companies_people_element"
			).innerHTML;
		// This is for the left panel with the company details
		document.getElementById("inside_panel_content_container").innerHTML =
			document.getElementById("inside_panel_content_account_element").innerHTML;
		document.getElementById("inside_panel_content_container_mobi").innerHTML =
			document.getElementById("inside_panel_content_account_element").innerHTML;
	}

	switchAllContentToSearchPage() {
		new Pages().setAllContentLoginLogout();
		sessionStorage["org_analytics"] = document.getElementById(
			"inside_panel_content_account_element"
		).innerHTML;
		sessionStorage["current_focus"] = "orgcharts";
		console.log("got here for ajax call");
		document.getElementById(
			"right_search_results_people_companies_orgcharts"
		).innerHTML = document.getElementById("start_search_element").innerHTML;
		document.getElementById(
			"right_search_results_people_companies_orgcharts_mobi"
		).innerHTML = document.getElementById("start_search_element").innerHTML;
	}

	searchPage() {
		this.switchAllContentToSearchPage();

		if (window.location.href.includes("people")) {
			new Toggle().togglePeople();
		} else if (window.location.href.includes("companies")) {
			new Toggle().toggleCompanies();
		} else if (window.location.href.includes("lists")) {
			new Toggle().toggleLists();
		} else {
			new Toggle().toggleOrgCharts();
		}
		try {
			document.getElementById("linkedin_icon_header").innerHTML = "";
		} catch (error) {
			console.log("Error:", error);
		}
	}

	listsPage() {
		console.log("plans FUNCTION CALLED");
		$("body").css("background-color", "white");
		document.getElementById("all_content").innerHTML =
			document.getElementById("lists_page").innerHTML;
		new ListPageElements().setUpListsTable();
		try {
			console.log("Trying to close the damn modal");
			$(waiting_results_raw_string).modal("hide");
		} catch (error) {
			console.log("Error:", error);
		}
	}

	tablesPage() {
		console.log("tablesPage function Called");
		try {
			var table_name = typeof JSON.parse(sessionStorage["current_table"])[
				"table_name"
			];
		} catch (error) {
			console.log("Error");
			var table_name = "undefined";
		}
		if (table_name === "undefined") {
			new PageContents().changePage("/login");
		} else {
			$("body").css("background-color", "white");
			console.log(
				"this is the tables page!!!>>>>",
				sessionStorage["current_table"]
			);

			// setLoginLogoutTopBar()
			new Pages().setAllContentLoginLogout();
			document.getElementById(
				"right_search_results_people_companies_orgcharts"
			).innerHTML = document.getElementById("table_section_center").innerHTML;

			document.getElementById("left_search_filters").innerHTML = document.getElementById("left_panel_tables_list").innerHTML.replaceAll("{table_id}", JSON.parse(sessionStorage["current_table"])["table_id"] ).replaceAll( "{table_name}", JSON.parse(sessionStorage["current_table"])["table_name"] );
			document.getElementById("right_panel_org_chart_people_companies").innerHTML = document.getElementById("right_panel_sublists_section").innerHTML;
			document.getElementById("header_element").innerHTML = document.getElementById("header_element_lists").innerHTML;
			new TablesPageComponents().setupRightPanelSublists();
			new Handsontables().loadHandsOnTable();
			new TablesPageComponents().setupTableName();
			new Toggle().setHeadlineLeftPanelUnderLineTabs("lists");

			document.getElementById("search_bar_search_center").style.display = "none";
			try {
				console.log("Trying to close the damn modal");
				$(waiting_results_raw_string).modal("hide");
			} catch (error) {
				console.log("Error:", error);
			}
		}
	}

	landingPage() {
		console.log("landingPage FUNCTION CALLED");
		$("body").css("background-color", "white");
		document.getElementById("all_content").innerHTML =
			document.getElementById("new_landing_page").innerHTML;

		sessionStorage["landing_animation"] = 0;
		sessionStorage["testimonial"] = 0;
		setTimeout("new PastFunctions().landingAnimation()", 4000);

		document.getElementById("use_case_container").innerHTML =
			document.getElementById("use_case_sales_element").innerHTML;
		document.getElementById("user_case_navi_container").innerHTML =
			document.getElementById("use_case_navigator_element").innerHTML;
		$("#sales_use_case").toggleClass("usecase-selected");

		document.getElementById("use_case_container1").innerHTML =
			document.getElementById("use_case_sales_element_mobi").innerHTML;
		document.getElementById("user_case_navi_container1").innerHTML =
			document.getElementById("use_case_navigator_element_mobi").innerHTML;
		$("#sales_use_case_mobi").toggleClass("usecase_mobi-selected");
		new UtilityFunctions().activateToolTips();
	}
	frontPage() {
		console.log("frontPage FUNCTION CALLED");
		$("body").css("background-color", "white");
		document.getElementById("all_content").innerHTML =
			document.getElementById("new_front_page").innerHTML;
		if (sessionStorage["logon"] == "true") {
			document.getElementsByClassName("landing_white_button")[1].innerHTML =
				"Home";
			document.getElementById("sign_up_button_front_page").innerHTML = "";
		}
	}
}

class PageContents {
	async setTopBar() {
		var extension_status = await new CheckChromeExtension().getExtensionStatus();
		// extension_status = false;
		console.log("Extension status::", extension_status);
		if (!extension_status) {
			document.getElementById("topbar_advert").style.display = "table";
		} else {
			document.getElementById("topbar_advert").style.display = "none";
		}
	}

	closeTopBar() {
		console.log("This is the close");
		document.getElementById("topbar_advert").style.display = "none";
		try{
			document.getElementById("myDiagramDiv").style.height = (
				$(window).height() *
				(1 - 0.21)
			).toString();
		}
		catch{}

	}

	clearHeaderElement() {
		console.log("Called clear header");
		try {
			// document.getElementById("left_arrow_panel").innerHTML = ''
			document.getElementById("current_account_name").innerHTML = "";
			document.getElementById("arrow_panel").innerHTML = "";
			document.getElementById(
				"contact_card_linkedin_link_org_chart_header"
			).innerHTML = "";
			document.getElementById("linkedin_icon_header").innerHTML = "";
			document.getElementById("functional_dropdown_container").innerHTML = "";
			document.getElementById("geo_dropdown_container").innerHTML = "";
		} catch (error) {
			console.log("Error:", error);
		}
	}

	replaceTopBarwhenLoggedOut() {
		document.getElementById("elements_loggedin_logged_out").innerHTML =
			document.getElementById("loggedout_elements").innerHTML;
		document.getElementById("elements_loggedin_logged_out_mobi").innerHTML =
			document.getElementById("loggedout_elements_mobi").innerHTML;
	}

	replaceTopBarandHeaderElementwhenLoggedOut() {
		this.replaceTopBarwhenLoggedOut();
		this.clearHeaderElement();
	}

	logIn() {
		console.log("logIn FUNCTION CALLED");
		if (sessionStorage["email"] == "" || sessionStorage["password"] == "") {
			console.log("email and password are in somewhat in the session ");
			document.getElementById("login_error").innerHTML =
				'<br><span style="color:red">Please fill in all the fields :-)</span>';
			document.getElementById("login_error_mobi").innerHTML =
				'<br><span style="color:red">Please fill in all the fields :-)</span>';
		} else {
			var params_obj = updateParamsObj();
			console.log("email and password are not the session");
			var loader =
				'<div style="width:100%;text-align:center; padding:40px"><img style="width:30px" src="/static/img/new_loading2.gif"/>';
			document.getElementById("login_error").innerHTML = loader;
			document.getElementById("login_error_mobi").innerHTML = loader;
			$.ajax({
				url: "/auth/signin",
				type: "POST",
				data: {
					email: sessionStorage["email"],
					password: sessionStorage["password"],
					params: params_obj,
					visitor_fp: sessionStorage["visitor_fp"],
				},
			}).done(function (data) {
				console.log("AJAX to hit auth/signin ");
				console.log("This is the AJAX response ", data);
				console.log("token got ehre");

				console.log(data);
				console.log(data.status);
				if (data.status == "login_ok") {
					console.log("login was okay, so now onwards?");
					Cookies.set("auth_token", data.auth_token, { expires: 7, path: "/" });
					Cookies.set("visitor_fp", sessionStorage["visitor_fp"], {
						expires: 7,
						path: "/",
					});

					// $.cookie('auth_token',data.auth_token);
					// document.cookie = 'auth_token='+data.auth_token
					localStorage["email"] = data.user["email"];
					localStorage["user_id"] = data.user["_id"];
					localStorage["user"] = JSON.stringify(data.user);
					new PageContents().setLogonStatus();
					console.log("Login user id setup");
					console.log(localStorage["user_id"]);
					// now purify the sessionStorage not to expose the password
					sessionStorage["username"] = "";
					sessionStorage["password"] = "";
					var use_case = data.user.use_case;
					sessionStorage["use_case"] = data.user["use_case"];

					new PageContents().setMixPanelAliasUser();
					new PageContents().setMixPanelIdentifyUser();
					// drift_append_email()
					// new PageContents().changePage("/org-chart");
					new PageContents().changePage("/lists");

				} else if (data.status == "no_email") {
					console.log("User not registerd with this email");
					new Pages().resetLocalStorageCredentialsAndSetLogonStatus();
					document.getElementById("login_error").innerHTML =
						'<br><span style="color:red">This user has not been registered.</span>';
					document.getElementById("login_error_mobi").innerHTML =
						'<br><span style="color:red">This user has not been registered.</span>';
				} else if (data.status == "visitor_fp_exists") {
					console.log("Visitor FP Exists");
					new Pages().resetLocalStorageCredentialsAndSetLogonStatus();
					document.getElementById("login_error").innerHTML =
						'<br><span style="color:red">Your account is not configured to open on this computer/ browser.</span>';
					document.getElementById("login_error_mobi").innerHTML =
						'<br><span style="color:red">Your account is not configured to open on this computer/ browser.</span>';
				} else {
					new Pages().resetLocalStorageCredentialsAndSetLogonStatus();
					console.log("Login is not okay");
					document.getElementById("login_error").innerHTML =
						'<br><span style="color:red">Invalid email or password</span>';
					document.getElementById("login_error_mobi").innerHTML =
						'<br><span style="color:red">Invalid email or password</span>';
				}
			});
		}
	}

	logOut() {
		console.log("logOut FUNCTION CALLED");
		// localStorage['email'] = '';
		// localStorage['user_id'] = '';
		// localStorage['user'] = '{}';
		new Pages().resetLocalStorageCredentialsAndSetLogonStatus();
		// sessionStorage['logon_status'] = 'false';
		// setLogonStatus();
		var allCookies = document.cookie.split(";");
		// The "expire" attribute of every cookie is
		// Set to "Thu, 01 Jan 1970 00:00:00 GMT"
		for (var i = 0; i < allCookies.length; i++)
			document.cookie =
				allCookies[i] + "=;expires=" + new Date(0).toUTCString();
		new PageContents().changePage("/#");
		document.cookie =
			"auth_token" + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
		document.cookie =
			"visitor_fp" + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
	}

	signUp() {
		console.log("signUp FUNCTION CALLED");

		// if (sessionStorage['full_name']=='' || sessionStorage['email']=='' || sessionStorage['password']=='' || sessionStorage['phone']=='' || sessionStorage['use_case']=='') {
		if (
			sessionStorage["full_name"] == "" ||
			sessionStorage["email"] == "" ||
			sessionStorage["password"] == "" ||
			sessionStorage["phone"] == ""
		) {
			document.getElementById("signup_error").innerHTML =
				'<br><span style="color:red">Please fill in all the fields :-)</span>';
			document.getElementById("signup_error_mobi").innerHTML =
				'<br><span style="color:red">Please fill in all the fields :-)</span>';
		} else if (
			["gmail", "hotmail", "yahoo", "msn"].some((v) =>
				sessionStorage["email"].includes(v)
			)
		) {
			document.getElementById("signup_error").innerHTML =
				'<br><span style="color:red">Please use a valid business email :-)</span>';
			document.getElementById("signup_error_mobi").innerHTML =
				'<br><span style="color:red">Please use a valid business email :-)</span>';
		} else {
			try {
				// $('sign_up_modal').modal('hide');
				$(sign_up_modal).modal("hide");
				document.getElementById("signup_error").innerHTML = "";
				document.getElementById("signup_error_mobi").innerHTML = "";
				document.getElementById("signup_form_content").innerHTML =
					'<span style="font-size:18pt;font-weight: 500;">Creating your account...</span><br><br><br><div style="width:100%;text-align:center; padding:40px"><img style="width:30px" src="/static/img/new_loading2.gif"/><br><br></div>';
				document.getElementById("signup_form_content_mobi").innerHTML =
					'<span style="font-size:18pt;font-weight: 500;">Creating your account...</span><br><br><br><div style="width:100%;text-align:center; padding:40px"><img style="width:30px" src="/static/img/new_loading2.gif"/><br><br></div>';
			} catch (error) {
				console.log("Error:", error);
			}

			var params_obj = updateParamsObj();

			var session_storage_visitor_fp = sessionStorage["visitor_fp"];
			// session_storage_visitor_fp = ''
			// if (((session_storage_visitor_fp.length!=20))&(typeof(session_storage_visitor_fp)!='string')){
			//     new VisitorFp().setupVisitorFP()
			// }

			// session_storage_visitor_fp = sessionStorage['visitor_fp']

			// if ((((session_storage_visitor_fp.length!=20))&(typeof(session_storage_visitor_fp)!='string'))){
			//     location.reload()

			// }

			// if ((((session_storage_visitor_fp.length!=20))&(typeof(session_storage_visitor_fp)!='string'))){
			//     document.getElementById("signup_error").innerHTML = '<br><span style="color:red">Sorry, there seems to be a problem with your browser in accessing this account: '+data['email']+' can be used on this computer. To change, please contact us at accounts@arxena.com :-)</span>'
			//     document.getElementById("signup_error_mobi").innerHTML = '<br><span style="color:red">Only the account with email address: '+data['email']+' can be used on this computer. To change, please contact us at accounts@arxena.com :-)</span>'
			// }

			$.ajax({
				url: "/auth/signup",
				type: "POST",
				data: {
					full_name: sessionStorage["full_name"],
					email: sessionStorage["email"],
					phone: sessionStorage["phone"],
					use_case: sessionStorage["use_case"],
					password: sessionStorage["password"],
					referrer_id: sessionStorage["referrer_id"],
					visitor_fp: session_storage_visitor_fp,
					ipinfo_resp: sessionStorage["ipinfo_resp"],
					geo_country_selected: sessionStorage["geo_country_selected"],
				},
			}).done(function (data) {
				if (typeof data != "string") {
					console.log("AJAX to hit /auth/signup ");
					console.log("This is the AJAX response ", data);
					if (data.status == "user_created") {
						Cookies.set("auth_token", data.auth_token, {
							expires: 7,
							path: "/",
						});
						Cookies.set("visitor_fp", sessionStorage["visitor_fp"], {
							expires: 7,
							path: "/",
						});
						localStorage["email"] = data.user["email"];
						localStorage["user_id"] = data.user["_id"];
						// localStorage['user'] = data.user['_id']
						sessionStorage["password"] = "";
						localStorage["user"] = JSON.stringify(data.user);
						sessionStorage["walkthrough"] = "yes";
						new PageContents().setLogonStatus();

						new PageContents().setMixPanelAliasUser();
						new PageContents().setMixPanelIdentifyUser();
						// new PageContents().changePage("/org-chart");
						new PageContents().changePage("/lists");


						// drift_append_email()
						// changePage('/app')
						// document.getElementById("all_content").innerHTML = document.getElementById("referral_signup_page").innerHTML

						// // if enter is pressed, then submit the form
						// $('.enter_click').keydown(function(event){
						//     var keyCode = (event.keyCode ? event.keyCode : event.which);
						//     console.log(keyCode)
						//     if (keyCode == 13) {
						//         addFriendsToInviteAndStart()
						//     }
						// });
						// $("#referral_signup_button").attr("tabindex",-1).focus();

						// $("#signup_invite_link").val('https://www.arxena.com/invite/' + localStorage['user_id'])
						// $("#signup_invite_link_mobi").val('https://www.arxena.com/invite/' + localStorage['user_id'])
						// $("#referred_emails")
						//     .textext({
						//         plugins: 'tags, prompt',
						//         prompt: 'add tag'
						//     })
						//    .keypress(function(event){
						//      //'Space' key is pressed in keyboard
						//      if(event.which==32 || event.which == 13 || event.which == 9){
						//        addTag();
						//      }
						//    });

						// // Execute a function when the user releases a key on the keyboard
						// document.getElementById('referred_emails').addEventListener("keyup", function(event) {
						//   // Number 32 is the "Space" key on the keyboard //13 is enter and
						//   //if (event.keyCode === 32 || event.keyCode === 13) {
						//     new SessionStorageUpdates().updateReferredEmailsList()
						//   //}
						// });
					} else {
						document.getElementById("all_content").innerHTML =
							document.getElementById("new_signup_page").innerHTML;
						if (data["status"] == "visitor_fp_exists") {
							document.getElementById("signup_error").innerHTML =
								'<br><span style="color:red">Only the account with email address: ' +
								data["email"] +
								" can be used on this computer. To change, please contact us at accounts@arxena.com :-)</span>";
							document.getElementById("signup_error_mobi").innerHTML =
								'<br><span style="color:red">Only the account with email address: ' +
								data["email"] +
								" can be used on this computer. To change, please contact us at accounts@arxena.com :-)</span>";
							setTimeout(
								"new UtilityFunctions().clearStoragesandReload()",
								2000
							);
						} else {
							if (data["status"] == "user_already_registered_with_email") {
								document.getElementById("signup_error").innerHTML =
									'<br><span style="color:red">This email is already registered. Log in instead :-)</span>';
								document.getElementById("signup_error_mobi").innerHTML =
									'<br><span style="color:red">This email is already registered. Log in instead :-)</span>';
								setTimeout(
									"new UtilityFunctions().clearStoragesandReload()",
									2000
								);
							} else if (
								data["status"] == "user_already_registered_with_phone"
							) {
								document.getElementById("signup_error").innerHTML =
									'<br><span style="color:red">This phone has already been registered. Log in instead :-)</span>';
								document.getElementById("signup_error_mobi").innerHTML =
									'<br><span style="color:red">This phone has already been registered. Log in instead :-)</span>';
								setTimeout(
									"new UtilityFunctions().clearStoragesandReload()",
									2000
								);
							}
						}
						// if enter is pressed, then submit the form
						$(".enter_click").keydown(function (event) {
							var keyCode = event.keyCode ? event.keyCode : event.which;
							console.log(keyCode);
							if (keyCode == 13) {
								new PageContents().signUp();
							}
						});
						$("#signup_button_desktop").attr("tabindex", -1).focus();
					}
				} else {
					new PageContents().changePage("/#");
				}
			});
		}
	}

	sendResetLink() {
		console.log("sendResetLink FUNCTION CALLED");
		if (sessionStorage["email"] == "") {
			document.getElementById("password_reset_error").innerHTML =
				'<br><span style="color:red">Please provide a valid email address</span>';
			document.getElementById("password_reset_error_mobi").innerHTML =
				'<br><span style="color:red">Please provide a valid email address</span>';
		} else {
			document.getElementById("password_reset_error").innerHTML = "";
			document.getElementById("password_reset_error_mobi").innerHTML = "";
			document.getElementById("reset_password_form_content").innerHTML =
				'<span style="font-size:18pt;font-weight: 500;">Finding your account...</span><br><br><br><div style="width:100%;text-align:center; padding:40px"><img style="width:30px" src="/static/img/new_loading2.gif"/><br><br></div>';
			document.getElementById("reset_password_form_content_mobi").innerHTML =
				'<span style="font-size:18pt;font-weight: 500;">Finding your account...</span><br><br><br><div style="width:100%;text-align:center; padding:40px"><img style="width:30px" src="/static/img/new_loading2.gif"/><br><br></div>';
			$.ajax({
				url: "/forgot_password",
				type: "POST",
				data: { email: sessionStorage["email"] },
			}).done(function (data) {
				console.log("AJAX to hit reset_password ");
				console.log("This is the AJAX response ", data);
				console.log("This is the status response ", data.status);

				if (data.status == "reset_mail_sent") {
					document.getElementById("reset_password_form_content").innerHTML =
						'<span style="font-size:18pt;font-weight: 500;">An email to reset your password has just been sent to your inbox!</span>';
					document.getElementById(
						"reset_password_form_content_mobi"
					).innerHTML =
						'<span style="font-size:18pt;font-weight: 500;">An email to reset your password has just been sent to your inbox!</span>';
				} else {
					document.getElementById("all_content").innerHTML =
						document.getElementById("password_reset_page").innerHTML;
					document.getElementById("password_reset_error").innerHTML =
						'<br><span style="color:red">There is no user account matching with the email provided</span>';
					document.getElementById("password_reset_error_mobi").innerHTML =
						'<br><span style="color:red">There is no user account matching with the email provided</span>';
					new UtilityFunctions().clearStoragesandReload();
				}
			});
		}
	}

	setLogonStatus() {
		console.log("Called to set logon status!");
		if ("email" in localStorage) {
			if (localStorage["email"].length > 0) {
				sessionStorage["logon"] = "true";
				console.log("Setting logon status to TRUE");
			} else {
				sessionStorage["logon"] = "false";
				console.log("Setting logon status to FALSE");
			}
		} else {
			sessionStorage["logon"] = "false";
			console.log("Setting logon status to FALSE");
		}
	}

	setMixPanelIdentifyUser() {
		if (localStorage["user"]) {
			mixpanel.identify(JSON.parse(localStorage["user"])["email"]);
		}
	}

	setMixPanelAliasUser() {
		mixpanel.alias(JSON.parse(localStorage["user"])["email"]);
	}

	changePage(extension) {
		console.log("changePage FUNCTION CALLED");
		console.log("Extension being called==", extension);
		console.log("This is the localstorage USER ID::", localStorage["user_id"]);
		// save current path - basically where I'm now
		try {
			document.getElementById(
				"right_panel_org_chart_people_companies"
			).style.display = "none";
		} catch (error) {}
		try {
			var pages_list = sessionStorage["navigation_history"].split(",");
			var current_page = pages_list[pages_list.length - 1];
			console.log("Current page is ::", current_page);
		} catch (error) {
			console.log("Error:", error);
		}
		sessionStorage["navigation_history"] =
			sessionStorage["navigation_history"] + "," + extension;
		console.log(
			"This is navigation hisotry created by adding extensions to session storage",
			sessionStorage["navigation_history"]
		);
		// understand which page to load based on the extension
		// first, separate the parameters, which we conventionally separate with "#"
		// the first element of the list will be the page (e.g. /pool/mamma), and the following elements, if present, are the parameters
		var routing_list = extension.split("&");
		// check if there are parameters or not
		if (routing_list.length == 1) {
			// in this case, there are no parameters, just the page
			var new_page = routing_list[0];
			var parameters = [];
		} else {
			// in this case, there are both the page and some parameters
			var new_page = routing_list[0];
			var parameters = [];
		}

		// now that we know which page we need to go next, load this page
		// first, let's adapt the url in the browser bar
		console.log(
			"This is new page created in change page function froum routing list using paarams",
			new_page
		);
		// then, load the right page
		if (new_page == "/login") {
			console.log("got to login");
			window.history.pushState(null, null, extension);
			new Pages().loginPage();
			mixpanel.track("loginPage", {
				source: window.location.href,
				current_focus: sessionStorage["current_focus"],
			});
		} else if (new_page == "/pricing") {
			console.log("got to pricing");
			window.history.pushState(null, null, extension);
			new Pages().pricingPage();
			mixpanel.track("pricingPage", {
				source: window.location.href,
				current_focus: sessionStorage["current_focus"],
			});
		} else if (new_page == "/signup") {
			window.history.pushState(null, null, extension);
			new Pages().signupPage();
			mixpanel.track("signupPage", {
				source: window.location.href,
				current_focus: sessionStorage["current_focus"],
			});
		} else if (new_page == "/password_reset_link") {
			window.history.pushState(
				null,
				null,
				extension + "/" + sessionStorage["reset_token_id"]
			);
			new PasswordReset().passwordResetLinkPage();
			mixpanel.track("loginPage", {
				source: window.location.href,
				current_focus: sessionStorage["current_focus"],
			});
		} else if (new_page == "/password_reset") {
			window.history.pushState(null, null, extension);
			passwordResetPage();
			mixpanel.track("passwordResetPage", {
				source: window.location.href,
				current_focus: sessionStorage["current_focus"],
			});
		} else if (new_page == "/org-chart") {
			console.log("Got here with new page is equal to org chart page");
			console.log(sessionStorage["query"]);
			// if (typeof(JSON.parse(sessionStorage['query'])['company_id']['name']) != "undefined"){
			if ( (typeof sessionStorage["query"] != "undefined") & (typeof JSON.parse(sessionStorage["query"])["company_id"]["name"] != "undefined") ) {
				console.log("Raise org chart End Point");
				new Pages().searchPage();
				window.history.pushState( null, null, extension + "/" + JSON.parse(sessionStorage["query"])["company_id"]["name"] );
				mixpanel.track("searchPageOrgCharts", {
					source: window.location.href,
					current_focus: sessionStorage["current_focus"],
				});
			} else {
				window.history.pushState(null, null, extension + "/");
				new Pages().searchPage();
				mixpanel.track("searchPageBlank", {
					source: window.location.href,
					current_focus: sessionStorage["current_focus"],
				});
			}
		} else if (new_page == "/dashboard") {
			window.history.pushState(null, null, "/dashboard");
			document.title = "Arxena's Org Charts (Global) - Dashboard";
			new Pages().dashboardPage();
			mixpanel.track("dashboardPage", {
				source: window.location.href,
				current_focus: sessionStorage["current_focus"],
			});
		} else if (new_page == "/tables") {
			window.history.pushState(null, null, "/tables");
			document.title = "Arxena's Org Charts (Global) - Dashboard";
			new Pages().tablesPage();
			mixpanel.track("tablesPage", {
				source: window.location.href,
				current_focus: sessionStorage["current_focus"],
			});
		} else if (new_page == "/lists") {
			window.history.pushState(null, null, "/lists");
			document.title = "Arxena's Org Charts (Global) - Dashboard";
			new Pages().switchAllContentToSearchPage()
			new Pages().jobsPage();
			mixpanel.track("jobsPage", {
				source: window.location.href,
				current_focus: sessionStorage["current_focus"],
			});
		} else if (new_page == "/liststable") {
			window.history.pushState(null, null, "/liststable");
			document.title = "Arxena's Org Charts (Global) - Dashboard";
			new Pages().listsPage();
			mixpanel.track("liststable", {
				source: window.location.href,
				current_focus: sessionStorage["current_focus"],
			});
		} else if (new_page == "/eula") {
			window.history.pushState(null, null, extension);
			document.title = "Arxena's Org Charts (Global) - EULA";
			new Pages().eulaPage();
			mixpanel.track("eulaPage", {
				source: window.location.href,
				current_focus: sessionStorage["current_focus"],
			});
		} else if (new_page == "/api") {
			window.history.pushState(null, null, extension);
			document.title = "Arxena's Org Charts (Global) - API";
			new Pages().apiPage();
			mixpanel.track("apiPage", {
				source: window.location.href,
				current_focus: sessionStorage["current_focus"],
			});
		} else if (new_page == "/home") {
			window.history.pushState(null, null, extension);
			document.title = "Arxena's Org Charts (Global) - API";
			new Pages().landingPage();
			mixpanel.track("home", {
				source: window.location.href,
				current_focus: sessionStorage["current_focus"],
			});
		} else if (new_page == "/privacy") {
			window.history.pushState(null, null, extension);
			document.title = "Arxena's Org Charts (Global) - Privacy";
			new Pages().privacyPage();
			mixpanel.track("privacyPage", {
				source: window.location.href,
				current_focus: sessionStorage["current_focus"],
			});
		} else if (new_page == "/#") {
			console.log("Going to load front page");
			window.history.pushState(null, null, extension);
			document.title = "Arxena's Org Charts (Global) - Arxena";
			new Pages().frontPage();
			new ProcessNodesStates().resetSessionStorageforDropdowns();
			mixpanel.track("frontPage", {
				source: window.location.href,
				current_focus: sessionStorage["current_focus"],
			});
		}
		return false;
	}
}

class ProcessNodesStates {
	resetSessionStorageforDropdowns() {
		console.log("Resetting session Storage for Dropdown");
		sessionStorage["query"] = sessionStorage["blank_session_storage_obj"];
		sessionStorage["raw_string_query_input"] = "";
	}
	initializeSessionStorageforDropdowns() {
		console.log("Calling initializeSessionStorageforDropdowns");
		// console.log(sessionStorage['query']);

		var all_objs = jQuery.extend(
			org_chart_filters_obj,
			company_filters_obj,
			people_filters_obj,
			{
				company_id: [],
				function_root: [],
				person_id: [],
				active_experience: true,
				checkbox_has_email: false,
				checkbox_has_phone: false,
			}
		);
		sessionStorage["blank_session_storage_obj"] = JSON.stringify(all_objs);
		if (sessionStorage["query"] === undefined) {
			sessionStorage["query"] = sessionStorage["blank_session_storage_obj"];
		}
	}
}

var comboTree1;

var org_chart_filters_obj = {
	website: [],
	company_name: [],
	company_id: [],
	function_root: [],
	country: [],
	company_linkedin_url: [],
	search_in_org_chart: [],
};
var company_filters_obj = {
	industry: [],
	industry_category: [],
	gpt3_company_search: [],
	company_name: [],
	company_id: [],
	website: [],
	company_linkedin_url: [],
	reverse_company: [],
	functions: [],
	function_root: [],
	grades: [],
	company_sizes: [],
	country: [],
	region: [],
	locality: [],
	locality_presence: [],
	region_presence: [],
	country_presence: [],
	locations: [],
	company_type: [],
	founded: [],
	tags: [],
};
var people_filters_obj = {
	person_name: [],
	gpt3_company_search: [],
	company_name: [],
	company_id: [],
	functions: [],
	function_root: [],
	grades: [],
	reverse_job_title: [],
	job_title: [],
	skills: [],
	reverse_company: [],
	locations: [],
	country: [],
	person_linkedin_url: [],
	email_address: [],
	phone_number: [],
	genders: [],
	industry: [],
	school: [],
	education_degrees: [],
	education_majors: [],
	year_of_graduation: [],
};



function callBodyOnloadFunction() {
	console.log("callBodyOnloadFunction function has been called in javascript");
	load_type = document.getElementById("load_type").getAttribute("data-row");
	user_obj = document.getElementById("user_obj").getAttribute("data-row");
	console.log("This is load type::", load_type);
	console.log("This is user_obj ::", user_obj);
	// debugger;
	try {
		var use_case = JSON.parse(user_obj)["use_case"];
		if (use_case !== "") {
			sessionStorage["use_case"] = use_case;
		}
	} catch (error) {}

	if (load_type == "org-chart") {
		// sessionStorage['load_type'] = 'org-chart'
		if (window.location.href.indexOf("/org-chart/") > 0) {
			new Pages().searchPage();

			console.log("Load type is org-chart. Going to draw org charts!!!");
			var flask_jinja_obj = document
				.getElementById("org_data")
				.getAttribute("data-row");
			// console.log(flask_jinja_obj)
			var parsed_flask_jinja_obj = JSON.parse(flask_jinja_obj);
			console.log(parsed_flask_jinja_obj);
			if (parsed_flask_jinja_obj["query_status"] == "unauthorized") {
				console.log("Some problem");
			} else {
				var org_data =
					parsed_flask_jinja_obj["results"]["data"]["modified_query_results"];
				console.log(org_data);
				if (org_data.length == 0) {
					new Query().handleIncompleteResponse(parsed_flask_jinja_obj);
				}
				// Checking if this is needed and will worl
				if (window.location.href.split("/org-chart/")[1].length > 0) {
					new DrawOrgCharts().drawOrgchart(org_data);
				}
			}
		}
	} else {
		console.log("Load type is a simple query. Chilling!");
		document.title = "Arxena's Org Charts (Global) - Arxena";
		// sessionStorage['load_type'] = 'query'
	}
}

class Query {


	showWaitForPeopleDataFromExternalSource() {
		console.log("Got to show wait for people from external sources");
		new Modals().seeActivity();
	}


	ifYouCanSetupLoadersinTheRightSide() {
		var loader =
			'<div style="width:100%;text-align:center; padding:40px"><img style="width:30px" src="/static/img/new_loading2.gif"/><br><br><span style="font-size:10pt">Searching ...<br>Companies with > 10k employees may take ~20 seconds!</span></div>';
		try {
			document.getElementById(
				"right_search_results_people_companies_orgcharts"
			).innerHTML = loader;
			document.getElementById(
				"right_search_results_people_companies_orgcharts_mobi"
			).innerHTML = loader;
		} catch (error) {
			console.log("Error:", error);
		}
	}

	ifYoucanSetupSearchImageonRightSide() {
		document.getElementById(
			"right_search_results_people_companies_orgcharts"
		).innerHTML = document.getElementById("start_search_element").innerHTML;
		document.getElementById(
			"right_search_results_people_companies_orgcharts_mobi"
		).innerHTML = document.getElementById("start_search_element").innerHTML;
	}


	cancelconfirmFetchAllResults() {
		$(fetch_node_results).modal("hide");
		new Tokens().resetFunctionsGradesDropdown();

		sessionStorage["data_source"] = "arxena";
	}

	clearSelectedContextMenu() {
		console.log("Called clearSelectedContextMenu");
		sessionStorage["selected_context_menu"] = "";
	}

	setUpCountQueryResults() {
		var params_obj = updateParamsObj("count_query");
		var user_input = "count_query";
		var query_obj = { query: sessionStorage["query"], params: params_obj };
		console.log("Data Source::", sessionStorage["data_source"]);
		if (sessionStorage["current_focus"] == "people") {
			sessionStorage["sample_people_data"] = "true";
		} else if (sessionStorage["current_focus"] == "companies") {
			sessionStorage["sample_company_data"] = "true";
		}
		if (sessionStorage["data_source"] != "data_broker_1") {
			if (sessionStorage["current_focus"] != "orgcharts") {
				console.log("Calling callBackendQueryExecuteOnResponse for count");
				new Query().callBackendQueryExecuteOnResponse(query_obj, user_input);
			}
		}
	}

	confirmFetchAllNodeContextResults() {
		if (
			(sessionStorage["data_source"] == "arxena") &
			(sessionStorage["locations_dropdown1"] == "")
		) {
			console.log("Not letting go!");
			document.getElementById("pick_function_error_node").innerHTML =
				'<span style="color:red;text-align:center">Please fill in all requirements</span>';
		} else {
			sessionStorage["consume_credits"] = "true";
			new Query().fetchQueryShowResults("button_query_show_results");
			$(fetch_people_results).modal("hide");
			sessionStorage["consume_credits"] = "false";
			console.log("fetch all rescults confirmed");
		}
	}

	callBackendQueryExecuteOnResponse(query_obj, user_input) {
		console.log(
			"Called callBackendQueryExecuteOnResponse with query_obj::",
			JSON.parse(query_obj["query"])
		);
		console.log(
			"Called callBackendQueryExecuteOnResponse with and user input::",
			user_input
		);

		console.log(
			"Parsed Query Obj['params']::",
			JSON.parse(query_obj["params"]),
			"query:::",
			JSON.parse(query_obj["query"]),
			"count query is :::",
			params["count_query"]
		);
		console.log("GOING TO HIT QUERY AJAX ENDPOINT!!!!");
		jQuery
			.ajax({
				url: "/query",
				type: "POST",
				data: query_obj,
				error: function (xhr, status) {
					let error_status = xhr.status;
					if (error_status == 429) {
						console.log("Too Many Requests");
						document.getElementById(
							"right_search_results_people_companies_orgcharts"
						).innerHTML = document.getElementById(
							"too_many_requests_element"
						).innerHTML;
						document.getElementById(
							"right_search_results_people_companies_orgcharts_mobi"
						).innerHTML = document.getElementById(
							"too_many_requests_element"
						).innerHTML;
						new ProcessNodesStates().resetSessionStorageforDropdowns();
					}
					if (error_status == 500) {
						new ProcessNodesStates().resetSessionStorageforDropdowns();
						console.log("There has been an error as error code is 500!!");
						// location.reload();
						stopLoadersFromRotating();
					}
					// alert(xhr.status);
				},
			})
			.done(function (response, statusText, xhr) {
				console.log("Received ajax response:::");
				// Might have to add cookie based authentication here
				if (
					(localStorage["user"] == "{}") &
					(typeof localStorage["email"] != "undefined") &
					(sessionStorage["current_focus"] != "orgcharts")
				) {
					document.getElementById(
						"right_search_results_people_companies_orgcharts"
					).innerHTML = document.getElementById(
						"logged_out_empty_element"
					).innerHTML;
					console.log("Going here to set timeout and change page to /login");
					setTimeout("new PageContents().changePage('/login')", 300);
				} else {
					new Query().executeQueryResponse(
						response,
						statusText,
						xhr,
						user_input
					);
				}
			});
	}

	executeQueryResponse(response, statusText, xhr, user_input) {
		console.log(
			"This is the response to query ::",
			response,
			"with user input::::",
			user_input
		);
		if ((user_input == "count_query") & (response["status"] != "incomplete")) {
			console.log(
				"Called from executeQueryResponse(response, statusText,xhr, user_input)::"
			);
			console.log(response);
			console.log(statusText);
			console.log(xhr);
			console.log(xhr.status);
			var count_db_results = response["count_db_results"];
			new LoadDataPeopleCompaniesOrgCharts().loadCountResultsinPeopleorCompanies(
				response,
				count_db_results
			);
		} else if (user_input == "raw_string_query_input") {
			if (response["status"] == "success") {
				data = response["results"]["data"]["modified_query_results"];
				updateStorageToken(data, "raw_string_query_input");
				new LoadDataPeopleCompaniesOrgCharts().loadResults(response);
				$(waiting_results_raw_string).modal("hide");
				count_db_results = response["count_db_results"];
				new LoadDataPeopleCompaniesOrgCharts().loadCountResultsinPeopleorCompanies(
					response,
					count_db_results
				);
			} else {
				$(waiting_results_raw_string).modal("hide");
			}
		} else if (user_input == "cost_credits") {
			console.log("Called executeQueryResponse from cost_credits ::");
			// This query is to just get the number of results
			// When response['status'] == 'incomplete', the count db results will be shown to be 0
			console.log(response);
			console.log(statusText);
			console.log(xhr);
			console.log(xhr.status);
			var cost_credits = response["results"]["data"]["modified_query_results"];
			var count_db_results = response["count_db_results"];
			new LoadDataPeopleCompaniesOrgCharts().loadCostCredits(
				cost_credits,
				count_db_results
			);
		} else if (user_input == "boolean_keywords_string") {
			console.log(
				"Called executeQueryResponse from boolean_keywords_string ::"
			);
			console.log(response);
			console.log(statusText);
			console.log(xhr);
			console.log(xhr.status);
			boolean_keywords_string = response;
			new Modals().openBooleanKeywordsModal(boolean_keywords_string);
			sessionStorage["boolean_keywords_string"] = "false";
		} else if (user_input == "contact_info") {
			console.log("Called executeQueryResponse from contact_info ::");
			console.log(response);
			console.log(statusText);
			console.log(xhr);
			console.log(xhr.status);
			new LoadDataPeopleCompaniesOrgCharts().loadContactInfoAnyTypeContactInfo(
				response,
				user_input
			);
		} else if (user_input == "contact_info_org_charts") {
			console.log(
				"Called executeQueryResponse from contact_info_org_charts ::"
			);
			console.log(response);
			console.log(statusText);
			console.log(xhr);
			console.log(xhr.status);
			new LoadDataPeopleCompaniesOrgCharts().loadContactInfoAnyTypeContactInfo(
				response,
				user_input
			);
		} else if (
			user_input === undefined ||
			user_input == "load_data_without_loading_tokens"
		) {
			console.log(
				"Called executeQueryResponse from load_data_without_loading_tokens ::"
			);
			console.log(response);
			console.log(statusText);
			console.log(xhr.status);
			console.log(response.status);
			if (response["status"] == "success" || response["status"] == "blank") {
				console.log(
					"Called executeQueryResponse from load_data_without_loading_tokens :: and results status is success::",
					response
				);
				if (response["query_status"] == "logged_out") {
					new Pages().resetLocalStorageCredentialsAndSetLogonStatus();
					var loggedin = false;
					new PageContents().replaceTopBarandHeaderElementwhenLoggedOut();
					new LeftPanelDropdownFilters().removeLeftPanelforOrgChartwhenLoggedOut();
				}
				// console.log("GOT RESPONSE WITH status is success")
				// console.log("Status is okay")
				var data = response["results"]["data"]["modified_query_results"];

				updateStorageToken(data, "ajaxQuery");
				if (user_input == undefined) {
					// This condition is to ensure that when minus sign tokens are clicked, then left panel tokens are not reloaded. Otherwise it enters infinite loop!!!
					new Tokens().showTokensinUI();
				}
				new LoadDataPeopleCompaniesOrgCharts().loadResults(response);
				console.log(
					"Got here to check typ eof response to check fi we want to load count results in people or companies:::",
					typeof response,
					"count_db_results::",
					count_db_results
				);
				console.log(
					"Got here to check typ eof response.results.data.modified_query_results:::",
					response.results
				);
				if (
					(typeof response != "undefined") &
					(response.results.data.modified_query_results.length > 0)
				) {
					new LoadDataPeopleCompaniesOrgCharts().loadCountResultsinPeopleorCompanies(
						data,
						count_db_results
					);
				}
			} else if (response["status"] == "incomplete") {
				if (response["query_status"] == "unauthorized") {
					console.log("GOT RESPONSE WITH status is unauthorized ,incomplete");
					console.log("Unauthorised access");
					var loader =
						'<div style="width:100%;text-align:center; padding:40px"><img style="width:30px" src="/static/img/new_loading2.gif"/><br><br><span style="font-size:10pt">Searching your data...</span></div>';
					if (sessionStorage["load_type"] == "org-chart") {
						document.getElementById(
							"right_search_results_people_companies_orgcharts"
						).innerHTML = loader;
						document.getElementById(
							"right_search_results_people_companies_orgcharts_mobi"
						).innerHTML = loader;
						if (
							sessionStorage["current_focus"] == "people" ||
							sessionStorage["current_focus"] == "companies"
						) {
							document.getElementById("header_element").innerHTML = "";
							document.getElementById(
								"right_search_results_people_companies_orgcharts"
							).innerHTML = document
								.getElementById("not_logged_in")
								.innerHTML.replace(
									"{not_logged_in}",
									"<br>We have logged you out. Please log back in to continue.</a>"
								);
							document.getElementById(
								"right_search_results_people_companies_orgcharts_mobi"
							).innerHTML = document
								.getElementById("not_logged_in")
								.innerHTML.replace(
									"{not_logged_in}",
									"<br>We have logged you out. Please log back in to continue.</a>"
								);
						}
					} else if (
						sessionStorage["current_focus"] == "people" ||
						sessionStorage["current_focus"] == "companies"
					) {
						// document.getElementById('header_element').innerHTML = ''
						document.getElementById("header_element").innerHTML =
							document.getElementById("people_header_element").innerHTML;

						document.getElementById(
							"right_search_results_people_companies_orgcharts"
						).innerHTML = document
							.getElementById("not_logged_in")
							.innerHTML.replace(
								"{not_logged_in}",
								"<br>We have logged you out. Please log back in to continue.</a>"
							);
						document.getElementById(
							"right_search_results_people_companies_orgcharts_mobi"
						).innerHTML = document
							.getElementById("not_logged_in")
							.innerHTML.replace(
								"{not_logged_in}",
								"<br>We have logged you out. Please log back in to continue.</a>"
							);
					} else {
						document.getElementById(
							"right_search_results_people_companies_orgcharts"
						).innerHTML = document
							.getElementById("not_logged_in")
							.innerHTML.replace(
								"{not_logged_in}",
								"<br>We have logged you out. Please log back in to continue.</a>"
							);
						document.getElementById(
							"right_search_results_people_companies_orgcharts_mobi"
						).innerHTML = document
							.getElementById("not_logged_in")
							.innerHTML.replace(
								"{not_logged_in}",
								"<br>We have logged you out. Please log back in to continue.</a>"
							);
					}
					var loggedin = false;
					new PageContents().replaceTopBarandHeaderElementwhenLoggedOut();
				} else {
					new Query().handleIncompleteResponse(response);
				}
			} else if (response["status"] == "not_ok") {
				console.log("GOT RESPONSE WITH not_ok");

				if (
					response["request_id"] != "" &&
					response["current_focus"] == "people" &&
					response["source"] == "serp"
				) {
					console.log(
						"Results are SERP and hence we have to ask the user to wait for a bit"
					);
					new Query().showWaitForPeopleDataFromExternalSource();
				} else {
					console.log("Status is not okay");
					console.log("This is the client query obj::");
					console.log(response["request_id"]);
					document.getElementById(
						"right_search_results_people_companies_orgcharts"
					).innerHTML = document.getElementById(
						"start_search_element"
					).innerHTML;
					document.getElementById(
						"right_search_results_people_companies_orgcharts_mobi"
					).innerHTML = document.getElementById(
						"start_search_element"
					).innerHTML;

					new ProcessNodesStates().resetSessionStorageforDropdowns();
				}
			} else if (response["status"] == "out_of_credits") {
				console.log("GOT RESPONSE WITH out_of_credits");

				console.log("This is the client query obj::");
				console.log(response["request_id"]);
				$(out_of_credits_modal).modal("show");
				new ProcessNodesStates().resetSessionStorageforDropdowns();
				new PageContents().changePage("/dashboard");
			}
		} else if (user_input == "button_query_show_results") {
			console.log("GOT RESPONSE WITH button_query_show_results");
			console.log(response);

			if (response["selected_context_menu"] == "fetchCurrentNodeDataResults") {
				console.log("GOT RESPONSE WITH fetchCurrentNodeDataResults");
				console.log(response);
				var node_key = response.response_params.key;
				var node_key = response.response_params.parent;
				var response_nodes =
					response["results"]["data"]["modified_query_results"];
				processMultipleNodes(response, response_nodes);
				$(waiting_results).modal("hide");
				updateStorageToken({}, "resetOrgChartTokensAfterFetchNodeData");
			} else if (
				response["selected_context_menu"] == "fetchEntireCompanyDataResults"
			) {
				console.log("GOT RESPONSE WITH fetchEntireCompanyDataResults");
				console.log(response);
				new LoadDataPeopleCompaniesOrgCharts().loadResults(response);
				$(waiting_results_raw_string).modal("hide");
				$(waiting_results).modal("hide");
				// count_db_results = response['count_db_results']
				// loadCountResultsinPeopleorCompanies(response, count_db_results)
			} else if (
				response["selected_context_menu"] == "fetchAllLeadershipNodes"
			) {
				console.log("GOT RESPONSE WITH fetchAllLeadershipNodes");
				console.log(response);
				var response_nodes =
					response["results"]["data"]["modified_query_results"];
				processMultipleNodes(response, response_nodes);
				$(waiting_results).modal("hide");
			} else if (
				response["selected_context_menu"] ==
				"fetchOrgChartFunctionGradeDataResults"
			) {
				console.log("GOT RESPONSE WITH fetchAllLeadershipNodes");
				console.log(response);
				var response_nodes =
					response["results"]["data"]["modified_query_results"];
				processMultipleNodes(response, response_nodes);
				$(waiting_results).modal("hide");
			} else if (response["selected_context_menu"] == "fetchAllSelectedNodes") {
				console.log("GOT RESPONSE WITH fetchAllSelectedNodes");
				console.log(response);
			} else if (
				response["selected_context_menu"] == "fetchAllFunctionDataResults"
			) {
				console.log("GOT RESPONSE WITH fetchAllFunctionDataResults");
				console.log(response);
				console.log("GOT RESPONSE WITH fetchEntireCompanyDataResults");
				console.log(response);
				new LoadDataPeopleCompaniesOrgCharts().loadResults(response);
				$(waiting_results_raw_string).modal("hide");
				$(waiting_results).modal("hide");
			} else {
				console.log(
					"GOT RESPONSE WITH changeNodeDataUsingQueryResponse(response, node_key, parent"
				);
				$(waiting_results).modal("hide");
				var node_key = response.response_params.key;
				var parent = response.response_params.parent;
				changeNodeDataUsingQueryResponse(response, node_key, parent);
			}
			sessionStorage["data_source"] = "arxena";
		}
	}

	handleIncompleteResponse(response) {
		console.log("HANDDLING INCOMPLETE RESPONSE!!");
		console.log(
			"GOT RESPONSE WITH Null status is ::",
			response["query_status"]
		);
		console.log("Status is incomplete");
		console.log("This is the client query obj::");
		console.log(response["request_id"]);
		var company_employee_count_obj = JSON.parse( sessionStorage["company_emp_counts"] ).slice(-1)[0];
		console.log(company_employee_count_obj);
		console.log(window.location.href);
		if (response["query_status"] == "no_credits") {
			document.getElementById( "right_search_results_people_companies_orgcharts" ).innerHTML = document .getElementById("no_results_message") .innerHTML.replace( "{no_results_message}", "<br>Apologies but you need to recharge your credits for further searches. Please recharge from the dashboard or email support at data@arxena.com and we will help immediately.</a>" );
			document.getElementById( "right_search_results_people_companies_orgcharts_mobi" ).innerHTML = document .getElementById("no_results_message") .innerHTML.replace( "{no_results_message}", "<br>Apologies but you need to recharge your credits for further searches. Please recharge from the dashboard or email support at data@arxena.com and we will help immediately.</a>" );
			console.log(response["request_id"]);
			$(out_of_credits_modal).modal("show");
			new ProcessNodesStates().resetSessionStorageforDropdowns();
			new PageContents().changePage("/dashboard");
		} else {
			if (company_employee_count_obj === undefined) {
				if (sessionStorage["current_focus"] == "orgcharts") {
					var company_name_requested = window.location.href.split("/").slice(-1)[0];
					document.getElementById(
						"right_search_results_people_companies_orgcharts"
					).innerHTML = document
						.getElementById("no_results_message")
						.innerHTML.replace(
							"{no_results_message}",
							"<br>Apologies but we havent yet loaded the chart for " +
								company_name_requested +
								" <br> Please email support at data@arxena.com and we will help immediately.</a>"
						);
					document.getElementById(
						"right_search_results_people_companies_orgcharts_mobi"
					).innerHTML = document
						.getElementById("no_results_message")
						.innerHTML.replace(
							"{no_results_message}",
							"<br>Apologies but we havent yet loaded the chart for " +
								company_name_requested +
								" <br> Please email support at data@arxena.com and we will help immediately.</a>"
						);
				} else {
					document.getElementById(
						"right_search_results_people_companies_orgcharts"
					).innerHTML = document
						.getElementById("no_results_message")
						.innerHTML.replace(
							"{no_results_message}",
							"<br>Apologies but we couldn't load the requested data at this time <br> Please email support at data@arxena.com and we will help immediately.</a>"
						);
					document.getElementById(
						"right_search_results_people_companies_orgcharts_mobi"
					).innerHTML = document
						.getElementById("no_results_message")
						.innerHTML.replace(
							"{no_results_message}",
							"<br>Apologies but we couldn't load the requested data at this time <br> Please email support at data@arxena.com and we will help immediately.</a>"
						);
				}
			} else {
				company_name_requested = company_employee_count_obj["company_id_label"];
				document.getElementById(
					"right_search_results_people_companies_orgcharts"
				).innerHTML = document
					.getElementById("no_results_message")
					.innerHTML.replace(
						"{no_results_message}",
						"<br>Apologies but we havent yet loaded the chart for " +
							company_name_requested +
							" <br> Please email support at data@arxena.com and we will load it with " +
							company_employee_count_obj["company_emp_count"] +
							" employee profiles.</a>"
					);
				document.getElementById(
					"right_search_results_people_companies_orgcharts_mobi"
				).innerHTML = document
					.getElementById("no_results_message")
					.innerHTML.replace(
						"{no_results_message}",
						"<br>Apologies but we havent yet loaded the chart for " +
							company_name_requested +
							" <br> Please email support at data@arxena.com and we will load it with " +
							company_employee_count_obj["company_emp_count"] +
							" employee profiles.</a>"
					);
			}
		}
	}

	fetchQueryShowResults(user_input) {
		console.log("Called fetchQueryShowResults with the user input:::",user_input,"and data source after fetchQueryShowResults",sessionStorage["data_source"]);
		var loader2 = '<div style="width:100%;text-align:center; padding:40px"><img style="width:30px" src="/static/img/new_loading2.gif"/></div>';
		if (user_input === undefined ||user_input == "load_data_without_loading_tokens") {
			console.log("This the user input and it is undefined ::", user_input);
			// blank_session_storage_obj = '{"raw_text":[],"company_id":[],"company_name":[],"functions":[],"industry":[],"grades":[],"position":[],"year_founded":[],"country":[],"location":[],"linkedin_url":[],"gender":[],"job_title":[]}'
			var blank_session_storage_obj = sessionStorage["blank_session_storage_obj"];
			if (
				sessionStorage["query"] != blank_session_storage_obj ||
				sessionStorage["company_id"] != undefined
			) {
				console.log("Tokens list is not equal to blank session Object");
				console.log(
					"sending query for ajax query  in  fetchQueryShowResults inside first load_data_without_loading_tokens"
				);
				new Query().ifYouCanSetupLoadersinTheRightSide();
				var params_obj = updateParamsObj("ajax_query");
				var query_obj = { query: sessionStorage["query"], params: params_obj };
				if (sessionStorage["load_type"] != "org-chart") {
					console.log(
						"Entering here because load type is not org chart but it is::",
						sessionStorage["load_type"]
					);
					new Query().callBackendQueryExecuteOnResponse(query_obj, user_input);
					// Now going to execute actions to call count query obj. Do it only for those queries where a count is expected. Might have to change this criteria in future
					if (
						(sessionStorage["raw_string_query_input"] == "") &
						(JSON.parse(sessionStorage["query"])["industry_category"].length ==
							0)
					) {
						new Query().setUpCountQueryResults();
					}
				} else {
					console.log(
						"Entering here because load type is org chart::",
						sessionStorage["load_type"]
					);
					if (sessionStorage["current_focus"] == "orgcharts") {
						var parsed_flask_jinja_obj = JSON.parse(
							document.getElementById("org_data").getAttribute("data-row")
						);
						new DrawOrgCharts().setupOrgChartItems(parsed_flask_jinja_obj);
					} else {
						new Query().callBackendQueryExecuteOnResponse(
							query_obj,
							user_input
						);
						// Now going to execute actions to call count query obj
						if (sessionStorage["raw_string_query_input"] == "") {
							new Query().setUpCountQueryResults();
						}
					}
				}
			} else {
				// document.getElementById('header_element').innerHTML = ''
				new Query().ifYoucanSetupSearchImageonRightSide();
				// console.log("Session Storage is blank or company ID is undefined");
			}
		} else if (user_input == "raw_string_query_input") {
			var params_obj = updateParamsObj("raw_string_query_input");
			// updateStorageToken(node, 'raw_string_query_input')
			var query_obj = { query: sessionStorage["query"], params: params_obj };
			new Query().callBackendQueryExecuteOnResponse(query_obj, user_input);
		} else if (user_input == "boolean_keywords_string") {
			var params_obj = updateParamsObj("boolean_keywords_string");
			var query_obj = { query: sessionStorage["query"], params: params_obj };
			var user_input = "boolean_keywords_string";
			var node = myDiagram.findNodeForKey(sessionStorage["selectedNodeKey"]);
			updateStorageToken(node, "boolean_keywords_string");
			var params_obj = updateParamsObj("button_query_show_results");
			var query_obj = { query: sessionStorage["query"], params: params_obj };
			new Query().callBackendQueryExecuteOnResponse(query_obj, user_input);
		} else if (user_input == "fetch_people_results_consume_credits") {
			console.log(
				"This is the data source selected::",
				sessionStorage["data_source"]
			);
			if (
				sessionStorage["query"] != blank_session_storage_obj ||
				sessionStorage["company_id"] != undefined
			) {
				console.log("Tokens list is not equal to blank session Object");
				new Query().ifYouCanSetupLoadersinTheRightSide();
				console.log(
					"sending query for ajax query inside second in fetch_people_results_consume_credits "
				);
				var params_obj = updateParamsObj("ajax_query");
				var query_obj = { query: sessionStorage["query"], params: params_obj };
				sessionStorage["sample_people_data"] = "false";
				// if (sessionStorage['load_type']!='org-chart'){
				var user_input = undefined;
				new Query().callBackendQueryExecuteOnResponse(query_obj, user_input);
				//
				// }
				// sessionStorage['sample_people_data'] = 'true'
			} else {
				console.log("Session Storage is blank or company ID is undefined");
			}
		} else if (
			user_input == "locations_dropdown1" ||
			user_input == "locations_dropdown2" ||
			user_input == "locations_dropdown3"
		) {
			if (user_input == "locations_dropdown1") {
				document.getElementById("modal_locations_dropdown1").innerHTML =
					loader2;
			} else if (user_input == "locations_dropdown2") {
				document.getElementById("modal_locations_dropdown2").innerHTML =
					loader2;
			} else if (user_input == "locations_dropdown3") {
				document.getElementById("modal_locations_dropdown3").innerHTML =
					loader2;
			}
			if (
				sessionStorage["selectFunctionsTreeFunctionsRootItem"] != "" ||
				sessionStorage["selectFunctionsTreeFunctionsItem"] != "" ||
				sessionStorage["selectGradesItem"] != ""
			) {
				console.log(
					"Do nothing but just load the dropdown twos. No changing the storage tokens please"
				);
			} else {
				console.log("User input is locations_dropdown");
				console.log(user_input);
				var node = myDiagram.findNodeForKey(sessionStorage["selectedNodeKey"]);
				updateStorageToken(node, "fetch_query_locations_dropdown");
				var params_obj = updateParamsObj(user_input);
				var node_query = { query: sessionStorage["query"], params: params_obj };
				console.log(node_query);
				var query_obj = node_query;
			}
			// Removing the node != null condition. Its likely that the node is going to be null sometimes. Lets see this temporarily
			// if (node !== null) {
			// callBackendQueryExecuteOnResponse(query_obj, user_input)
			if (user_input == "locations_dropdown1") {
				var countries_arr =
					new DrawOrgCharts().getAllCountriesFromLocationAnalytics();
				new LoadDataPeopleCompaniesOrgCharts().loadLocationsDropdown1(
					countries_arr
				);
			}
			if (user_input == "locations_dropdown2") {
				var country_selected = sessionStorage["locations_dropdown1"];
				var regions_arr = new DrawOrgCharts().getRegionsFromCountry(
					country_selected
				);
				new LoadDataPeopleCompaniesOrgCharts().loadLocationsDropdown2(
					regions_arr
				);
			}
			if (user_input == "locations_dropdown3") {
				var country_selected = sessionStorage["locations_dropdown1"];
				var region_selected = sessionStorage["locations_dropdown2"];
				var localities_arr =
					new DrawOrgCharts().getLocalitiesfromCountryAndRegion(
						country_selected,
						region_selected
					);
				new LoadDataPeopleCompaniesOrgCharts().loadLocationsDropdown3(
					localities_arr
				);
			}
			// }
		} else if (user_input == "cost_credits") {
			console.log("User input is cost_credits");
			console.log(user_input);
			if (sessionStorage["current_focus"] == "orgcharts") {
				document.getElementById("cost_of_credits_org_chart").innerHTML =
					'<div style="width:100%;text-align:center; padding:10px"><img style="width:30px;" src="/static/img/new_loading2.gif"/></div> ';
				if (
					sessionStorage["selectFunctionsTreeFunctionsRootItem"] != "" ||
					sessionStorage["selectFunctionsTreeFunctionsItem"] != "" ||
					sessionStorage["selectGradesItem"] != ""
				) {
					console.log("This is the selcted using the main functions root");
				} else {
					try {
						if (typeof sessionStorage["selectedNodeKey"] != "undefined") {
							var node = myDiagram.findNodeForKey(
								sessionStorage["selectedNodeKey"]
							);
							console.log("This is the node::", node);
							if (node.data.std_function_category != "ceoassist") {
								// updateStorageToken(node, 'fetch_query_locations_dropdown')
								// Using the fetch_query_locations_dropdown to update storage token. Can create a new one also
								updateStorageToken(node, "fetch_query_locations_dropdown");
							} else {
								console.log("Waiting to do something??");
							}
						}
					} catch (error) {
						console.log("Error:", error);
					}
				}
			} else if (sessionStorage["current_focus"] == "people") {
				document.getElementById("cost_of_credits_people").innerHTML = loader2;
			} else if (sessionStorage["current_focus"] == "companies") {
				document.getElementById("cost_of_credits_companies").innerHTML =
					loader2;
			}
			var params_obj = updateParamsObj("cost_credits");
			var query_obj = { query: sessionStorage["query"], params: params_obj };
			console.log(JSON.parse(sessionStorage["query"]));

			new Query().callBackendQueryExecuteOnResponse(query_obj, user_input);
		} else if (user_input == "button_query_show_results") {
			console.log("User input is button_query_show_results");
			console.log(user_input);
			// called only from the fetch_node_results modal

			if (
				sessionStorage["selectFunctionsTreeFunctionsRootItem"] != "" ||
				sessionStorage["selectFunctionsTreeFunctionsItem"] != "" ||
				sessionStorage["selectGradesItem"] != ""
			) {
				console.log("This is the selcted using the main functions root");
			} else {
				var node = myDiagram.findNodeForKey(sessionStorage["selectedNodeKey"]);
				updateStorageToken(node, "fetch_query_locations_dropdown");
			}

			var params_obj = updateParamsObj("button_query_show_results");

			var query_obj = { query: sessionStorage["query"], params: params_obj };

			// This node null query is an important bug which makes or breaks the whole damn org chart fetchiung thing for whole company. Not sure how and why. Took 3 hours and its 3:30 am
			// if (node !== null) {
			new Query().callBackendQueryExecuteOnResponse(query_obj, user_input);
			// }

			// Hide the modal later because it resets the functions and grades that have been setup initially
			try {
				$(fetch_node_results).modal("hide");
				// new Tokens().resetFunctionsGradesDropdown()
				$(waiting_results).modal("show");
			} catch (error) {
				console.log(" some error::", error);
			}
			delete node?.data?.total_people;
		} else if (user_input == "contact_info") {
			sessionStorage["contact_info"] = "true";
			var params_obj = updateParamsObj();
			var query_obj = { query: sessionStorage["query"], params: params_obj };
			console.log(JSON.parse(sessionStorage["query"]));

			new Query().callBackendQueryExecuteOnResponse(query_obj, user_input);
		} else if (user_input == "contact_info_org_charts") {
			sessionStorage["contact_info"] = "true";
			var params_obj = updateParamsObj();
			var query_obj = { query: sessionStorage["query"], params: params_obj };
			new Query().callBackendQueryExecuteOnResponse(query_obj, user_input);
		}
	}
}

class UtilityFunctions {


	 clearRadioDataCoverageButtons() {
		try {
			var radio_data_coverage = document.querySelector(
				"input[type=radio][name=dataCoverageRadios]:checked"
			);
			radio_data_coverage.checked = false;
		} catch (error) {
			console.log("Error:", error);
		}
		try {
			var radio_data_source = document.querySelector(
				"input[type=radio][name=dataSourceRadios]:checked"
			);
			radio_data_source.checked = false;
		} catch (error) {
			console.log("Error:", error);
		}
	}

	dateTimetoHumanString(datetime_string) {
		const dateString = datetime_string;
		const dateObj = new Date(dateString + " UTC");
		const months = [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec",
		];
		const day = dateObj.getUTCDate();
		const month = months[dateObj.getUTCMonth()];
		const year = dateObj.getUTCFullYear();
		const hour = dateObj.getUTCHours();
		const minute = dateObj.getUTCMinutes();
		const humanReadable = `${month} ${day}, ${year}; ${hour}:${
			minute < 10 ? "0" + minute : minute
		}`;
		return humanReadable;
	}
	truncateString = (str, num) =>
		str.length <= num ? str : `${str.slice(0, num)}...`;

	runNavigation() {
		if (window.location.href.indexOf("/signup") >= 0) {
			sessionStorage["navigation_history"] = ",/signup";
			new PageContents().setLogonStatus();
			new ProcessNodesStates().initializeSessionStorageforDropdowns();
			new Pages().signupPage();
		} else if (window.location.href.indexOf("/login") >= 0) {
			sessionStorage["navigation_history"] = ",/login";
			console.log("document ready login");
			new ProcessNodesStates().initializeSessionStorageforDropdowns();
			new PageContents().setLogonStatus();
			new Pages().loginPage();
		} else if (window.location.href.indexOf("/privacy") >= 0) {
			sessionStorage["navigation_history"] = ",/privacy";
			new PageContents().setLogonStatus();
			new Pages().privacyPage();
		} else if (window.location.href.indexOf("/eula") >= 0) {
			sessionStorage["navigation_history"] = ",/eula";
			new PageContents().setLogonStatus();
			new Pages().eulaPage();
		} else if (window.location.href.indexOf("/api") >= 0) {
			sessionStorage["navigation_history"] = ",/api";
			console.log(" document ready function of /api");
			new PageContents().setLogonStatus();
			new Pages().apiPage();
		} else if (window.location.href.indexOf("/people") >= 0) {
			sessionStorage["navigation_history"] = ",/people";
			console.log(" document ready function of /people");
			new PageContents().setLogonStatus();
			new Pages().searchPage();
		} else if (window.location.href.indexOf("/companies") >= 0) {
			sessionStorage["navigation_history"] = ",/companies";
			new PageContents().setLogonStatus();
			console.log(" document ready function of /companies");
			new Pages().searchPage();
		} else if (window.location.href.indexOf("/pricing") >= 0) {
			new PageContents().setLogonStatus();
			sessionStorage["navigation_history"] = ",/pricing";
			console.log(" document ready function of /pricing");
			new Pages().pricingPage();
		} else if (window.location.href.indexOf("/lists") >= 0) {
			new PageContents().setLogonStatus();
			sessionStorage["navigation_history"] = ",/lists";
			console.log(" document ready function of /lists");
			// new Pages().listsPage();
			new Pages().searchPage();
		} else if (window.location.href.indexOf("/tables") >= 0) {
			new PageContents().setLogonStatus();
			sessionStorage["navigation_history"] = ",/tables";
			console.log(" document ready function of /tables");
			new Pages().tablesPage();
		} else if (window.location.href.indexOf("/plans") >= 0) {
			new PageContents().setLogonStatus();
			sessionStorage["navigation_history"] = ",/plans";
			console.log(" document ready function of /plans");
			new Pages().listsPage();
		} else if (window.location.href.indexOf("/home") >= 0) {
			new PageContents().setLogonStatus();
			sessionStorage["navigation_history"] = ",/home";
			console.log(" document ready function of /home");
			new Pages().landingPage();
		} else if (window.location.href.indexOf("/dashboard") >= 0) {
			// let's check if they are trying to enter the home page -> /app/user_id
			// ...or if instead this is part of a longer analysis link
			// metadata = window.location.href.slice(window.location.href.indexOf("/app/")+5 , window.location.href.length)
			// console.log('metadata of /dashboard funciton, created from a slice of /app/')
			// metadata = metadata.slice(0,24)
			// console.log("This is the metadata ", metadata)
			// console.log("dashboard from document ready function");
			new PageContents().setLogonStatus();
			if (localStorage["user_id"] != null) {
				console.log("This is the metadata");
				// console.log(metadata);

				sessionStorage["navigation_history"] = ",/#";
				// drift_append_email()
				new PageContents().changePage("/dashboard");
			} else {
				new Pages().resetLocalStorageCredentialsAndSetLogonStatus();
				// localStorage['email'] = ''
				// localStorage['first_name'] = ''
				// localStorage['full_name'] = ''
				// localStorage['last_name'] = ''
				// localStorage['user_id'] = ''
				// localStorage['user'] = '{}'
				localStorage["useraccount_id"] = "";
				localStorage["google_sheet_id"] = "";
				sessionStorage["navigation_history"] = ",/#";
				// setLogonStatus()
				new PageContents().changePage("/login");
			}
		} else if (window.location.href.indexOf("/org-chart/") > 0) {
			console.log("GOT org-chart call function!!");
			console.log(
				"Current sessionStorage LOAD TYPE::",
				sessionStorage["load_type"]
			);
			// console.log(localStorage['user_id'])
			var company_id = window.location.href.slice(
				window.location.href.indexOf("/org-chart/") + 11,
				window.location.href.length
			);

			sessionStorage["navigation_history"] = ",/#";
			new PageContents().setLogonStatus();
			// new ProcessNodesStates().resetSessionStorageforDropdowns()
			// sessionStorage['company_id'] = company_id
			console.log(sessionStorage);
			var updateTokenObj = {};
			updateTokenObj["token_to_be_updated"] = "company_id";
			updateTokenObj["updated_value"] = company_id;
			updateStorageToken(updateTokenObj, "endpoint");
			if (sessionStorage["load_type"] != "org-chart") {
				new PageContents().changePage("/org-chart");
			}

			// fetchQueryShowResults();
			// } else if (window.location.href.indexOf("/share/") >= 0){
			//     // let's check if they are trying to enter a shared org chart -> /share/org_data_id
			//     point_id = window.location.href.slice(window.location.href.indexOf("/share/")+7 , window.location.href.length)
			//     sessionStorage['navigation_history']=',/#'
			//     sessionStorage['point_id'] = point_id
			//     changePage('/share')

			// } else if (window.location.href.indexOf("/invite/") >= 0){
			//     // this is a referral link
			//     metadata = window.location.href.slice(window.location.href.indexOf("/invite/")+8 , window.location.href.length)
			//     sessionStorage['navigation_history']=',/#'
			//     sessionStorage['referrer_id'] = metadata.slice(0, 32)
			//     changePage('/signup')
		} else if (window.location.href.indexOf("/password_reset_link/") >= 0) {
			new PageContents().setLogonStatus();
			// this is a referral link
			var metadata = window.location.href.slice(
				window.location.href.indexOf("/password_reset_link/") + 21,
				window.location.href.length
			);

			sessionStorage["navigation_history"] = ",/#";
			sessionStorage["reset_token_id"] = metadata;
			new PageContents().changePage("/password_reset_link");
		} else if (window.location.href.indexOf("/password_reset") >= 0) {
			sessionStorage["navigation_history"] = ",/password_reset";
			new PageContents().setLogonStatus();
			new PasswordReset().passwordResetPage();
		} else {
			console.log("Cant allocate any specific URL to page. Going to home page");
			sessionStorage["navigation_history"] = "";
			new PageContents().setLogonStatus();
			new PageContents().changePage("/#");
		}
	}

	setUPSessionStorageVariables() {
		sessionStorage["screen_width"] = $(window).width();
		sessionStorage["request_time"] = 3000;
		sessionStorage["table_data_sources"] = '[]';
		sessionStorage["consume_credits"] = "false";
		sessionStorage["query"] == "{}";
		sessionStorage["prompt_enum_list"] = "[]";
		sessionStorage["fetch_people_data_count"] = 0;
		sessionStorage["job_name"] = "";
		sessionStorage["fetch_companies_data_count"] = 0;
		sessionStorage["fetch_nodes_data_count"] = 0;
		sessionStorage["comboTree"] = "";
		sessionStorage["raw_string_query_input"] = "";
		sessionStorage["load_type"] = document .getElementById("load_type") .getAttribute("data-row");
		// sessionStorage['nodes_accessed'] = '[]'
		sessionStorage["upload_type_jd_cv"] = "";
		sessionStorage["payment_plans"] = document .getElementById("payment_plans") .getAttribute("data-row");
		sessionStorage["current_focus"] = "orgcharts";
		sessionStorage["org_node_data"] = "[]";
		sessionStorage["data_coverage"] = "include_phone_and_email";
		sessionStorage["data_source"] = "arxena";
		sessionStorage["boolean_keywords_string"] = "false";
		sessionStorage["contact_info"] = "false";
		sessionStorage["selectFunctionsTreeFunctionsRootItem"] = "";
		sessionStorage["selectFunctionsTreeFunctionsItem"] = "";
		sessionStorage["selectGradesItem"] = "";
		sessionStorage["csv_excel_data"] = "{}";
		sessionStorage["selected_updated_sublist_candidates"] = "";
		sessionStorage["selected_create_new_sublist_candidates"] = "";
		try {
			sessionStorage["use_case"] = JSON.parse( document.getElementById("user_obj").getAttribute("data-row") )["use_case"];
		} catch (error) {
			sessionStorage["use_case"] = "";
		}
		var raw_text_filters = [ "email_address", "person_linkedin_url", "company_id", "person_name", "tags", "website", "person_linkedin_url", "phone_number", "company_linkedin_url", "reverse_job_title", "job_title", "gpt3_company_search", ];
		sessionStorage["raw_text_filters"] = JSON.stringify(raw_text_filters);
		sessionStorage["sample_people_data"] = "true";
		sessionStorage["sample_company_data"] = "true";
		sessionStorage["geo_country_selected"] = "US";
		sessionStorage["geo_country_user"] = "";
		sessionStorage["company_emp_counts"] = "[]";
		sessionStorage["selected_context_menu"] = "";
		// sessionStorage['selected_blocks'] = '[]';
		sessionStorage["locations_dropdown1"] = ";";
		sessionStorage["locations_dropdown2"] = "";
		sessionStorage["locations_dropdown3"] = "";
		sessionStorage["company_analytics"] = "";
		sessionStorage["selected_nodes"] = "[]";
		sessionStorage["visitor_fp"] = "";
		sessionStorage["count_cost_credits"] = "";
		sessionStorage["logon"] = "false";
		sessionStorage["count_db_results"] = "";
		// sessionStorage['all_jobs'] = '[]';
		// sessionStorage['current_table'] = '{}'
	}

	detectModalClosuresAndCloseItems() {
		$(fetch_node_results).on("hide.bs.modal", function () {
			document.getElementById("cost_of_credits_org_chart").innerHTML = "";
			new Query().clearSelectedContextMenu();
			new UtilityFunctions().clearRadioDataCoverageButtons();
			updateStorageToken("blank", "cost_of_credits_org_chart");
			sessionStorage["count_db_results"] = 0;
			document.getElementById("modal_locations_dropdown1").innerHTML = "";
			document.getElementById("modal_locations_dropdown2").innerHTML = "";
			document.getElementById("modal_locations_dropdown3").innerHTML = "";
			document.getElementById("pick_function_error_node").innerHTML = "";
			document.getElementById( "select_functions_tree_data_dropdown" ).style.display = "none";
			document.getElementById("select_grades_data_dropdown").style.display = "none";
			sessionStorage["selectFunctionsTreeFunctionsRootItem"] = "";
			sessionStorage["selectFunctionsTreeFunctionsItem"] = "";
			sessionStorage["selectGradesItem"] = "";
			sessionStorage["data_source"] = "arxena";

			// new Tokens().resetFunctionsGradesDropdown()
		});

		$(import_data_modal).on("hide.bs.modal", function () {
			sessionStorage["csv_excel_data"] = "";
			document.getElementById("column_mapping_interface").style.display =
				"none";
			$("#filename").val("");
			document.getElementById("file_name_uploaded").innerText = "";
			document.getElementById("completed_upload_file_submission").innerText =
				"";
		});

		$(enter_query_modal).on("hide.bs.modal", function () {
			sessionStorage["raw_string_query_input"] = "";
			document.getElementById("query_input_errors").innerHTML = "";
			document.getElementById("enter_query_modal_input").value = "";
		});

		$(upload_jdcv_modal).on("hide.bs.modal", function () {
			sessionStorage["upload_type_jd_cv"] = "";

			document.getElementById("pick_upload_jd_cv_error").innerHTML = "";
			document.getElementById("upload_jd_cv_dropdown_selected").innerHTML =
				"Please select upload type - JD/ CV";
		});

		$(fetch_company_results).on("hide.bs.modal", function () {
			document.getElementById("cost_of_credits_companies").innerHTML = "";
			new UtilityFunctions().clearRadioDataCoverageButtons();
			new Query().clearSelectedContextMenu();
			// sessionStorage['data_source'] = 'arxena'
			// sessionStorage['data_coverage'] = 'only_profiles'
			document.getElementById("modal_locations_dropdown1").innerHTML = "";
			document.getElementById("modal_locations_dropdown2").innerHTML = "";
			document.getElementById("modal_locations_dropdown3").innerHTML = "";
		});

		$(fetch_people_results).on("hide.bs.modal", function () {
			document.getElementById("cost_of_credits_people").innerHTML = "";
			new Query().clearSelectedContextMenu();
			new UtilityFunctions().clearRadioDataCoverageButtons();
			document.getElementById("modal_locations_dropdown1").innerHTML = "";
			document.getElementById("modal_locations_dropdown2").innerHTML = "";
			document.getElementById("modal_locations_dropdown3").innerHTML = "";
		});

		$(waiting_results).on("hide.bs.modal", function () {
			document.getElementById("cost_of_credits_people").innerHTML = "";
			document.getElementById("cost_of_credits_org_chart").innerHTML = "";
			document.getElementById("cost_of_credits_people").innerHTML = "";
			document.getElementById("cost_of_credits_companies").innerHTML = "";

			new Query().clearSelectedContextMenu();
			new UtilityFunctions().clearRadioDataCoverageButtons();
			// sessionStorage['data_source'] = 'arxena'
			// sessionStorage['data_coverage'] = 'only_profiles'
			document.getElementById("modal_locations_dropdown1").innerHTML = "";
			document.getElementById("modal_locations_dropdown2").innerHTML = "";
			document.getElementById("modal_locations_dropdown3").innerHTML = "";
		});
		sessionStorage["data_coverage"] = "include_phone_and_email";
		sessionStorage["data_source"] = "arxena";

        $(edit_uploaded_jd).on("hide.bs.modal", function () {
            sessionStorage["onKeypressInput"]=''
			document.getElementById("dropdown_list_locations").innerHTML = "";
			document.getElementById("dropdown_list_company_name").innerHTML = "";
            document.getElementById("gpt_search_loading").innerHTML = ''
            let loader = document.getElementById('modal_edit_jd_error').innerHTML = ''
		});
        $(upload_jd_modal).on("hide.bs.modal", function () {
			document.getElementById("upload_jd_modal_extra_info").innerHTML = "";
			document.getElementById("upload_new_jd_form_err").innerHTML = "";
            document.getElementById('upload_new_jd_file_input').value = '';
		});


	}

	takeInputValueAndReturnObject(input_value) {
		var new_obj = {};
		var key_name = "name";
		var additional_key = "exclude";
		var additional_key_default_value = false;
		new_obj[key_name] = input_value;
		if (additional_key != undefined) {
			new_obj[additional_key] = additional_key_default_value;
		}
		return new_obj;
	}

	turnArraytoArrayofObjects(arr) {
		var updated_arr = [];
		for (var i = 0; i < arr.length; i++) {
			// new_obj = {}
			// new_obj[key_name] = arr[i]
			// if (additional_key!= undefined){
			//     new_obj[additional_key] = additional_key_default_value
			// }
			var new_obj = this.takeInputValueAndReturnObject(arr[i]);

			updated_arr.push(new_obj);
		}
		return updated_arr;
	}

	stopLoadersFromRotating() {
		for (
			var i = 0;
			i < document.getElementsByClassName("loader-link").length;
			i++
		) {
			document.getElementsByClassName("loader-link")[i].innerHTML = "";
		}
	}

	getUniqueListBy(arr, key) {
		return [...new Map(arr.map((item) => [item[key], item])).values()];
	}

	triggerFocus(element) {
		var eventType = "onfocusin" in element ? "focusin" : "focus",
			bubbles = "onfocusin" in element,
			event;

		if ("createEvent" in document) {
			event = document.createEvent("Event");
			event.initEvent(eventType, bubbles, true);
		} else if ("Event" in window) {
			event = new Event(eventType, { bubbles: bubbles, cancelable: true });
		}
		element.focus();
		element.dispatchEvent(event);
	}

	scrollToBottom() {
		console.log("scrollToBottom FUNCTION CALLED");
		// $("#orgchart_section").animate({ scrollTop: 500 }, 1000);
		window.scrollTo({ top: 450, behavior: "smooth" });
	}

	auto_grow(element) {
		element.style.height = "25px";
		element.style.height = element.scrollHeight + "px";
	}

	getCountryCode() {
		if (
			sessionStorage["geo_country_user"] == "" ||
			sessionStorage["geo_country_user"] == undefined
		) {
			jQuery
				.get("https://ipinfo.io/?token=49074596a34362", function () {}, "jsonp")
				.always(function (resp) {
					var countryCode = resp && resp.country ? resp.country : "us";
					// console.log(resp)
					// console.log("This is the country code that got created::", countryCode)
					sessionStorage["geo_country_user"] = countryCode;
					sessionStorage["ipinfo_resp"] = JSON.stringify(resp);
				});
		}
		var countryCode = sessionStorage["geo_country_user"];
		return countryCode;
	}

	showPlans() {
		$(plans_modal).modal("show");
	}

	setIntPhoneNumbers() {
		var inputs = document.getElementsByClassName("phone_number");
		var iti = {};
		for (var i = 0; i < inputs.length; i++) {
			// console.log("This is the input!:", inputs[i])
			iti[i] = intlTelInput(inputs[i], {
				initialCountry: "auto",
				nationalMode: "false",
				separateDialCode: "true",
				autoHideDialCode: "true",
				preferredCountries: ["us", "gb", "ca", "de", "au", "in", "sg", "ae"],
				geoIpLookup: function (success, failure) {
					jQuery
						.get(
							"https://ipinfo.io/?token=49074596a34362",
							function () {},
							"jsonp"
						)
						.always(function (resp) {
							var countryCode = resp && resp.country ? resp.country : "us";
							// console.log(resp)

							// console.log("This is the country code that got created::", countryCode)
							sessionStorage["geo_country_user"] = countryCode;
							sessionStorage["ipinfo_resp"] = JSON.stringify(resp);
							success(countryCode);
						});
				},

				// any initialisation options go here
			});
			//   console.log(iti);
			//   console.log(iti.getExtension());
			//   console.log(iti.getNumber());

			//   console.log("This is the second country code that got created::", countryCode);
			var iti_dropdown_elems = document.getElementsByClassName(
				"iti--allow-dropdown"
			);
			for (var j = 0; j < iti_dropdown_elems.length; j++) {
				iti_dropdown_elems[j].style.width = "100%";
			}
			var phone_number_input_elems =
				document.getElementsByClassName("phone_number_input");
			for (var k = 0; k < phone_number_input_elems.length; k++) {
				phone_number_input_elems[k].style.height = "62px";
			}
		}
	}

	activateToolTips() {
		$('[data-toggle="tooltip"]').tooltip({
			placement: "top",
		});
	}

	clearCookies() {
		// Using a different variant in logout. Can merge.
		var cookies = document.cookie;

		for (var i = 0; i < cookies.split(";").length; ++i) {
			var myCookie = cookies[i];
			var pos = myCookie.indexOf("=");
			var name = pos > -1 ? myCookie.substr(0, pos) : myCookie;
			document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
		}
	}

	clearStoragesandReload() {
		localStorage.clear();
		sessionStorage.clear();
		new UtilityFunctions().clearCookies();
		location.reload();
	}

	pageBack() {
		console.log("pageBack FUNCTION CALLED");
		var previous_pages_list = sessionStorage["navigation_history"].split(",");
		console.log(previous_pages_list);
		var previous_page = previous_pages_list[previous_pages_list.length - 2];
		console.log(previous_page);
		if (previous_pages_list.slice(0, -2).length == 0) {
			window.history.back();
		} else {
			console.log(previous_page.length);
			new PageContents().changePage(previous_page);
		}
	}

	parseCSV(csvText) {
		console.log("Got to parse CSV::", csvText);
		// Use PapaParse to parse the CSV text into an array of arrays
		var parsedData = Papa.parse(csvText, {
			header: true, // Set this to false if your CSV has no header row
			skipEmptyLines: true, // Skip empty lines in the CSV
		});

		return parsedData.data;
	}

	parseExcel(excelData) {
		console.log("Got to parse Excel::");
		// Parse the Excel data using xlsx library
		var workbook = XLSX.read(excelData, { type: "binary" });
		console.log(workbook);
		if (workbook.SheetNames.includes("Pipeline Submissions")) {
			// This is directly from a ciepal submission
			console.log("This is directly a ciepal pipeline");
			// Parse the 'Pipeline Submissions' sheet
			var pipelineSubmissionsSheet = workbook.Sheets["Pipeline Submissions"];
			var pipelineSubmissionsData = XLSX.utils.sheet_to_json(
				pipelineSubmissionsSheet,
				{ header: 1 }
			);
			pipelineSubmissionsData = pipelineSubmissionsData.slice(
				1,
				pipelineSubmissionsData.length
			);
			// Parse the 'Work Experience' sheet
			var workExperienceSheet = workbook.Sheets["Work Experience"];
			var workExperienceData = XLSX.utils.sheet_to_json(workExperienceSheet, {
				header: 1,
			});
			workExperienceData = workExperienceData.slice(
				1,
				workExperienceData.length
			);
			// Merge the two datasets
			var mergedData = [];
			console.log(
				"Number of keys in pipelineSubmissionsData::",
				pipelineSubmissionsData[0].length
			);
			// debugger;
			for (var i = 0; i < pipelineSubmissionsData.length; i++) {
				var pipelineSubmission = pipelineSubmissionsData[i];
				// Find the first work experience entry
				var firstWorkExperience = workExperienceData.find(function (
					workExperience
				) {
					return workExperience[1] === pipelineSubmission[1];
				});
				// Add the first work experience to the pipeline submission entry
				if (firstWorkExperience) {
					pipelineSubmission.push(firstWorkExperience[2]);
					pipelineSubmission.push(firstWorkExperience[3]);
					pipelineSubmission.push(firstWorkExperience[4]);
				}
				// Add the merged entry to the mergedData array
				mergedData.push(pipelineSubmission);
			}
			console.log("This is the merged data!!, ", mergedData);
			console.log("Number of keys in mergedData::", mergedData[0].length);
			filteredExcelDataJson = mergedData;
		} else {
			// Assuming the first sheet is the one you want to parse
			var sheetName = workbook.SheetNames[0];
			var worksheet = workbook.Sheets[sheetName];
			console.log(worksheet);
			// Convert the worksheet data into a JSON object
			var excelDataJson = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
			console.log(excelDataJson);
			// Remove empty rows and columns (optional)
			var filteredExcelDataJson = excelDataJson.filter(
				(row) => row.filter((cell) => cell !== "").length > 0
			);
			console.log(filteredExcelDataJson);
		}
		console.log("Final::", filteredExcelDataJson);
		return filteredExcelDataJson;
	}
	// Function to convert the array to JSON
	arrayToJSON(data) {
		const headers = data[0];
		const result = [];
		for (let i = 1; i < data.length; i++) {
			const obj = {};
			for (let j = 0; j < headers.length; j++) {
				obj[headers[j]] = data[i][j];
			}
			result.push(obj);
		}

		return result;
	}

	isFloat(n) {
		return Number(n) === n && n % 1 !== 0;
	}

	zoomToRect() {
		myDiagram.scrollToRect(
			myDiagram
				.findNodesByExample({ std_function: "ceo", std_grade: "ceo" })
				.first()
		);
		// myDiagram.centerRect(myDiagram.findNodeForKey(1).actualBounds);
		// myDiagram.commandHandler.decreaseZoom(0.3);
	}

	scrollToPart() {
		console.log("Trying to scroll to part where ceo is grade and function");
		// myDiagram.zoomToRect(myDiagram.findNodeForKey(1).actualBounds);
		// myDiagram.scrollToRect(myDiagram.findNodeForKey(1).actualBounds);
		var center_key_node = myDiagram
			.findNodesByExample({ std_function: "ceo", std_grade: "ceo" })
			.first();
		if (center_key_node != undefined) {
			myDiagram.commandHandler.scrollToPart(center_key_node);
		} else if (center_key_node == undefined) {
			console.log("Trying to scroll IF NODE EXAMPLE NOT FOUND");
			try {
				myDiagram.centerRect(myDiagram.findNodeForKey(10000).actualBounds);
			} catch {}
		} else {
			myDiagram.commandHandler.scrollToPart(center_key_node);
		}

		// myDiagram.commandHandler.decreaseZoom(0.3);
	}

	decreaseZoom() {
		myDiagram.commandHandler.decreaseZoom(0.6);
	}

	// Adds tag to the invite friends email referred when space or tab is pressed
	addPromptEnumListTag() {
		console.log("addPromptEnumListTag FUNCTION CALLED");
		//Take the value from text input
		var tag = $("#prompt_enum_textarea").val();
		//Clear the text input and add tag
		$("#prompt_enum_textarea").val("").textext()[0].tags().addTags([tag]);
        new SessionStorageUpdates().updatePromptEnumTextareaList();
	}

	runWalkThrough() {
		if (sessionStorage["walkthrough"] == "yes") {
			console.log(
				"THIS IS THE WALK THROUGHT ",
				sessionStorage["walkthrough"] == "yes"
			);
			sessionStorage["walkthrough"] = "no";
			introJs()
				.onchange(function (targetElement) {
					console.log("This is the target element", targetElement);
					console.log("This is the current step called");
					console.log(this._currentStep);
					console.log("This is the current step", this._currentStep);
					if (this._currentStep == 2) {
						new NavTogglesCloses().toggleNav();
					} else if (this._currentStep == 3) {
						//  toggleNav()
					}
				})
				.start();
			console.log("This is introjs onchange start");
			// introJs().setOptions({
			//     steps: [{
			//       title: 'Welcome to the panda world',
			//       intro: 'Hello World! 👋'
			//     },
			//     {
			//       element: document.querySelector('.card-demo'),
			//       intro: 'This <b>STEP</b> focuses on an image. <br/> We also used some HTML tags!'
			//     },
			//     {
			//       title: 'Farewell!',
			//       element: document.querySelector('.card__image'),
			//       intro: '<img src="https://images.unsplash.com/photo-1608096299210-db7e38487075?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" />'
			//     }]
			//   }).start();

			introJs().start();
		}
	}

	openHelpModal() {
		console.log("openHelpModal FUNCTION CALLED");

		$(help_modal).modal("show");
		document.getElementById("helper_image").innerHTML =
			'<img style="width:600px;" src="/static/img/load_org_chart.gif"/>';
		document.getElementById("helper_description").innerHTML =
			"Use the top search bar or the home page search bar and search company name. Filter the org chart by country or function using the dropdown options";
		document.getElementById("helper_list_container").innerHTML =
			document.getElementById("helper_list_element").innerHTML;
		$("#load_org_chart_helper").toggleClass("account_row account_row-selected");
	}

	closeHelpModal() {
		console.log("closeHelpModal FUNCTION CALLED");

		$(help_modal).modal("hide");
	}

	swapHelper(user_input) {
		console.log("swapHelper FUNCTION CALLED");

		var help = user_input.getAttribute("help");

		if (help == "load_org_chart") {
			document.getElementById("helper_image").innerHTML =
				'<img style="width:600px;" src="/static/img/load_org_chart.gif"/>';
			document.getElementById("helper_description").innerHTML =
				"Use the top search bar or the home page search bar and search company name. Filter the org chart by country or function using the dropdown options";
		} else if (help == "find_people") {
			document.getElementById("helper_image").innerHTML =
				'<img style="width:600px;" src="/static/img/fetch_positions.gif"/>';
			document.getElementById("helper_description").innerHTML =
				"Move to positions using the botton search bar and navigate buttons.<br> To fetch names, either double click and fetch all profiles or right click to fetch specific profiles";
		} else if (help == "similar_people") {
			document.getElementById("helper_image").innerHTML =
				'<img style="width:600px;" src="/static/img/similar_people_similar_companies.gif"/>';
			document.getElementById("helper_description").innerHTML =
				'Right-click on a position and select "Fetch similar people in similar companies"';
		} else if (help == "find_people_company") {
			document.getElementById("helper_image").innerHTML =
				'<img style="width:600px;" src="/static/img/search_people_companies.gif"/>';
			document.getElementById("helper_description").innerHTML =
				"Go to the companies or people tab and use any of the left panel filters to filter through the databases";
		} else if (help == "find_people_title") {
			document.getElementById("helper_image").innerHTML =
				'<img style="width:600px;" src="/static/img/share.gif"/>';
			document.getElementById("helper_description").innerHTML =
				"Click on share and get a link you can share with friends and colleagues<br>(even if they are not Arxena users!)";
		} else if (help == "upgrade_plan") {
			document.getElementById("helper_image").innerHTML =
				'<img style="width:600px;" src="/static/img/make_payment.gif"/>';
			document.getElementById("helper_description").innerHTML =
				"Go to dashboard and select the plan or credits you wish to upgrade";
		}

		document.getElementById("helper_list_container").innerHTML =
			document.getElementById("helper_list_element").innerHTML;
		$("#" + help + "_helper").toggleClass("account_row account_row-selected");
	}

	toTitleCase(str) {
		return str.replace(/\w\S*/g, function (txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		});
	}

	capitalizeEachWord(str) {
		console.log("capitalizeEachWord FUNCTION CALLED");

		var splitStr = str.toLowerCase().split(" ");
		for (var i = 0; i < splitStr.length; i++) {
			// You do not need to check if i is larger than splitStr length, as your for does that for you
			// Assign it back to the array
			splitStr[i] =
				splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
		}
		// Directly return the joined string
		return splitStr.join(" ");
	}

	getLinkedinUrl(person_name, job_title, url, image) {
		console.log("getLinkedinUrl FUNCTION CALLED");
		console.log("person_name, job_title, url::", person_name, job_title, url);
		window.open(url, "_blank");

		// $('.modal').modal('hide');

		// if(sessionStorage['panel_preexisting']=='') {
		//     // console.log("setting panel preexisting popopopo")
		//     sessionStorage['panel_preexisting'] = document.getElementById("inside_panel_content_container").innerHTML
		// }

		// document.getElementById("inside_panel_content_container").innerHTML = document.getElementById("inside_panel_content_person_element").innerHTML
		// document.getElementById("inside_panel_content_container_mobi").innerHTML = document.getElementById("inside_panel_content_person_element").innerHTML
		// if (sessionStorage['lateral_bar'] != 'open'){
		// 	toggleNav()
		// }
		// sessionStorage['current_linkedin_link'] = ''

		// document.getElementById("loading_icon").innerHTML = ''
		// document.getElementById("person_photo").src = 'https://st2.depositphotos.com/4111759/12123/v/950/depositphotos_121232442-stock-illustration-male-default-placeholder-avatar-profile.jpg'
		// document.getElementById("person_name").innerHTML = person_name
		// document.getElementById("person_job_title").innerHTML = job_title
		// document.getElementById("linkedin_profile").innerHTML = '<img src="/static/img/linkedin-icon-png-circle-2.png" style="height:20px; width:20px;margin-bottom:5px">'
		// $("#linkedin_profile").attr("href", url)
		// document.getElementById("load_contacts_button_container").innerHTML = '<div style="width:130px; margin-left:40px;" class="small_button_white" onclick="loadContacts()">Load Contacts</div>'
		// sessionStorage['current_linkedin_link'] = url
	}

	openExportPanel(user_input) {
		console.log("openExportPanel FUNCTION CALLED");

		var pages_list = sessionStorage["navigation_history"].split(",");
		var current_page = pages_list[pages_list.length - 1];

		// if (current_page == '/share') {
		//     accessAfterShare()
		// } else {
		// if(sessionStorage['panel_preexisting']=='') {
		// sessionStorage['panel_preexisting'] = document.getElementById("inside_panel_content_container").innerHTML
		// }
		console.log("Setting value of inside panel content container");
		// document.getElementById("inside_panel_content_container").innerHTML = document.getElementById("inside_panel_export_element").innerHTML
		sessionStorage["export_panel"] = document.getElementById(
			"inside_panel_export_element"
		).innerHTML;
		if (sessionStorage["lateral_bar"] != "open") {
			new NavTogglesCloses().toggleNav(user_input);
		}

		// }
	}

    get_gpt_cost_by_token(chipText=""){
        let output_option = $('#prompt_enum_textarea').textext()[0].tags()['_formData']
        let question_prompt = document.getElementById("input_prompt_base_filter_text").value;
        let selectDropDownColumn = new Components().getAllSelectedFields("selected_option_chips")
        let gpt_prompts = [{"type":"defined","field": "Name","data":"full_name","prompt": ""},
            {"type":"defined","field": "Education","data":"education_institute_ug","prompt": ""},
            {"type":"defined","field": "Job Titles","data":"job_title","prompt": ""},
            {"type":"defined","field": "Profile","data":"profile_title","prompt": ""},
            {"type":"defined","field": "Location","data":"location_name","prompt": ""},
            {"type":"defined","field": "Company Name","data":"job_company_name","prompt": ""}]
        console.log("{selectDropDownColumn}");
        console.log({selectDropDownColumn});
        if(chipText){
            if(selectDropDownColumn?.length == 0){
                selectDropDownColumn.push(chipText)
            }
            if(!selectDropDownColumn.includes(chipText)){
                selectDropDownColumn.push(chipText)
            }
        }
        let columns = gpt_prompts.filter(prompt => selectDropDownColumn.includes(prompt.field)).map(matchedPrompt => matchedPrompt.data);
        columns = ["_id",...columns]
        let hot = hotInstance.getHotInstance()
        let candidate_details = new LeftPanelTableActions().getSelectedCandidateDetailsFromHOT(hot,columns)
        console.log("These are the candidate details::",candidate_details)
        candidate_details = candidate_details.filter(detail => detail != null && detail._id != null).map(({ _id, ...rest }) => rest);
        console.log(candidate_details);
        if(!!candidate_details && candidate_details?.length > 0)
        {
            let valuesArray = candidate_details.map(item => Object.values(item)).flat();
            output_option.forEach(x=> valuesArray.push(x))
            valuesArray.push(question_prompt)
            let data = JSON.stringify({tokens:valuesArray});
            console.log('request body');
            console.log(data);
            $.ajax({
                url: "/gpt_token_cost_compute",
                type: "POST",
                headers: { "Content-Type": "application/json" },
                data: data,
                error: function (xhr, status) {
                    console.log({ xhr, status });
                    document.getElementById("gpt_cost_compute_element").style.display = "";
                },
            }).done(function (data) {
                console.log('gpt_token_cost_compute');
                console.log(data);
                if (data["status"] == "ok") {
                    let cost = data['request_cost']
                    let total_tokens = data['total_tokens']
                    let GPT_model = data['GPT_model']
                    sessionStorage["total_tokens"] = total_tokens
                    document.getElementById("gpt_cost_compute_element").style.display = "";
                    document.getElementById("gpt_cost_compute_element").innerHTML = `The approx cost for ${total_tokens} tokens is $${cost} and model used ${GPT_model}`
                }
            });
        }else{
            console.error("no records selected in get_gpt_cost_by_token");
        }
    }

    onkeyPressCallGPTCostAPI(){
        clearTimeout(delayTimer);
        delayTimer = setTimeout(this.get_gpt_cost_by_token, 1000);
    }
}
