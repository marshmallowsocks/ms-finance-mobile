const constants = {
    api: {
        API_BASE_URL: 'https://ms-finance-api.herokuapp.com',
        GRAPHQL: 'https://ms-finance-api.herokuapp.com/api/graphql',
        auth: {
            LOGIN: '/public/users/login',
            REGISTER: '/public/users/register',
        },
    },
    colors: {
        BASE_RED: '#dc3545',
        BASE_BLUE: '#007bff',
        BASE_GREEN: '#28a745',
        BASE_YELLOW: '#ffc107',
        BASE_WHITE: '#FFF',
        BASE_OFFWHITE: '#f8f9fa',
        BASE_BLACK: '#343a40',
        BASE_PURPLE: '#563d7c',
    },
    bankColors: {
        'Chase': '#007bff',
        'Citi': '#007bff',
        'American Express': '#007bff',
        'Fidelity': '#28a745',
        'Capital One': '#dc3545',
        'Discover Bank': '#ffc107',
        'Ally Bank': '#563d7c',
        'HSBC (US) - Personal Internet Banking': '#dc3545',
    },
};

export default constants;

