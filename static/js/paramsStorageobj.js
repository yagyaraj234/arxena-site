
function updateParamsObj(params_type){
    console.log("Updating updateParamsObj::::", params_type)
    params = {}
    // params['selected_blocks']  = sessionStorage['selected_blocks']
    params['selected_nodes'] = sessionStorage['selected_nodes']
    params['selected_context_menu']  = sessionStorage['selected_context_menu']
    params['current_focus']  = sessionStorage['current_focus']
    params['consume_credits']  = sessionStorage['consume_credits']
    params['data_source']  = sessionStorage['data_source']
    params['data_coverage']  = sessionStorage['data_coverage']
    params['contact_info']  = sessionStorage['contact_info']
    params['locations_dropdown1'] = sessionStorage['locations_dropdown1']
    params['locations_dropdown2'] = sessionStorage['locations_dropdown2']
    params['locations_dropdown3'] = sessionStorage['locations_dropdown3']
    params['use_case'] = sessionStorage['use_case']
    params['company_analytics'] = sessionStorage['company_analytics']
    params['visitor_fp'] = sessionStorage['visitor_fp']
    params['geo_country_user'] = sessionStorage['geo_country_user']
    params['geo_country_selected'] = sessionStorage['geo_country_selected']
    params['raw_string_query_input'] = sessionStorage['raw_string_query_input']
    params['logon'] = sessionStorage['logon']
    params['testing'] = false
    params['hot_email_addresses'] = false
    params['hot_phone_numbers'] = false
    params['cost_credits']  = false
    params['boolean_keywords_string']  = sessionStorage['boolean_keywords_string']
    params['count_query']  = false
    params['locations_dropdown']  = false
    params['locations_dropdown_number'] = '0'
    params['fetch_people_data_count'] = sessionStorage['fetch_people_data_count']
    params['fetch_companies_data_count'] = sessionStorage['fetch_companies_data_count']
    params['fetch_nodes_data_count'] = sessionStorage['fetch_nodes_data_count']
    params['count_cost_credits'] = ''
    params['count_db_results'] = ''

    if (params_type == 'hot_email_addresses'){
        params['hot_email_addresses'] = true
    }
    
    if (params_type == 'hot_phone_numbers'){
        params['hot_phone_numbers'] = true
    }

    if (params_type == 'boolean_keywords_string'){
        params['boolean_keywords_string'] == 'true'
    }
    if (params_type == 'button_query_show_results'){
        params['count_cost_credits'] = sessionStorage['count_cost_credits']
        params['count_db_results'] = sessionStorage['count_db_results']
    }
    if (params_type == 'count_query'){ 
        params['count_query']  = true
        params['data_source']  = 'data_broker_1'
    }
    if (params_type == 'locations_dropdown1'){        
        params['locations_dropdown_number'] = '1'
        params['locations_dropdown'] = true
    }
    if (params_type == 'raw_string_query_input'){}
    if (params_type == 'locations_dropdown2'){
              
        params['locations_dropdown_number'] = '2'
        params['locations_dropdown'] = true
    }
    if (params_type == 'locations_dropdown3'){
        params['locations_dropdown_number'] = '3'
        params['locations_dropdown'] = true
    }
    if (params_type == 'cost_credits'){
        params['cost_credits'] = true
    }
    params_obj = JSON.stringify(params)
    return params_obj
}


function updateStorageToken(token_obj, source){
    console.log("Updating Storage Token with token:: and source::", token_obj, source)
    console.log("Current Query Token::", JSON.parse(sessionStorage['query']))
    if (source == 'viewTableinOrgChart'){
        console.log("Updating tokens for viewTableinOrgChart")
        existing_tokens = JSON.parse(sessionStorage['query'])
        console.log("Existing Tokens::", existing_tokens)
        existing_tokens['company_id'] = [new UtilityFunctions().takeInputValueAndReturnObject(JSON.parse(sessionStorage['current_table'])['table_name'])]
        sessionStorage['query'] = JSON.stringify(existing_tokens)
        console.log("Existing Tokens::", sessionStorage['query'])
    }

    if (source == 'selected_function_dropdown'){
        existing_tokens = JSON.parse(sessionStorage['query'])
        existing_tokens['std_function_category'] = [new UtilityFunctions().takeInputValueAndReturnObject(token_obj['std_function_category'])]
        existing_tokens['std_grade_category'] = []
        existing_tokens['std_grade'] = []
        existing_tokens['std_function'] = []
        sessionStorage['query'] = JSON.stringify(existing_tokens)
    }

    if( source == 'selectGradesItem'){
        existing_tokens = JSON.parse(sessionStorage['query'])
        existing_tokens['grades'] = [new UtilityFunctions().takeInputValueAndReturnObject(token_obj['grades'])]
        sessionStorage['query'] = JSON.stringify(existing_tokens)
    }

    if (source == 'industry_category'){
        existing_tokens = JSON.parse(sessionStorage['query'])
        existing_tokens['industry'] = new UtilityFunctions().turnArraytoArrayofObjects(token_obj['industry_category'])
        existing_tokens['industry_category'] = []
        sessionStorage['query'] = JSON.stringify(existing_tokens)
    }

    if (source == 'gpt3_company_search'){
        existing_tokens = JSON.parse(sessionStorage['query'])
        if (typeof(token_obj['companies_ids_list'])!="undefined"){
            remove_duplicates_company_ids = new UtilityFunctions().getUniqueListBy([].concat(existing_tokens['company_id'], new UtilityFunctions().turnArraytoArrayofObjects(token_obj['companies_ids_list'])), 'name');
            remove_duplicates_company_names = new UtilityFunctions().getUniqueListBy([].concat(existing_tokens['company_name'], new UtilityFunctions().turnArraytoArrayofObjects(token_obj['companies_names_list'])), 'name');
            existing_tokens['company_id'] = remove_duplicates_company_ids
            existing_tokens['company_name'] = remove_duplicates_company_names
            existing_tokens['gpt3_company_search'] = []
        }
        sessionStorage['query'] = JSON.stringify(existing_tokens)
    }
    
    if (source == 'resetFunctionsGradesDropdown'){
        console.log("Resetting functiona adn grades dropdown!!!-->resetFunctionsGradesDropdown")
        existing_tokens = JSON.parse(sessionStorage['query'])
        existing_tokens['std_function_category'] = []
        existing_tokens['std_grade_category'] = []
        existing_tokens['key'] = []
        existing_tokens['std_grade'] = []
        existing_tokens['std_function'] = []
        existing_tokens['functions'] = []
        existing_tokens['grades'] = []
        clearSelectedBlocksList()
        sessionStorage['query'] = JSON.stringify(existing_tokens)
    }

    if (source == 'resetOrgChartTokensAfterFetchNodeData'){
        console.log("Got here to update storage Token wwith source:: resetSessionStorageTokensForContactInfo_tokens_update")
        existing_tokens = JSON.parse(sessionStorage['query'])
        existing_tokens['key'] = []
        existing_tokens['std_function'] = []
        existing_tokens['functions'] = []
        existing_tokens['std_grade'] = []
        existing_tokens['grades'] = []
        existing_tokens['std_function_category'] = []
        existing_tokens['std_grade_category'] = []
        existing_tokens['function_root'] = []
        sessionStorage['query'] = JSON.stringify(existing_tokens)
    }

    if (source == 'selectFunctionsTreeFunctionsRootItem'){
        console.log("Resetting functiona adn grades dropdown!!!-->selectFunctionsTreeFunctionsRootItem")
        existing_tokens = JSON.parse(sessionStorage['query'])
        existing_tokens['std_function_category'] = [new UtilityFunctions().takeInputValueAndReturnObject(token_obj['function_root'])]
        existing_tokens['functions'] = []
        sessionStorage['query'] = JSON.stringify(existing_tokens)
    }

    if (source == 'selectFunctionsTreeFunctionsItem'){
        existing_tokens = JSON.parse(sessionStorage['query'])
        existing_tokens['functions'] = [new UtilityFunctions().takeInputValueAndReturnObject(token_obj['std_function'])]
        existing_tokens['std_function_category'] = []
        sessionStorage['query'] = JSON.stringify(existing_tokens)
    }

    if (source == 'resetSessionStorageTokensForContactInfo_tokens_update'){
        console.log("Got here to update storage Token wwith source:: resetSessionStorageTokensForContactInfo_tokens_update")
        existing_tokens = JSON.parse(sessionStorage['query'])
        existing_tokens['person_id'] = []
        existing_tokens['person_linkedin_url'] = []
        sessionStorage['query'] = JSON.stringify(existing_tokens)
    }
    if (source == 'viewOrgChartCompanyCard_token_obj'){
        console.log("Got here to update storage Token wwith source:: viewOrgChartCompanyCard_token_obj")
        company_name_selected = token_obj['company_name_selected']
        company_id_selected = token_obj['company_id_selected']
        // updateStorageToken(token_obj, 'viewOrgChartCompanyCard_token_obj')
        existing_tokens = JSON.parse(sessionStorage['query'])
        if ((company_name_selected !="undefined" )||(company_name_selected !="null" )||(company_name_selected !="" )){
            existing_tokens['company_name'] =[ new UtilityFunctions().takeInputValueAndReturnObject(company_name_selected)]
        }
        if ((company_id_selected !="undefined" )||(company_id_selected !="null" )||(company_id_selected !="" )){
            existing_tokens['company_id'] =[ new UtilityFunctions().takeInputValueAndReturnObject(company_id_selected)]
        }
        // existing_tokens['company_id'] = [new UtilityFunctions().takeInputValueAndReturnObject(company_id_selected)]
        sessionStorage['query'] = JSON.stringify(existing_tokens)
    }
    if ( source == 'close_token_object'){
        console.log("Got here to update storage Token wwith source:: close_token_object")
        dropdown_class_name = token_obj['dropdown_class_name']
        token_id_clicked = token_obj['token_id_clicked']
        query_obj = JSON.parse(sessionStorage['query'])
        console.log(query_obj[dropdown_class_name])
        console.log("This is token object received::", token_obj)
        existing_query_obj_tokens = query_obj[dropdown_class_name]
        existing_query_obj_tokens = existing_query_obj_tokens.filter( obj => obj.name !== token_id_clicked);
        query_obj[dropdown_class_name] = existing_query_obj_tokens
        // const index_obj = query_obj[dropdown_class_name].indexOf(new UtilityFunctions().takeInputValueAndReturnObject(token_id_clicked));
        // if (index_obj > -1) {
        //     query_obj[dropdown_class_name].splice(new UtilityFunctions().takeInputValueAndReturnObject(index), 1); // 2nd parameter means remove one item only
        // }
        // Two step setting for company name and dropdown class name is essential otherwise it just picks up blank names and sets everything blank
        sessionStorage['query'] = JSON.stringify(query_obj)    
        // Additional check required for company name because company id also has to be removed
        if (dropdown_class_name == 'company_name' ){
            query_obj = JSON.parse(sessionStorage['query'])
            query_obj['company_id'] = []
            sessionStorage['query'] = JSON.stringify(query_obj)
        }
    }
    if (source == 'toggleOrgCharts'){
        console.log("Got here to update storage Token wwith source:: toggleOrgCharts")
        existing_tokens =JSON.parse(sessionStorage['query'])
        existing_tokens['function_root'] = []
        existing_tokens['country'] = []
        sessionStorage['query'] = JSON.stringify(existing_tokens)
    }
    if (source == 'cost_of_credits_org_chart'){
        console.log("Got here to update storage Token wwith source:: cost_of_credits_org_chart")
        existing_tokens = JSON.parse(sessionStorage['query'])
        existing_tokens['country'] = []
        existing_tokens['region'] = []
        existing_tokens['locality'] = []
        sessionStorage['query'] = JSON.stringify(existing_tokens)
    }
    if (source == 'token_filter_background_minus'){
        console.log("Got here to update storage Token wwith source:: token_filter_background_minus")
        // token_obj = {"token_name":token_name, "dropdown_class_name":dropdown_class_name}
        existing_tokens = JSON.parse(sessionStorage['query'])
        dropdown_class_name_tokens = existing_tokens[token_obj['dropdown_class_name']]
        dropdown_class_name_tokens = dropdown_class_name_tokens.filter( obj => obj.name !== token_obj['token_name'])
        updated_token_obj = new UtilityFunctions().takeInputValueAndReturnObject(token_obj['token_name'])
        updated_token_obj['exclude'] = false
        dropdown_class_name_tokens.push(updated_token_obj)
        existing_tokens[token_obj['dropdown_class_name']] = dropdown_class_name_tokens
        existing_tokens[token_obj['dropdown_class_name']] = new UtilityFunctions().getUniqueListBy(existing_tokens[token_obj['dropdown_class_name']], 'name')
        sessionStorage['query'] = JSON.stringify(existing_tokens)
    }
    if (source == 'token_filter_background_plus'){
        console.log("Got here to update storage Token wwith source:: token_filter_background_plus")
        // token_obj = {"token_name":token_name, "dropdown_class_name":dropdown_class_name}
        existing_tokens = JSON.parse(sessionStorage['query'])
        dropdown_class_name_tokens = existing_tokens[token_obj['dropdown_class_name']]
        dropdown_class_name_tokens = dropdown_class_name_tokens.filter( obj => obj.name !== token_obj['token_name'])
        updated_token_obj = new UtilityFunctions().takeInputValueAndReturnObject(token_obj['token_name'])
        updated_token_obj['exclude'] = true
        dropdown_class_name_tokens.push(updated_token_obj)
        existing_tokens[token_obj['dropdown_class_name']] = dropdown_class_name_tokens
        sessionStorage['query'] = JSON.stringify(existing_tokens)
    }
    if (source == 'contextMenu_fetchCurrentPositionAcrossCompaniesResults'){
        console.log("Got here to update storage Token wwith source:: contextMenu_fetchCurrentPositionAcrossCompaniesResults")
        existing_tokens = JSON.parse(sessionStorage['query'])
        console.log(token_obj);
        console.log(existing_tokens);
        reverse_company_id_obj = JSON.parse(sessionStorage['query'])['company_id'][0]
        existing_tokens['grades'].push(new UtilityFunctions().takeInputValueAndReturnObject(token_obj['std_grade']))
        existing_tokens['functions'].push(new UtilityFunctions().takeInputValueAndReturnObject(token_obj['std_function']))
        existing_tokens['functions'] = new UtilityFunctions().getUniqueListBy(existing_tokens['functions'], 'name')
        existing_tokens['grades'] = new UtilityFunctions().getUniqueListBy(existing_tokens['grades'], 'name')
        existing_tokens['reverse_company'].push(reverse_company_id_obj)
        existing_tokens['reverse_company'] = new UtilityFunctions().getUniqueListBy(existing_tokens['reverse_company'], 'name')
        // existing_tokens['reverse_company'] = []
        existing_tokens['company_id'] = []
        existing_tokens['company_name'] = []
        existing_tokens['company_name'] = []
        existing_tokens['country'] = []
        existing_tokens['function_root'] = []
        console.log(existing_tokens)
        console.log(JSON.stringify(existing_tokens))
        sessionStorage['query'] = JSON.stringify(existing_tokens)
    }
    if (source == "arxena_reversed"){
        console.log("Got here to update storage Token wwith source:: arxena_reversed and token obj", token_obj)
        existing_tokens = JSON.parse(sessionStorage['query'])
        // existing_tokens['company_id'].push(turnArraytoArrayofObjects(token_obj['companies_ids_list']))
        if (typeof(token_obj['functions'])!="undefined"){
            remove_duplicates_functions = new UtilityFunctions().getUniqueListBy([].concat(existing_tokens['functions'], new UtilityFunctions().turnArraytoArrayofObjects(token_obj['functions'])), 'name');
            existing_tokens['functions'] = remove_duplicates_functions;
        }
        if (typeof(token_obj['grades'])!="undefined"){
            remove_duplicates_grades = new UtilityFunctions().getUniqueListBy([].concat(existing_tokens['grades'], new UtilityFunctions().turnArraytoArrayofObjects(token_obj['grades'])),'name');
            existing_tokens['grades'] = remove_duplicates_grades;
        }
        if (typeof(token_obj['companies_ids_list'])!="undefined"){
            remove_duplicates_company_ids = new UtilityFunctions().getUniqueListBy([].concat(existing_tokens['company_id'], new UtilityFunctions().turnArraytoArrayofObjects(token_obj['companies_ids_list'])), 'name');
            existing_tokens['company_id'] =  remove_duplicates_company_ids;
            existing_tokens['reverse_company'] = []
        }
        existing_tokens['reverse_job_title'] = []
        sessionStorage['query'] = JSON.stringify(existing_tokens)
    }
    if (source == 'functions_combo_tree'){
        console.log("Got here to update storage Token wwith source:: functions_combo_tree")
        existing_tokens = JSON.parse(sessionStorage['query'])
        // existing_tokens['functions'] = token_obj['functions']
        updated_token_arr = new UtilityFunctions().turnArraytoArrayofObjects(token_obj['functions'])
        existing_tokens['functions'] = new UtilityFunctions().getUniqueListBy(updated_token_arr, 'name')
        sessionStorage['query'] = JSON.stringify(existing_tokens)
        console.log("THIS IS THE TOKEN OBJJJ::::::", token_obj)
    }
    if (source == 'checkbox_phone_number'){
        console.log("Got here to update storage Token wwith source:: checkbox_phone_number")
        existing_tokens = JSON.parse(sessionStorage['query'])
        existing_tokens['checkbox_has_phone'] = token_obj['value']
        sessionStorage['query'] = JSON.stringify(existing_tokens)
    }
    if (source == 'checkbox_email_address'){
        console.log("Got here to update storage Token wwith source:: checkbox_email_address")
        existing_tokens = JSON.parse(sessionStorage['query'])
        existing_tokens['checkbox_has_email'] = token_obj['value']
        sessionStorage['query'] = JSON.stringify(existing_tokens)
    }
    if (source == 'filter_to_clear'){
        console.log("Got here to update storage Token wwith source:: filter_to_clear")
        filter_to_clear = token_obj['filter_to_clear']
        existing_tokens = JSON.parse(sessionStorage['query'])
        existing_tokens[filter_to_clear] = []
        if (filter_to_clear=='functions'){
            existing_tokens['std_function'] = []
        }
        if (filter_to_clear=='grades'){
            existing_tokens['std_grade'] = []
        }
        sessionStorage['query'] = JSON.stringify(existing_tokens)
    }
    if (source == 'raw_element_push'){
        console.log("Got here to update storage Token wwith source:: raw_element_push")
        console.log("Got here to raw element push with token object::", token_obj)
        element_focussed = token_obj['element_focussed']
        var input_value = token_obj['input_value']
        existing_tokens = JSON.parse(sessionStorage['query'])    
        if((element_focussed == 'gpt3_company_search')&(input_value=='')){
            existing_tokens[element_focussed] = []
        }
        if (existing_tokens[element_focussed].filter(e=> e.name === input_value).length>0){
            console.log("Now you also do nothing")
        }
        else if ((input_value=='')||(input_value==' ')){
            console.log("This is the input value:::", input_value)
        }
        else{
            remove_duplicates_existing_tokens = new UtilityFunctions().getUniqueListBy([].concat(existing_tokens[element_focussed], [new UtilityFunctions().takeInputValueAndReturnObject(input_value)]),'name');
            existing_tokens[element_focussed] = [new UtilityFunctions().takeInputValueAndReturnObject(input_value)];
        }
        sessionStorage['query'] = JSON.stringify(existing_tokens)
    }
    if (source == 'boolean_keywords_string'){
        node = token_obj
        try{
            company_name = JSON.parse(sessionStorage['org_chart_data_company_name'])
            company_id = JSON.parse(sessionStorage['org_chart_data_company_id'])
            if ((company_name!="")& (typeof(company_name)!="undefined") ){
                updated_input_value_company_name = new UtilityFunctions().takeInputValueAndReturnObject(company_name)
                existing_tokens['company_name'] =  [updated_input_value_company_name]
            }
            if ((company_id!="")&(typeof(company_id)!="undefined")){
                updated_input_value_company_id = new UtilityFunctions().takeInputValueAndReturnObject(company_id)
                existing_tokens['company_id'] = [updated_input_value_company_id]
            }
        }
        catch{}
        existing_tokens = JSON.parse(sessionStorage['query'])
        existing_tokens['key'] = node.data.key!=null? [new UtilityFunctions().takeInputValueAndReturnObject(node.data.key)] : []
        existing_tokens['std_function'] = node.data.std_function!=null? [new UtilityFunctions().takeInputValueAndReturnObject(node.data.std_function)] : []
        existing_tokens['functions'] = node.data.std_function!=null? [new UtilityFunctions().takeInputValueAndReturnObject(node.data.std_function)] : []
        existing_tokens['std_grade'] = node.data.std_grade!=null? [new UtilityFunctions().takeInputValueAndReturnObject(node.data.std_grade)] : []
        existing_tokens['grades'] = node.data.std_grade!=null? [new UtilityFunctions().takeInputValueAndReturnObject(node.data.std_grade)] : []
        existing_tokens['std_grade_category'] = node.data.std_grade_category!=null? [new UtilityFunctions().takeInputValueAndReturnObject(node.data.std_grade_category)] : []
        existing_tokens['std_function_category'] = node.data.std_function_category!=null? [new UtilityFunctions().takeInputValueAndReturnObject(node.data.std_function_category)] : []
        existing_tokens['function_root'] = node.data.function_root!=null? [new UtilityFunctions().takeInputValueAndReturnObject(node.data.function_root)] : []
        // existing_tokens['std_function'] = [node.data.std_function]
        // existing_tokens['std_grade'] = [node.data.std_grade]
        // existing_tokens['std_grade_category'] = [node.data.std_grade_category]
        // existing_tokens['std_function_category'] = [node.data.std_function_category]
        // existing_tokens['function_root'] = [node.data.function_root]
        sessionStorage['query'] = JSON.stringify(existing_tokens)
    }


    if (source == 'fetch_query_locations_dropdown'){
        console.log("Got here to update storage Token wwith source:: fetch_query_locations dropdown")
        // if (sessionStorage['selected_context_menu']!='fetchEntireCompanyDataResults'){
            // debugger;
            var node = myDiagram.findNodesByExample({'std_function':'ceo','std_grade':'ceo'}).first()
            var token_obj = node
            try{
                company_name = JSON.parse(sessionStorage['org_chart_data_company_name'])
                company_id = JSON.parse(sessionStorage['org_chart_data_company_id'])
                if ((company_name!="")& (typeof(company_name)!="undefined") ){
                    updated_input_value_company_name = new UtilityFunctions().takeInputValueAndReturnObject(company_name)
                    existing_tokens['company_name'] =  [updated_input_value_company_name]
                }
                if ((company_id!="")&(typeof(company_id)!="undefined")){
                    updated_input_value_company_id = new UtilityFunctions().takeInputValueAndReturnObject(company_id)
                    existing_tokens['company_id'] = [updated_input_value_company_id]
                }
            }
            catch{}
            existing_tokens = JSON.parse(sessionStorage['query'])
            // debugger;
            existing_tokens['key'] = node?.data?.key? [new UtilityFunctions().takeInputValueAndReturnObject(node.data.key)] : JSON.parse(sessionStorage['query'])['key']? JSON.parse(sessionStorage['query'])['key']: []
            existing_tokens['std_function'] = node?.data?.std_function? [new UtilityFunctions().takeInputValueAndReturnObject(node.data.std_function)] : JSON.parse(sessionStorage['query'])['std_function'] ? JSON.parse(sessionStorage['query'])['std_function']:[]
            existing_tokens['functions'] = node?.data?.std_function? [new UtilityFunctions().takeInputValueAndReturnObject(node.data.std_function)] : JSON.parse(sessionStorage['query'])['functions'] ? JSON.parse(sessionStorage['query'])['functions']:[]
            existing_tokens['std_grade'] = node?.data?.std_grade? [new UtilityFunctions().takeInputValueAndReturnObject(node.data.std_grade)] : JSON.parse(sessionStorage['query'])['std_grade'] ? JSON.parse(sessionStorage['query'])['std_grade'] : []
            existing_tokens['grades'] = node?.data?.std_grade? [new UtilityFunctions().takeInputValueAndReturnObject(node.data.std_grade)] : JSON.parse(sessionStorage['query'])['grades'] ? JSON.parse(sessionStorage['query'])['grades'] :[]
            existing_tokens['std_grade_category'] = node?.data?.std_grade_category? [new UtilityFunctions().takeInputValueAndReturnObject(node.data.std_grade_category)] : JSON.parse(sessionStorage['query'])['std_grade_category'] ? JSON.parse(sessionStorage['query'])['std_grade_category'] : []
            existing_tokens['std_function_category'] = node?.data?.std_function_category? [new UtilityFunctions().takeInputValueAndReturnObject(node.data.std_function_category)] : JSON.parse(sessionStorage['query'])['std_function_category'] ? JSON.parse(sessionStorage['query'])['std_function_category'] : []
            existing_tokens['function_root'] = node?.data?.function_root? [new UtilityFunctions().takeInputValueAndReturnObject(node.data.function_root)] : JSON.parse(sessionStorage['query'])['function_root'] ? JSON.parse(sessionStorage['query'])['function_root'] : []
            // existing_tokens['std_function'] = [node.data.std_function]
            // existing_tokens['std_grade'] = [node.data.std_grade]
            // existing_tokens['std_grade_category'] = [node.data.std_grade_category]
            // existing_tokens['std_function_category'] = [node.data.std_function_category]
            // existing_tokens['function_root'] = [node.data.function_root]
            sessionStorage['query'] = JSON.stringify(existing_tokens)

        // }
        // else{
            // existing_tokens = JSON.parse(sessionStorage['query'])

            // sessionStorage['query'] = JSON.stringify(existing_tokens)
        // }
    }

    if (source == 'endpoint'){
        console.log("Got here to update storage Token wwith source:: endpoint")
        new ProcessNodesStates().resetSessionStorageforDropdowns()
        existing_tokens = JSON.parse(sessionStorage['query'])
        if ((token_obj['updated_value'].length >=1)&(token_obj['updated_value']!=' ')&(token_obj['updated_value']!='')&(token_obj['updated_value']!=null)){
            existing_tokens[token_obj['token_to_be_updated']].push(new UtilityFunctions().takeInputValueAndReturnObject(token_obj['updated_value']))
        }
        console.log(existing_tokens)
        sessionStorage['query'] = JSON.stringify(existing_tokens)
    }

    if (source =='fetchCandidatesfromUploadJDCV'){
        console.log("Got here to update storage Token wwith source:: fetchCandidatesfromUploadJDCV")
        existing_tokens = JSON.parse(sessionStorage['query'])
        existing_tokens['reverse_company'] = ((token_obj['reverse_company'] != null)&(token_obj['reverse_company'] != "") ) ? new UtilityFunctions().turnArraytoArrayofObjects(token_obj['reverse_company']) : []
        existing_tokens['reverse_job_title'] = ((token_obj['reverse_job_title'] != null)&(token_obj['reverse_job_title'] != "")) ? new UtilityFunctions().turnArraytoArrayofObjects(token_obj['reverse_job_title']) : []
        existing_tokens['locations'] = (token_obj['locations'] != null) ? new UtilityFunctions().turnArraytoArrayofObjects(token_obj['locations']) : []
        existing_tokens['functions'] = (token_obj['functions'] != null) ? new UtilityFunctions().turnArraytoArrayofObjects(token_obj['functions']) : []
        existing_tokens['grades'] = (token_obj['grades'] != null) ? new UtilityFunctions().turnArraytoArrayofObjects(token_obj['grades']) : []
        existing_tokens['function_root'] = (token_obj['function_root'] != null) ? new UtilityFunctions().turnArraytoArrayofObjects(token_obj['function_root']) : []
        existing_tokens['company_name'] = ((token_obj['company_name'] != null)&(typeof(token_obj['company_name']) != "undefined")&(token_obj['company_name'] != "")) ? new UtilityFunctions().turnArraytoArrayofObjects(token_obj['company_name']) : []
        existing_tokens['company_id'] = ((token_obj['company_id'] != null)&(typeof(token_obj['company_id']) != "undefined")&(token_obj['company_id'] != "")) ? new UtilityFunctions().turnArraytoArrayofObjects(token_obj['company_id']) : []
        // existing_tokens['inferred_salary'] = token_obj['inferred_salary']
        
        sessionStorage['query'] = JSON.stringify(existing_tokens)

    }

    if (token_obj == 'locations_required1' ){
        console.log("Got here to update storage Token wwith source:: locations_required1")
        existing_tokens = JSON.parse(sessionStorage['query'])
        existing_tokens['country'] = [new UtilityFunctions().takeInputValueAndReturnObject(source)]
        sessionStorage['query'] = JSON.stringify(existing_tokens)

    }

    if (token_obj == 'locations_required2' ){
        console.log("Got here to update storage Token wwith source:: locations_required2")

        existing_tokens = JSON.parse(sessionStorage['query'])
        existing_tokens['region'] = [new UtilityFunctions().takeInputValueAndReturnObject(source)]
        sessionStorage['query'] = JSON.stringify(existing_tokens)
    }

    if (token_obj == 'locations_required3' ){
        console.log("Got here to update storage Token wwith source:: locations_required3")
        existing_tokens = JSON.parse(sessionStorage['query'])
        existing_tokens['locality'] = [new UtilityFunctions().takeInputValueAndReturnObject(source)]
        sessionStorage['query'] = JSON.stringify(existing_tokens)
    }
        console.log("Just before ajax query:: sessionstoragequery is::", JSON.parse(sessionStorage['query']),' and source is', source)
    if (source == 'ajaxQuery'){
        console.log("Got here to update storage Token wwith source:: ajaxQuery")
        console.log(token_obj)
        console.log("This is company Id:", token_obj['company_id'])
        console.log("This is company name:", token_obj['company_name'])
        var existing_tokens = JSON.parse(sessionStorage['query'])
        console.log("Existing tokens::", existing_tokens)
        if (Array.isArray(token_obj)){
            console.log("Token object provided is an array. ")
        }
        else{
            if (existing_tokens['company_id'].filter(e=> e.name === token_obj['company_id']).length>0){}
            else if ((token_obj['company_id'] != 'null')  &(typeof(token_obj['company_id'])!='undefined') & (token_obj['company_id']!="")){
            console.log("Got in here to update the existing tokesn with company ID  in ajax query")
            existing_tokens['company_id'].push(new UtilityFunctions().takeInputValueAndReturnObject(token_obj['company_id']))
        }
        if (existing_tokens['company_name'].filter(e=> e.name === token_obj['company_name']).length>0){}
        else if ((token_obj['company_name'] != 'null')& (typeof(token_obj['company_name'])!='undefined')& (token_obj['company_name']!="")){
            console.log("Got in here to update the existing tokesn with company name  in ajax query")
            existing_tokens['company_name'].push(new UtilityFunctions().takeInputValueAndReturnObject(token_obj['company_name']))     
        }
        sessionStorage['query'] = JSON.stringify(existing_tokens)
        }
        // if (existing_tokens['company_id'].includes(new UtilityFunctions().takeInputValueAndReturnObject(token_obj['company_id']))){}        
    }

    if (source == 'ajaxQueryRemove'){
        console.log("Got here to update storage Token wwith source:: ajaxQueryRemove")
        console.log(token_obj)
        var existing_tokens = JSON.parse(sessionStorage['query'])
        if (existing_tokens['company_id'].filter(e=> e.name === token_obj['company_id']).length>0){
            existing_tokens['company_id'].filter( obj => obj.name !== token_obj['company_id']); 
        }
        if (existing_tokens['company_name'].filter(e=> e.name === token_obj['company_name']).length>0){
            existing_tokens['company_name'].filter( obj => obj.name !== token_obj['company_name']); 
        }
        sessionStorage['query'] = JSON.stringify(existing_tokens)
    }

    if (source == 'home_page_dropdown'){
        console.log("Got here to update storage Token wwith source:: home_page_dropdown")
        existing_tokens = JSON.parse(sessionStorage['query'])
        if ((token_obj['company_id']!='null')&(token_obj['company_id']!='undefined')){
            existing_tokens['company_id'] = [new UtilityFunctions().takeInputValueAndReturnObject(token_obj['company_id'])]
        }
        if ((token_obj['company_name']!='null')&(token_obj['company_name']!='undefined')){
            existing_tokens['company_name'] = [new UtilityFunctions().takeInputValueAndReturnObject(token_obj['company_name'])]
        }
        if ((token_obj['website']!='null')&(token_obj['website']!='undefined')){
            existing_tokens['website'] = [new UtilityFunctions().takeInputValueAndReturnObject(token_obj['website'])]
        }
        existing_tokens['function_root'] = []
        sessionStorage['query'] = JSON.stringify(existing_tokens)

    }


    if (source == "nodeSimilarPeople"){
        console.log("Got here to update storage Token wwith source:: nodeSimilarPeople")
        existing_tokens = JSON.parse(sessionStorage['query'])
        // if (existing_tokens['functions'].includes(new UtilityFunctions().takeInputValueAndReturnObject(token_obj['std_function']))){}
        if (existing_tokens['functions'].filter(e=> e.name === token_obj['std_function']).length>0){}
        else if (token_obj['std_function'] != null){
            existing_tokens['functions'].push(new UtilityFunctions().takeInputValueAndReturnObject(token_obj['std_function']))
        }
        // if (existing_tokens['grades'].includes(new UtilityFunctions().takeInputValueAndReturnObject(token_obj['std_grade']))){}
        if (existing_tokens['grades'].filter(e=> e.name === token_obj['std_grade']).length>0){}
        else if (token_obj['std_grade'] != null){
            existing_tokens['grades'].push(new UtilityFunctions().takeInputValueAndReturnObject(token_obj['std_grade']))
        }

        // if (existing_tokens['function_root'].includes(new UtilityFunctions().takeInputValueAndReturnObject(token_obj['function_root']))){}
        if (existing_tokens['function_root'].filter(e=> e.name === token_obj['function_root']).length>0){}
        else if (token_obj['function_root']!=null){
            existing_tokens['function_root'].push(new UtilityFunctions().takeInputValueAndReturnObject(token_obj['function_root']))
        }
        sessionStorage['query'] = JSON.stringify(existing_tokens)
    }

    if (source == "selectGeoArea"){
        console.log("Got here to update storage Token wwith source:: selectGeoArea")
        console.log(token_obj)
        existing_tokens = JSON.parse(sessionStorage['query'])
        existing_tokens['country'] = [new UtilityFunctions().takeInputValueAndReturnObject(token_obj)]
        sessionStorage['query'] = JSON.stringify(existing_tokens)
    }

    if (source == "functional_area"){
        console.log("Got here to update storage Token wwith source:: functional_area")
        console.log(token_obj)
        existing_tokens = JSON.parse(sessionStorage['query'])
        existing_tokens['function_root'] = [new UtilityFunctions().takeInputValueAndReturnObject(token_obj)]
        sessionStorage['query'] = JSON.stringify(existing_tokens)
    }

    if (source == 'contactInfoClicked'){
        console.log("Got here to update storage Token wwith source:: contactInfoClicked")
        existing_tokens = JSON.parse(sessionStorage['query'])
        console.log(token_obj);
        console.log(existing_tokens);
        existing_tokens['person_id'] = [new UtilityFunctions().takeInputValueAndReturnObject(String(token_obj['person_id']))]
        existing_tokens['person_linkedin_url'] = [new UtilityFunctions().takeInputValueAndReturnObject(String(token_obj['person_linkedin_url']))]
        console.log(existing_tokens)
        console.log(JSON.stringify(existing_tokens))
        sessionStorage['query'] = JSON.stringify(existing_tokens)
    }
    
    if (source == 'contextMenu'){
        console.log("Got here to update storage Token wwith source:: contextMenu")
        existing_tokens = JSON.parse(sessionStorage['query'])
        console.log(token_obj);
        console.log(existing_tokens);
        existing_tokens['grades'].push(new UtilityFunctions().takeInputValueAndReturnObject(token_obj['std_grade']))
        existing_tokens['functions'].push(new UtilityFunctions().takeInputValueAndReturnObject(token_obj['std_function']))
        console.log(existing_tokens)
        console.log(JSON.stringify(existing_tokens))
        sessionStorage['query'] = JSON.stringify(existing_tokens)
    }

}



function addTokentoSessionStorage(user_input){
    // new ProcessNodesStates().resetSessionStorageforDropdowns()
    
    // panda = user_input
    // console.log(user_input);
    company_id_clicked = user_input.id.replace("filters_autocomplete_row_elem_","");
    console.log(company_id_clicked);

    for (var i=0; i < user_input.classList.length; i++){
        if (user_input.classList[i].includes('dropdown_class_')){
            dropdown_class = user_input.classList[i]
        }
    }

    dropdown_class_name = dropdown_class.replace("dropdown_class_", "");
    console.log(company_id_clicked);
    console.log(dropdown_class);
    console.log(dropdown_class_name);

    // Just because this is the current language being used when we transported the function here
    input_token = company_id_clicked
    
    if ((sessionStorage['query'] == '{}') ){
        new ProcessNodesStates().resetSessionStorageforDropdowns()
    }
    console.log("Dropdown class name:", dropdown_class_name);

    
    existing_tokens = JSON.parse(sessionStorage['query'])
    console.log(sessionStorage['query']);
    console.log("Converting input text to token::", input_token)
    console.log("Existing tokens:", existing_tokens)
    
    var j = 0
    for (var i =0; i < existing_tokens[dropdown_class_name].length; i++){
        
        if(existing_tokens[dropdown_class_name][i]['name']==input_token){
            j++
        }
    }

    if (j!=0){
        console.log("Existing token exists. not adding more tokens.:::", dropdown_class_name)
    }
    else{
        existing_tokens[dropdown_class_name].push(new UtilityFunctions().takeInputValueAndReturnObject(input_token))
    }

    
    console.log(existing_tokens)
    sessionStorage['query'] = JSON.stringify(existing_tokens)
    if (dropdown_class_name =='company_name' ){
        
        if (sessionStorage['current_focus'] == 'orgcharts'){
           new ProcessNodesStates().resetSessionStorageforDropdowns() 
        }
        
        // 

        company_id = user_input.getElementsByClassName('alpha company-name')[0].getAttribute('company_id')
        existing_tokens = JSON.parse(sessionStorage['query'])
        console.log("These are the existing tokens::", existing_tokens)
        console.log("existing_tokens['company_name']", existing_tokens['company_name'])
        console.log("existing_tokens['company_id']", existing_tokens['company_id'])
        console.log("Length == ", existing_tokens['company_name'].length)
        if (existing_tokens['company_name'].length == 1){
            console.log("Got into the if statement! Lets see")
            existing_tokens['company_id'] = []
        }
        console.log("These are the company ID:", company_id)
        existing_tokens['company_id'].push(new UtilityFunctions().takeInputValueAndReturnObject(company_id))
        sessionStorage['query'] = JSON.stringify(existing_tokens)
        console.log("These are the existing tokens:", existing_tokens)
    }



}
