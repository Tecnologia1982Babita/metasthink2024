const preencheInfo = (state, action)=>{ 
    //UseReducer -> um useState  porém com inumeras variaveis e funções, no caso esse para 
    switch(action.type){
        case "dataInit":
            return{
                ...state,
                dataInit: action.value
            };
        case "dataFim":
            return{
                ...state,
                dataFim: action.value
            };
        case "loja":
                return{
                    ...state,
                    loja: action.value
                };
        case "codigoVend":
                return{
                    ...state,
                    codigoVend: action.value
                };
        case "limpaCampos":
                return{
                    ...state,
                    limpaCampos: action.value
                };
        case "dadosGraf":
            return{
                ...state,
                dadosGraf: action.value
            };
        case "pesquisaTipoPagVend":
            return{
                ...state,
                pesquisaTipoPagVend: action.value
            };
        case "graficoConfig":
            return{
                ...state,
                graficoConfig: action.value
            };
        case "selectedData":
            return{
                ...state,
                selectedData: action.value
            };
        case "alerta":
	    return{
		...state,
	       alerta: action.value
	    };    
        default: 
            return;
        }
    }
    
export default preencheInfo;